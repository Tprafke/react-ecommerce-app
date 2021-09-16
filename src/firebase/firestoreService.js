import { firebaseApp } from "./firebase";
import { getFirestore, doc, setDoc, serverTimestamp } from "firebase/firestore";

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
