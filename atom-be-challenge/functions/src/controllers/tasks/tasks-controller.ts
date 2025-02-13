import { Router } from 'express';
import * as logger from 'firebase-functions/logger';
import * as admin from 'firebase-admin';
import { Task } from '../../interfaces/Task.interface';

const db = admin.firestore();
const tasksRouter = Router();

tasksRouter.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('tasks').get();
    const tasks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Task ));
    res.json(tasks);
  } catch (error) {
    logger.error("Error getting tasks", error);
    res.status(500).send("Error getting tasks");
  }
});

tasksRouter.post('/', async (req, res) => {
  try {
    const newTask: Omit<Task, 'id'> = req.body; // Excluir el id del payload
    const docRef = await db.collection('tasks').add(newTask);
    res.json({ id: docRef.id });
  } catch (error) {
    logger.error("Error adding task", error);
    res.status(500).send("Error adding task");
  }
});

tasksRouter.put('/:taskId', async (req, res) => {
  try {
    const { taskId } = req.params;
    const updatedTask: Partial<Task> = req.body;
    await db.collection('tasks').doc(taskId).set(updatedTask, { merge: true });
    res.sendStatus(200);
  } catch (error) {
    logger.error("Error updating task", error);
    res.status(500).send("Error updating task");
  }
});

tasksRouter.delete('/:taskId', async (req, res) => {
  try {
    const { taskId } = req.params;
    await db.collection('tasks').doc(taskId).delete();
    res.sendStatus(200);
  } catch (error) {
    logger.error("Error deleting task", error);
    res.status(500).send("Error deleting task");
  }
});

export default tasksRouter;