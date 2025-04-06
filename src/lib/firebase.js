import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCztD1AvpjxRbJ40hPSLgNh01fiReSuJ5Q",
    authDomain: "dbet-df365.firebaseapp.com",
    projectId: "dbet-df365",
    storageBucket: "dbet-df365.firebasestorage.app",
    messagingSenderId: "323522244673",
    appId: "1:323522244673:web:b2586720b72056b28b56c0",
    measurementId: "G-5P3BSJPNWL"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);