import { Request, Response } from 'express';
import { db } from '../config/firebaseConfig';

export const getUserHandler = async (_req: Request, res: Response) => {
  db.collection('USERS').get()
    .then(snapshot => {
      const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.status(200).json(users);
    }).catch((error) => {
      res.status(500).json({ error: 'Error fetching users', details: error });
    });
}

export const updateUserHandler = async (_req: Request, res: Response) => {
  db.collection('users').doc('userId').update({
    name: 'Updated Name',
    age: 30,
  }).then(() => {
    res.status(200).json({ message: 'User updated successfully!' });
  }).catch((error) => {
    res.status(500).json({ error: 'Error updating user', details: error });
  });
}