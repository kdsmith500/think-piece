import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';

const config = {
  apiKey: "AIzaSyAMZuAbobty7S1IqopYN6FZU5zpXLIzTOA",
  authDomain: "think-piece-practice-52f15.firebaseapp.com",
  projectId: "think-piece-practice-52f15",
  storageBucket: "think-piece-practice-52f15.appspot.com",
  messagingSenderId: "1065013218620",
  appId: "1:1065013218620:web:5365cb3aaf4131fc2ae239",
  measurementId: "G-V109BLJ7LW"
};

// firebase.initializeApp(config); // firebase v8
const firebaseApp = initializeApp({ config }); // firebase v9

// export const firestore = firebase.firestore(); // firebase v8
// export const firestore = getFirestore(firebaseApp); // firebase v9

window.firebase = firebaseApp; // this is for quick debugging in the browser

export default firebaseApp;