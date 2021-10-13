import { firebaseApp } from "./firebase";
import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp,
  getDoc,
  collection,
  writeBatch,
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

export async function getCollectionRef(collectionKey) {
  const collectionRef = collection(db, collectionKey);
  return collectionRef;
}

export function dataFromSnapshot(snapshot) {
  const newCollection = snapshot.docs.map((doc) => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });

  return newCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
}

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const batch = writeBatch(db);

  objectsToAdd.forEach((obj) => {
    const newDocRef = doc(collection(db, collectionKey));
    console.log(newDocRef);
    batch.set(newDocRef, obj);
  });
  return await batch.commit();
};
