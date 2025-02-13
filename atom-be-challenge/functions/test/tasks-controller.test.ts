import express from 'express';
import sinon from 'sinon';
import admin from 'firebase-admin';
import request from 'supertest';
import tasksRouter from '../src/controllers/tasks/tasks-controller';

describe('Tasks API', () => {
  let app: express.Express;
  let firestoreStub: sinon.SinonStubbedInstance<admin.firestore.Firestore>;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use('/tasks', tasksRouter);

    firestoreStub = sinon.createStubInstance(admin.firestore.Firestore);
    sinon.stub(admin, 'firestore').returns(firestoreStub as unknown as admin.firestore.Firestore);
  });

  afterAll(() => {
    sinon.restore();
  });

  it('should add a new task', async () => {
    const newTask = {
      title: 'Test Task',
      description: 'Test Description',
      createdAt: admin.firestore.Timestamp.now(),
      completed: false,
      userId: 'user123',
    };

    firestoreStub.collection.withArgs('tasks').returns({
      add: sinon.stub().resolves({ id: 'task123' })
    } as any);

    const res = await request(app).post('/tasks').send(newTask);
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('id', 'task123');
  });

  it('should update an existing task', async () => {
    const updatedTask = {
      title: 'Updated Task',
      description: 'Updated Description',
      completed: true,
    };

    firestoreStub.collection.withArgs('tasks').returns({
      doc: sinon.stub().withArgs('task123').returns({
        set: sinon.stub().resolves()
      } as any)
    } as any);

    const res = await request(app).put('/tasks/task123').send(updatedTask);
    expect(res.status).toEqual(200);
  });

  it('should delete an existing task', async () => {
    firestoreStub.collection.withArgs('tasks').returns({
      doc: sinon.stub().withArgs('task123').returns({
        delete: sinon.stub().resolves()
      } as any)
    } as any);

    const res = await request(app).delete('/tasks/task123');
    expect(res.status).toEqual(200);
  });
});