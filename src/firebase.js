import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, doc, getDoc, setDoc } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const config = {
  apiKey: "AIzaSyAMZuAbobty7S1IqopYN6FZU5zpXLIzTOA",
  authDomain: "think-piece-practice-52f15.firebaseapp.com",
  projectId: "think-piece-practice-52f15",
  storageBucket: "think-piece-practice-52f15.appspot.com",
  messagingSenderId: "1065013218620",
  appId: "1:1065013218620:web:5365cb3aaf4131fc2ae239",
  measurementId: "G-V109BLJ7LW"
};

const firebaseApp = initializeApp(config);

export const db = getFirestore(firebaseApp);
export const postsQ = query(collection(db, 'posts'));

export const auth = getAuth(firebaseApp);
export const provider = new GoogleAuthProvider(auth);
export const signInWithGoogle = () => signInWithPopup(auth, provider);
export const signOutAuth = () => signOut(auth);

window.firebase = firebaseApp; // this is for quick debugging in the browser

export const createUserProfileDocument = async (user, additionalData) => {
  if (!user) return; // if no user break function

  // get a reference to the place in the database where a user profile might be
  const userRef = await doc(db, 'users', user.uid);
  
  // go and fetch the document from that location
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    const { displayName, email, photoURL } = user;
    const createdAt = new Date();

    try {
      await setDoc(userRef, {
        displayName,
        email,
        photoURL,
        createdAt,
        ...additionalData
      })
    } catch (error) {
    }
  }

  return getUserDocument(user.uid);
}

export const getUserDocument = async (uid) => {
  if (!uid) return null;

  try {
    const userDocument = await getDoc(doc(db, 'users', uid));

    return { uid, ...userDocument.data() };
  } catch (error) {
    console.error('Error fetching user', error.message);
  }
}

export default firebaseApp;