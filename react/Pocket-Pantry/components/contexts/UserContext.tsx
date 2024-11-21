import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext(null);

export const useUserContext = () => useContext(UserContext);

export function UserProvider({ children }) {
  const [userData, setUserData] = useState(-1);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
}
