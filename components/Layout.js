import { useEffect, useState } from "react";
import { useProducts } from "../context/ProductsContext";
import Footer from "./Footer";

export default function Layout({ children }) {
  const { setSelectedProducts } = useProducts();
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (window.location.href.includes("success")) {
      setSelectedProducts([]);
      setSuccess(true);
    }
  }, []);

  return (
    <>
      <div className="p-5 mb-20">
        {success && (
          <div className="mb-5 bg-green-400 text-white text-lg p-5 rounded-xl">
            Thanks for your order!
          </div>
        )}
        {children}
      </div>

      <Footer />
    </>
  );
}
