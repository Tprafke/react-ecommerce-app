import { firebaseApp } from "./firebase";
import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";

const db = getFirestore(firebaseApp);

export function createUserProfileDocument(user) {
  if (!user) return;
  return setDoc(doc(db, "users", user.uid), {
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL || null,
    createdAt: serverTimestamp(),
  });
}

export async function getUserDocumentRef(userAuth, additionalData) {
  if (!userAuth) return;

  const docRef = doc(db, "users", userAuth.uid);

  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = serverTimestamp();
    try {
      await setDoc(docRef, {
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("Error creating user", error.message);
    }
  }

  return docRef;
}

export function dataFromSnapshot(snapshot) {
  if (!snapshot.exists()) return undefined;
  const data = snapshot.data();

  for (const prop in data) {
    if (data.hasOwnProperty(prop)) {
      if (data[prop] instanceof serverTimestamp()) {
        data[prop] = data[prop].toDate();
      }
    }
  }

  return {
    ...data,
    id: snapshot.id,
  };
}
