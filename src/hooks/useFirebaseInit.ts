import { useEffect, useState } from 'react';
import { initializeApp, type FirebaseApp } from 'firebase/app';

export const useFirebaseInit = () => {
  const [fbApp, setFbApp] = useState<FirebaseApp | null>(null);

  useEffect(() => {
    // Import the functions you need from the SDKs you need
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries
    if (!fbApp) {
      const firebaseConfig = {
        apiKey: process.env.REACT_APP_API_KEY,
        authDomain: process.env.REACT_APP_AUTH_DOMAIN,
        projectId: process.env.REACT_APP_PROJECT_ID,
        storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_APP_ID,
      };

      // Initialize Firebase
      const app = initializeApp(firebaseConfig);
      setFbApp(app);
    }
  }, []);

  return { fbApp };
};
