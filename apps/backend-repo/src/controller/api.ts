import { Timestamp } from "firebase/firestore";
import { Request, Response } from 'express';
import { updateUserSchema } from "../entities/userEntity";
import userRepository from '../repository/userRepository';

export const getUserHandler = async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }

  // Fetch user collection from firestore based on Collection Id by User Uid
  const user = await userRepository.getUser(req.user.uid);
  if (!!user) {
    res.status(200).json(user);
    return
  }
  res.status(404).json({ message: 'Not Found' })
}

export const updateUserHandler = async (req: Request, res: Response) => {
  const parsed = updateUserSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      error: parsed.error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message,
      })),
    });
    return
  }

  if (!req.user) {
    res.status(404)
    return
  }
  // Update or Create user collection
  const user = await userRepository.updateOrCreateUser(req.user.uid, {
    ...parsed.data,
    "recentlyActive": Timestamp.now(),
  })
  res.status(200).json(user);
}