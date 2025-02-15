import { Controller, Get, Post, Put, Body, Param, Delete, UseGuards } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { Task } from '../../interfaces/task.interface';
import { AuthGuard } from '../../guards/auth.guard';

@Controller('tasks')
@UseGuards(AuthGuard)
export class TasksController {
  @Get()
  async findAll() {
    const db = admin.firestore();
    const snapshot = await db.collection('tasks').get();
    const tasks: Task[] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Task));
    return tasks;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const db = admin.firestore();
    const doc = await db.collection('tasks').doc(id).get();
    if (!doc.exists) {
      return { statusCode: 404, message: 'Task not found' };
    }
    return { id: doc.id, ...doc.data() } as Task;
  }

  @Get('user/:userId')
  async findAllByUserId(@Param('userId') userId: string) {
    console.log('userId', userId);
    const db = admin.firestore();
    const snapshot = await db.collection('tasks').where('userId', '==', userId).get();
    const tasks: Task[] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Task));
    console.log('tasks', tasks);
    return tasks;
  }

  @Post()
  async create(@Body() createTaskDto: Omit<Task, 'id'>) {
    const db = admin.firestore();
    if (!createTaskDto.createdAt) {
      createTaskDto.createdAt = new Date();
    }
    const docRef = await db.collection('tasks').add(createTaskDto);
    return { id: docRef.id };
  }

  @Put(':id')
  async updateTask(@Param('id') id: string, @Body() updateTaskDto: Partial<Task>) {
    const db = admin.firestore();
    const docRef = db.collection('tasks').doc(id);
    await docRef.update(updateTaskDto);
    return { id: docRef.id, ...updateTaskDto };
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    const db = admin.firestore();
    const docRef = db.collection('tasks').doc(id);
    await docRef.delete();
    return { statusCode: 200, message: 'Task deleted successfully' };
  }
}