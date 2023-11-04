import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCRIHB9nJyViEzVSMsin4v0Er5M095d2XQ",
  authDomain: "textmate-db.firebaseapp.com",
  projectId: "textmate-db",
  storageBucket: "textmate-db.appspot.com",
  messagingSenderId: "743043498822",
  appId: "1:743043498822:web:63daff95a1bec0c7365b47"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app,auth,db };