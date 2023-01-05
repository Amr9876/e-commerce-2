import { createContext, useContext } from "react";
import useLocalStorageState from "use-local-storage-state";

const ProductsContext = createContext({});

export function ProductsProvider({ children }) {
  const [selectedProducts, setSelectedProducts] = useLocalStorageState("cart", {
    defaultValue: [],
  });

  return (
    <ProductsContext.Provider value={{ selectedProducts, setSelectedProducts }}>
      {children}
    </ProductsContext.Provider>
  );
}

export const useProducts = () => useContext(ProductsContext);
