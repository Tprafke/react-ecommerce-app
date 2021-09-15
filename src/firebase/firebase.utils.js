import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD3vRhfZjMzZC6DcZDeTYRKRk_TayAeNL0",
  authDomain: "react-ecommerce-app-4d737.firebaseapp.com",
  projectId: "react-ecommerce-app-4d737",
  storageBucket: "react-ecommerce-app-4d737.appspot.com",
  messagingSenderId: "1008258011662",
  appId: "1:1008258011662:web:3fb90c8b6e6f8df0ef225f",
};

// export const createUserProfileDocument = async (userAuth, additionalData) => {
//   if (!userAuth) return;

//   console.log(firestore.doc('users/128fdashadu'));
// }

initializeApp(firebaseConfig);

export const auth = getAuth();
export const firestore = getFirestore();

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => signInWithPopup(auth, provider);
