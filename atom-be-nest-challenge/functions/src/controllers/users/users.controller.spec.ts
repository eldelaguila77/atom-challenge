import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { AuthGuard } from '../../guards/auth.guard';

jest.mock('firebase-admin', () => ({
  firestore: jest.fn().mockReturnThis(),
  collection: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
  get: jest.fn().mockResolvedValue({
    empty: false,
    docs: [{ id: '1', data: () => ({ email: 'test@example.com' }) }],
  }),
  add: jest.fn().mockResolvedValue({ id: '1' }),
}));

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [],
    })
    .overrideGuard(AuthGuard)
    .useValue({ canActivate: jest.fn(() => true) })
    .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should find a user by email', async () => {
    const result = await controller.findOne('test@example.com');
    expect(result).toEqual({ id: '1', email: 'test@example.com' });
  });

  it('should create a user', async () => {
    const result = await controller.create({ email: 'test@example.com' });
    expect(result).toEqual({ id: '1' });
  });
});