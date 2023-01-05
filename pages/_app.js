import { ProductsProvider } from "../context/ProductsContext";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <ProductsProvider>
        <Component {...pageProps} />
      </ProductsProvider>
    </>
  );
}
