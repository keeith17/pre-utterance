import { FirebaseApp, getApp, initializeApp } from "firebase/app";

export let app: FirebaseApp;

const firebaseConfig = {
    apiKey: process.env.VITE_DEFAULT_API_KEY,
    authDomain: process.env.VITE_DEFAULT_AUTH_DOMAIN,
    projectId: process.env.VITE_DEFAULT_PROJECT_ID,
    storageBucket: process.env.VITE_DEFAULT_STORAGE_BUCKET,
    messagingSenderId: process.env.VITE_DEFAULT_MESSAGING_SENDER_ID,
    appId: process.env.VITE_DEFAULT_APP_ID,
    measurementId: "G-TTLDSTPDZ8",
};

try {
    app = getApp("app");
} catch (e) {
    app = initializeApp(firebaseConfig, "app");
}

const firebase = initializeApp(firebaseConfig);

export default firebase;
