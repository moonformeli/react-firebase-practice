import { PropsWithChildren } from 'react';
import { useFirebaseInit } from '../hooks';

export default function FirebaseProvider({ children }: PropsWithChildren) {
  const { fbApp } = useFirebaseInit();

  if (!fbApp) {
    return <div>Loading ...</div>;
  }

  return <>{children}</>;
}
