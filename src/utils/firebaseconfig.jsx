import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
//import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBGZZpIS0wSH29Tm5GBR_O-2NuGj0NLlwA",
  authDomain: "jota-barber.firebaseapp.com",
  projectId: "jota-barber",
  storageBucket: "jota-barber.appspot.com",
  messagingSenderId: "674666335417",
  appId: "1:674666335417:web:fe3245fcf1b94c5cd91f68",
  measurementId: "G-ZWWS7N3RL3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);

export {
  db,
  auth
} 
//const analytics = getAnalytics(app);