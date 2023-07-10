import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from "firebase/storage";
//import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAtSk3YqtjKuYgnUY_XHed5fHNNT1-2Dik",
  authDomain: "basic-jotabarber.firebaseapp.com",
  projectId: "basic-jotabarber",
  storageBucket: "basic-jotabarber.appspot.com",
  messagingSenderId: "879202135865",
  appId: "1:879202135865:web:da7ce1de69a5c36603c2e8",
  measurementId: "G-X4PG1MR9TR"
 // measurementId: false,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);
const storage = getStorage(app);

export {
  db,
  auth,
  storage
} 
//const analytics = getAnalytics(app);