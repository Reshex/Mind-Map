import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDAOtc93LQLS0yF-1dOVgd8YpiVIsutovc",
  authDomain: "mind-map-da8fb.firebaseapp.com",
  databaseURL: "https://mind-map-da8fb-default-rtdb.firebaseio.com",
  projectId: "mind-map-da8fb",
  storageBucket: "mind-map-da8fb.appspot.com",
  messagingSenderId: "396419413613",
  appId: "1:396419413613:web:c1c751b626ac9bc4263164",
  measurementId: "G-1CL3C1035T",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
