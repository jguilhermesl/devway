import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';

/* export const firebaseConfig = {
    apiKey: process.env.VUE_APP_API_KEY,
    authDomain: process.env.VUE_APP_AUTH_DOMAIN,
    projectId: process.env.VUE_APP_PROJECT_ID,
    storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
    appId: process.env.VUE_APP_APP_ID,
    measurementId: process.env.VUE_APP_MEASUREMENT_ID
} */

const firebaseConfig = {
    apiKey: "AIzaSyBe1inVtTREHcFRUgSszvvbIQIPCHpY4f4",
    authDomain: "make-your-burguer-75357.firebaseapp.com",
    projectId: "make-your-burguer-75357",
    storageBucket: "make-your-burguer-75357.appspot.com",
    messagingSenderId: "967263679579",
    appId: "1:967263679579:web:a2e6f13fc27e0da742fb7e",
    measurementId: "G-QMKPFP6KFM"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

