import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDSsZdXNbMymDg7V6pFtdWRscU_JfhGgkY',
  authDomain: 'my-project-a7372.firebaseapp.com',
  projectId: 'my-project-a7372',
  storageBucket: 'my-project-a7372.appspot.com',
  messagingSenderId: '951555040496',
  appId: '1:951555040496:web:3c36bd58816f0def304e35',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
