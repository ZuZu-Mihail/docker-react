import React, { createContext, useState, useEffect } from "react";

/* In this code, `export const ItemContext = createContext({ items: [], setItems: () => {}, });` is
creating a new context object called `ItemContext` using the `createContext` function from React. */
export const ItemContext = createContext({
  items: [],
  setItems: () => {},
});

/**
 * The ItemProvider component is a wrapper that provides an item context to its children components.
 * @returns The `ItemProvider` component is returning a `ItemContext.Provider` component with the
 * `children` prop passed as its children. The `ItemContext.Provider` component is providing the
 * `items` and `setItems` values to its descendants through the `ItemContext.Provider` component's
 * `value` prop.
 */
const ItemProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/tasks")
    .then((response) => response.json())
    .then((data) => setItems(data));
  }, []);
  return (
    <ItemContext.Provider value={{ items, setItems }}>
      {children}
    </ItemContext.Provider>
  );
};

export default ItemProvider;
