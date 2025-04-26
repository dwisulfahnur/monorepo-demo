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

export { db, auth }