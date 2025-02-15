import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpService } from './http.service';

describe('HttpService', () => {
  let service: HttpService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpService]
    });
    service = TestBed.inject(HttpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have a baseUrl', () => {
    expect(service['baseUrl']).toBeTruthy();
  });

  it('should perform GET request', () => {
    const dummyData = { name: 'Test' };
    service.get('/test').subscribe(data => {
      expect(data).toEqual(dummyData);
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/test`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyData);
  });

  it('should perform POST request', () => {
    const dummyData = { name: 'Test' };
    service.post('/test', dummyData).subscribe(data => {
      expect(data).toEqual(dummyData);
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/test`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(dummyData);
    req.flush(dummyData);
  });

  it('should perform PUT request', () => {
    const dummyData = { name: 'Test' };
    service.put('/test', dummyData).subscribe(data => {
      expect(data).toEqual(dummyData);
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/test`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(dummyData);
    req.flush(dummyData);
  });

  it('should perform DELETE request', () => {
    const dummyData = { name: 'Test' };
    service.delete('/test').subscribe(data => {
      expect(data).toEqual(dummyData);
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/test`);
    expect(req.request.method).toBe('DELETE');
    req.flush(dummyData);
  });
});