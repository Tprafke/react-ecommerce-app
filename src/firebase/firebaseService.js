import { firebaseApp } from "./firebase";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { createUserProfileDocument } from "./firestoreService";

export const auth = getAuth(firebaseApp);

export async function socialLogin(selectedProvider) {
  let provider;
  if (selectedProvider === "google") {
    provider = new GoogleAuthProvider();
  }
  try {
    const result = await signInWithPopup(auth, provider);
    if (result._tokenResponse.isNewUser) {
      await createUserProfileDocument(result.user);
    }
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

export async function registerInFirebase(email, password, displayName) {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(result.user, {
      displayName: displayName,
    });
    return await createUserProfileDocument(result.user);
  } catch (error) {
    throw error;
  }
}
