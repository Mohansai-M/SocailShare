import {initializeApp} from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIla5WVZ14ilmmW4kopLa6H7F2WwNgPqc",
  authDomain: "social-share-b3d18.firebaseapp.com",
  projectId: "social-share-b3d18",
  databaseURL: "https://social-share-b3d18-default-rtdb.firebaseio.com/",
  
  storageBucket: "social-share-b3d18.appspot.com",
  messagingSenderId: "458412278379",
  appId: "1:458412278379:web:29ea7c0866611ab072272e",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

