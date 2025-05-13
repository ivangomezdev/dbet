import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
 apiKey: "AIzaSyC3SyuRhIRtUv_VYdBo750-1O4X7YLgiSg",
  authDomain: "dbet360.firebaseapp.com",
  projectId: "dbet360",
  storageBucket: "dbet360.firebasestorage.app",
  messagingSenderId: "307381226888",
  appId: "1:307381226888:web:22aea15e23797e68823e3d"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);