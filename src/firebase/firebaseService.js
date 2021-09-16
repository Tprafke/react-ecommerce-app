import { firebaseApp } from "./firebase";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
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
