import { User, UserContextDataType, UserContextProps } from '@models/user';
import {createContext, useContext, useState } from 'react';

const initialValue: User = {
  id: '',
  name: '',
  profile_image: '',
  email: '',
  is_verified: 0,
  status: 1
};

const UserContext = createContext<UserContextDataType>(null!);

export const UserContextProvider = ({children}: UserContextProps) => {
  const [user, setUser] = useState<User>(initialValue);
  
  return(
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const {user, setUser} = useContext(UserContext);
  return {user, setUser};
};