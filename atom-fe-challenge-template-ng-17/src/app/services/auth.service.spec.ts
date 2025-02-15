import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpService } from './http.service';
import { of, throwError } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  let httpServiceSpy: jasmine.SpyObj<HttpService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpService', ['get', 'post']);

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: HttpService, useValue: spy }
      ]
    });

    service = TestBed.inject(AuthService);
    httpServiceSpy = TestBed.inject(HttpService) as jasmine.SpyObj<HttpService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get user by email', async () => {
    const expectedUser = { id: '1', email: 'test@example.com' };
    httpServiceSpy.get.and.returnValue(of(expectedUser));

    const user = await service.getUserByEmail('test@example.com');
    expect(user).toEqual(expectedUser);
  });

  it('should return null if user not found', async () => {
    httpServiceSpy.get.and.returnValue(of(null));

    const user = await service.getUserByEmail('notfound@example.com');
    expect(user).toBeNull();
  });

  it('should return null if getUserByEmail throws error', async () => {
    httpServiceSpy.get.and.returnValue(throwError(() => new Error('Error')));

    const user = await service.getUserByEmail('error@example.com');
    expect(user).toBeNull();
  });

  it('should create user', async () => {
    const newUser = { id: '1', email: 'new@example.com' };
    httpServiceSpy.post.and.returnValue(of(newUser));

    const user = await service.createUser('new@example.com');
    expect(user).toEqual(newUser);
  });

  it('should login user', async () => {
    const expectedUser = { id: '1', email: 'test@example.com' };
    httpServiceSpy.get.and.returnValue(of(expectedUser));

    const user = await service.login('test@example.com');
    expect(user).toEqual(expectedUser);
    expect(service.getCurrentUser()).toEqual(expectedUser);
  });

  it('should return null if login user not found', async () => {
    httpServiceSpy.get.and.returnValue(of(null));

    const user = await service.login('notfound@example.com');
    expect(user).toBeNull();
    expect(service.getCurrentUser()).toBeNull();
  });

  it('should logout user', () => {
    service.logout();
    expect(service.getCurrentUser()).toBeNull();
  });

  it('should return true if user is logged in', async () => {
    const expectedUser = { id: '1', email: 'test@example.com' };
    httpServiceSpy.get.and.returnValue(of(expectedUser));

    await service.login('test@example.com');
    expect(service.isLoggedIn()).toBeTrue();
  });

  it('should return false if user is not logged in', () => {
    service.logout();
    expect(service.isLoggedIn()).toBeFalse();
  });

  it('should get current user', async () => {
    const expectedUser = { id: '1', email: 'test@example.com' };
    httpServiceSpy.get.and.returnValue(of(expectedUser));

    await service.login('test@example.com');
    expect(service.getCurrentUser()).toEqual(expectedUser);
  });
});