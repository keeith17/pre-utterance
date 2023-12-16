import { FirebaseApp, getApp, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export let app: FirebaseApp;

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: "G-TTLDSTPDZ8",
};

try {
    app = getApp("app");
} catch (e) {
    app = initializeApp(firebaseConfig, "app");
}

const firebase = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export default firebase;
