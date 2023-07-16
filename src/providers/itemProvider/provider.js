import React, { createContext, useState } from "react";

export const ItemContext = createContext({
  items: [],
  setItems: () => {},
});

const ItemProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  return (
    <ItemContext.Provider value={{ items, setItems }}>
      {children}
    </ItemContext.Provider>
  );
};

export default ItemProvider;
