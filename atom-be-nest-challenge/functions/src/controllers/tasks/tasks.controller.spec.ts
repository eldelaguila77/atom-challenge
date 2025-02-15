import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { AuthGuard } from '../../guards/auth.guard';

jest.mock('firebase-admin', () => ({
  firestore: jest.fn().mockReturnThis(),
  collection: jest.fn().mockReturnThis(),
  get: jest.fn().mockResolvedValue({
    empty: false,
    docs: [{ id: '1', data: () => ({ title: 'Test Task', userId: '1' }) }],
  }),
  doc: jest.fn().mockReturnThis(),
  update: jest.fn().mockResolvedValue({}),
  delete: jest.fn().mockResolvedValue({}),
  add: jest.fn().mockResolvedValue({ id: '1' }),
  where: jest.fn().mockReturnThis(),
}));

describe('TasksController', () => {
    let controller: TasksController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        controllers: [TasksController],
        providers: [],
        })
        .overrideGuard(AuthGuard)
        .useValue({ canActivate: jest.fn(() => true) })
        .compile();

        controller = module.get<TasksController>(TasksController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should find all tasks', async () => {
        const result = await controller.findAll();
        console.log("findAll:" , result);
        expect(result).toEqual([{ id: '1', title: 'Test Task', userId: '1' }]);
    });

    it('should create a task', async () => {
        const result = await controller.create({
            title: 'Test Task', userId: '1',
            description: '',
            createdAt: undefined,
            completed: false
        });
        console.log("create:" , result);
        expect(result).toEqual({ id: '1' });
    });

    it('should update a task', async () => {
        const result = await controller.updateTask('1', { title: 'Updated Task' });
        expect(result.title).toContain('Updated Task');
    });

    it('should delete a task', async () => {
        const result = await controller.deleteTask('1');
        expect(result).toEqual({ statusCode: 200, message: 'Task deleted successfully' });
    });
});