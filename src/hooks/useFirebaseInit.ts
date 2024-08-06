import { useEffect, useState } from 'react';
import { initializeApp, type FirebaseApp } from 'firebase/app';

export const useFirebase = () => {
  const [fbApp, setFbApp] = useState<FirebaseApp | null>(null);

  useEffect(() => {
    // Import the functions you need from the SDKs you need
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries
    if (!fbApp) {
      const firebaseConfig = {
        apiKey: 'AIzaSyBWwUcNob9pIazHbhzDvAUskybAosKnZUU',
        authDomain: 'elice-practice-31bde.firebaseapp.com',
        projectId: 'elice-practice-31bde',
        storageBucket: 'elice-practice-31bde.appspot.com',
        messagingSenderId: '594914395919',
        appId: '1:594914395919:web:94730774d25b78dabca07a',
      };

      // Initialize Firebase
      const app = initializeApp(firebaseConfig);
      setFbApp(app);
    }
  }, []);

  return { fbApp };
};
