import { firebaseApp } from "./firebase";
import { getFirestore } from "firebase/firestore";

const db = getFirestore(firebaseApp);

export function setUserProfileData(user) {
  return db
    .collection("users")
    .doc(user.uid)
    .set({
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL || null,
      createdAt: db.FieldValue.serverTimestamp(),
    });
}
