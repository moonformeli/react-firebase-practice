import { FirebaseApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  signOut as googleSignOut,
  GoogleAuthProvider,
} from 'firebase/auth';

export const useGoogleLogin = (app: FirebaseApp | null) => {
  if (!app) {
    return { signIn: () => undefined, signOut: () => undefined };
  }

  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  console.log('앱 in useGoogleLogin', auth);

  const signIn = () => {
    if (!auth) {
      console.error('auth is not defined');
      return;
    }

    return signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        console.log(credential);
        // const token = credential.accessToken;
        // The signed-in user info.
        // const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...

        if (!credential) {
          throw Error('credential is null');
        }

        return credential;
      })
      .catch((error) => {
        console.log(error);
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...

        return null;
      });
  };

  const signOut = () => {
    if (!auth) {
      console.error('auth is not defined');
      return;
    }

    googleSignOut(auth)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return { signIn, signOut };
};
