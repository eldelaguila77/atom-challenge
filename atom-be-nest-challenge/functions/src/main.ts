import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import { AppModule } from './app.module';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Express } from 'express-serve-static-core';

// Inicializar la aplicación de Firebase
admin.initializeApp();
console.log('Firebase initialized');

const server = express();

const createNestServer = async (expressInstance: Express) => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );
  app.enableCors();
  await app.init();
};

createNestServer(server)
  .then(() => console.log('Nest Ready'))
  .catch((err) => console.error('Nest broken', err));

export const api = functions.https.onRequest(server);