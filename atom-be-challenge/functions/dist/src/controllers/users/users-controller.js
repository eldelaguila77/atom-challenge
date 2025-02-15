import { Router } from 'express';
import * as logger from 'firebase-functions/logger';
import * as admin from 'firebase-admin';
const db = admin.firestore();
const usersRouter = Router();
usersRouter.get('/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const snapshot = await db.collection('users').where('email', '==', email).get();
        if (snapshot.empty) {
            res.sendStatus(404);
        }
        else {
            const user = snapshot.docs[0].data();
            res.json(user);
        }
    }
    catch (error) {
        logger.error("Error getting user", error);
        res.status(500).send("Error getting user");
    }
});
usersRouter.post('/', async (req, res) => {
    try {
        const newUser = req.body; // Excluir el id del payload
        const docRef = await db.collection('users').add(newUser);
        res.json({ id: docRef.id });
    }
    catch (error) {
        logger.error("Error adding user", error);
        res.status(500).send("Error adding user");
    }
});
export default usersRouter;
//# sourceMappingURL=users-controller.js.map