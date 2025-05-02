import admin from 'firebase-admin'
import path from 'path'


if (!admin.apps.length) {
  try {
    const serviceAccountPath = path.resolve(__dirname, '../config/secrets/firebase.json');
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccountPath),
    });
  } catch (err) {
    console.log("Failed to load firebase configuration file, initializa app without credentials!")

    // initialize app with default projectId
    admin.initializeApp({ projectId: 'ebuddy-test-3abe2' })
  }
}

const db = admin.firestore();
const auth = admin.auth();

if (process.env.FIRESTORE_EMULATOR_HOST) {
  db.settings({ host: process.env.FIRESTORE_EMULATOR_HOST })
}

export { db, auth }