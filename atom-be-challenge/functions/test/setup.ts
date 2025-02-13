import * as admin from 'firebase-admin';

// Inicializa la aplicación Firebase con una configuración de prueba
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    projectId: 'atom-challenge-d6b14',
  });
}