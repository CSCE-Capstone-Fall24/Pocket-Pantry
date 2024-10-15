import React, { createContext, useState, useContext } from 'react';

const InventoryContext = createContext<any>(null);

export const InventoryProvider = ({ children }: { children: React.ReactNode }) => {
  const [inventory, setInventory] = useState<any[]>([]);

  const addItemToInventory = (item: { name: string; quantity: number; expirationDate: string; comment: string }) => {
    setInventory((prevInventory) => [...prevInventory, item]);
  };

  return (
    <InventoryContext.Provider value={{ inventory, addItemToInventory }}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => useContext(InventoryContext);
