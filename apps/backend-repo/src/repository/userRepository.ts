import { db } from "../config/firebaseConfig";
import { IUser } from "../entities/user";


const userCollection = db.collection("USERS");

export async function getUser(uid: string): Promise<IUser | null> {
  const doc = await userCollection.doc("userId").get();
  if (!doc.exists) {
    return null;
  }
  return {
    uid: doc.id,
    ...doc.data(),
  } as IUser;
}

export async function updateUser(uid: string, data: Partial<IUser>): Promise<IUser | null> {
  await userCollection.doc(uid).update(data);
  const updatedDoc = await userCollection.doc(uid).get();
  if (!updatedDoc.exists) {
    return null;
  }
  return {
    uid: updatedDoc.id,
    ...updatedDoc.data(),
  } as IUser;
}
