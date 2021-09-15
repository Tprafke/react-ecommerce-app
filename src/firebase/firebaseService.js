import { firebaseApp } from "./firebase";
import { setUserProfileData } from "./firestoreService";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export const auth = getAuth(firebaseApp);

export async function socialLogin(selectedProvider) {
  let provider;
  if (selectedProvider === "google") {
    provider = new GoogleAuthProvider();
  }
  try {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
    if (result._tokenResponse.isNewUser) {
      await setUserProfileData(result.user);
    }
  } catch (error) {
    console.log(error);
  }
}
