/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
import { onRequest } from "firebase-functions/v2/https";
import * as functions from 'firebase-functions';
import express from 'express';
import * as admin from 'firebase-admin';
import tasksRouter from './controllers/tasks/tasks-controller';
import usersRouter from './controllers/users/users-controller';
import dotenv from 'dotenv';
// Start writing functions
// https://firebase.google.com/docs/functions/typescript
// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
dotenv.config();
admin.initializeApp();
const app = express();
app.use(express.json());
const tokenSecret = functions.config().token.secret;
app.use((req, res, next) => {
    const token = req.headers['authorization'];
    if (token === process.env.TOKEN_SECRET || token === tokenSecret) {
        next();
    }
    else {
        res.status(403).send('Forbidden');
    }
});
app.use('/tasks', tasksRouter);
app.use('/users', usersRouter);
export const api = onRequest(app);
//# sourceMappingURL=index.js.map