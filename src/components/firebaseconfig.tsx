
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAJXEG-fkpO13oS1i4SQ23WrUSfL3_kpBE",
    authDomain: "info6132adv.firebaseapp.com",
    projectId: "info6132adv",
    storageBucket: "info6132adv.appspot.com",
    messagingSenderId: "746427736853",
    appId: "1:746427736853:web:43a56686099f72b2717f1c"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
