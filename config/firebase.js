import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCtFtwxorrzOqoulVKHLkwra5OMlLoxABQ",
  authDomain: "questionnaire-app-cb801.firebaseapp.com",
  projectId: "questionnaire-app-cb801",
  storageBucket: "questionnaire-app-cb801.appspot.com",
  messagingSenderId: "186316756531",
  appId: "1:186316756531:web:3085877a4f3d147abcf546"
};

firebase.initializeApp(firebaseConfig);

export default firebase;