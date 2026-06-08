import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDVCm6T29rDNvhJmbo3wWY5BogjFr9_KEU",
  authDomain: "to-do-list-583da.firebaseapp.com",
  projectId: "to-do-list-583da",
  storageBucket: "to-do-list-583da.firebasestorage.app",
  messagingSenderId: "920082217822",
  appId: "1:920082217822:web:184e345031e6b83096adcf",
  measurementId: "G-8WDBFBYMX3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export { db, auth, googleProvider };