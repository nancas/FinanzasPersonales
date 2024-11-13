// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRkO9pC32U3Oct31mSGDPeCs-P8syAxjs",
  authDomain: "finanzas-personales-37382.firebaseapp.com",
  projectId: "finanzas-personales-37382",
  storageBucket: "finanzas-personales-37382.appspot.com",
  messagingSenderId: "920585904720",
  appId: "1:920585904720:web:f0d513ca4bd2e1e20f2755"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// es para que el componente auth se conecte con firebass
export const auth = getAuth(app);