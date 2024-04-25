// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD9mfcUIQTcA2DH9pGO6u9SjmZMMaZX9SY",
    authDomain: "ipfy-6779a.firebaseapp.com",
    projectId: "ipfy-6779a",
    storageBucket: "ipfy-6779a.appspot.com",
    messagingSenderId: "967123476347",
    appId: "1:967123476347:web:d0d9046990d96718c2e7de",
    measurementId: "G-NGKR6T2CJN"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
