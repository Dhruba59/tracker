import { useEffect, useState } from 'react';
import { LOCAL_STORAGE_KEYS } from '@constants/storage-constants';

interface Session {
  user_id: number;
  first_name: string;
  last_name: string;
  user_roles: string[];
  business_unit_id: number;
}

interface UseSessionHookType {
  session: Session | undefined | null;
  status: 'loading' | 'authenticated' | 'unauthenticated';
}

export const useSession = (): UseSessionHookType => {
  const [session, setSession] = useState<UseSessionHookType>({
    session: undefined,
    status: 'loading',
  });

  useEffect(() => {
    const existingSession = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
    if (existingSession) {
      setSession({
        session: JSON.parse(existingSession),
        status: 'authenticated',
      });
    } else {
      setSession({
        session: null,
        status: 'unauthenticated',
      });
    }
  }, []);

  return session;
};
