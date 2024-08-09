import { FirebaseApp } from 'firebase/app';
import { useGoogleLogin } from '../hooks';

interface LoginProps {
  app: FirebaseApp | null;
  isSignedIn: boolean;
  onLogin: () => void;
}

export default function Login({ app, isSignedIn, onLogin }: LoginProps) {
  const { signIn } = useGoogleLogin(app);

  const handleSignIn = async () => {
    const credential = await signIn();

    if (credential?.accessToken) {
      onLogin();
    }
  };

  if (isSignedIn) {
    return <h1>로그인 완료</h1>;
  }

  return <button onClick={handleSignIn}>구글 로그인</button>;
}
