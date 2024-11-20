import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext(null);

export const useUserContext = () => useContext(UserContext);

export function UserProvider({ children }) {
  const [userId, setUserId] = useState(-1);

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
}
