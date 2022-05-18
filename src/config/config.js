import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAuPyU-vTstxsbdjpRKaEc9tGcU2WiwEFQ",
  authDomain: "adresar-ea8a7.firebaseapp.com",
  databaseURL: "https://adresar-ea8a7-default-rtdb.firebaseio.com",
  projectId: "adresar-ea8a7",
  storageBucket: "adresar-ea8a7.appspot.com",
  messagingSenderId: "421594675906",
  appId: "1:421594675906:web:74d8125c31811481b6195b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app)