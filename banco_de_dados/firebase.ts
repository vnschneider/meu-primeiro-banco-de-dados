// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import * as firestore from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARC_Zxq40khYiyiZ357DXsjY8ggYJ_aRk",
  authDomain: "teste-1c96d.firebaseapp.com",
  projectId: "teste-1c96d",
  storageBucket: "teste-1c96d.appspot.com",
  messagingSenderId: "766998349001",
  appId: "1:766998349001:web:478aaa644e02217e6cf918",
};

// Initialize Firebase
console.log("Conectado ao Firebase!");
const Firebase = initializeApp(firebaseConfig);
export const db = firestore.getFirestore(Firebase);

export { firestore };
