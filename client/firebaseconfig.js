// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBeAABoeeX2QdXjdLzKJe0Gd4PIB9jFoiI",
  authDomain: "ezpc-ccff8.firebaseapp.com",
  projectId: "ezpc-ccff8",
  storageBucket: "ezpc-ccff8.firebasestorage.app",
  messagingSenderId: "1033279158105",
  appId: "1:1033279158105:web:ed86baf13b57d7eca1be48",
  measurementId: "G-H7F8LPZRH5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);

