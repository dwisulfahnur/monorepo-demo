import { db } from "../config/firebaseConfig";
import { IUser } from "@packages/shared/types/user"
import { Timestamp } from "firebase/firestore";

const userCollection = db.collection("USERS");

async function getUser(uid: string): Promise<IUser | null> {
  const doc = await userCollection.doc(uid).get();
  if (!doc.exists) {
    return null;
  }
  return doc.data() as IUser;
}

async function updateOrCreateUser(uid: string, data: Partial<IUser>): Promise<IUser | null> {
  const docRef = userCollection.doc(uid);

  // Get existing user data
  const existingUser = await getUser(uid);

  // Prepare update data
  const updateData: Partial<IUser> = {
    ...existingUser,
    ...data,
    recentlyActive: Timestamp.now().seconds
  };

  // Remove undefined values
  Object.keys(updateData).forEach(key => {
    if (updateData[key as keyof IUser] === undefined) {
      delete updateData[key as keyof IUser];
    }
  });

  await docRef.set(updateData, { merge: true });
  const updatedDoc = await docRef.get();
  return updatedDoc.data() as IUser;
}

const userRepository = { getUser, updateOrCreateUser }
export default userRepository;
