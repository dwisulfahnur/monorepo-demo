import { db } from "../config/firebaseConfig";
import { IUser } from "@packages/shared/types/user"

const userCollection = db.collection("USERS");

async function getUser(uid: string): Promise<IUser | null> {
  const doc = await userCollection.doc(uid).get();
  if (!doc.exists) {
    return null;
  }
  return doc.data() as IUser;
}

async function updateOrCreateUser(uid: string, data: IUser): Promise<IUser | null> {
  const docRef = userCollection.doc(uid);
  const { recentlyActive, ...body } = data
  await docRef.set({
    ...body,
    recentlyActive: recentlyActive?.seconds
  }, { merge: true });
  const updatedDoc = await docRef.get();
  return updatedDoc.data() as IUser;
}

const userRepository = { getUser, updateOrCreateUser }
export default userRepository;
