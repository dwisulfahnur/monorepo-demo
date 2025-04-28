import admin from 'firebase-admin'
import path from 'path'


if (!admin.apps.length) {
  const serviceAccountPath = path.resolve(__dirname, '../config/secrets/firebase.json');
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountPath),
  });
}

const db = admin.firestore();
const auth = admin.auth();

if (process.env.FIRESTORE_EMULATOR_HOST) {
  db.settings({host: process.env.FIRESTORE_EMULATOR_HOST})
}

export { db, auth }