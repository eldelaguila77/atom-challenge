import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { User } from '../../interfaces/user.interface';
import { AuthGuard } from '../../guards/auth.guard';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  @Get(':email')
  async findOne(@Param('email') email: string) {
    const db = admin.firestore();
    const snapshot = await db.collection('users').where('email', '==', email).get();
    if (snapshot.empty) {
      return { statusCode: 404, message: 'User not found' };
    }
    const userDoc = snapshot.docs[0];
    const user = userDoc.data() as User;
    return { id: userDoc.id, ...user };
  }

  @Post()
  async create(@Body() createUserDto: Omit<User, 'id'>) {
    const db = admin.firestore();
    const docRef = await db.collection('users').add(createUserDto);
    return { id: docRef.id };
  }
}