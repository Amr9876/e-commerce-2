import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useProducts } from "../context/ProductsContext";

export default function CheckoutPage() {
  const { selectedProducts, setSelectedProducts } = useProducts();
  const [products, setProducts] = useState([]);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const uniqueProducts = [...new Set(selectedProducts)];
    fetch(`/api/products?ids=${uniqueProducts.join(",")}`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [selectedProducts]);

  function moreOfThisProduct(id) {
    setSelectedProducts((prev) => [...prev, id]);
  }

  function lessOfThisProduct(id) {
    const pos = selectedProducts.indexOf(id);

    if (pos !== -1) {
      setSelectedProducts((prev) => {
        return prev.filter((value, index) => index !== pos);
      });
    }
  }

  const deliveryPrice = 5;
  let subtotal = 0;

  if (selectedProducts?.length) {
    for (let id of selectedProducts) {
      const price =
        products.length > 0 ? products.find((p) => p._id === id)?.price : 0;

      subtotal += price;
    }
  }

  const total = subtotal + deliveryPrice;

  return (
    <Layout>
      {!products.length ? (
        <p>No products in your shopping cart</p>
      ) : (
        products.map((product) => (
          <div className="flex mb-5" key={product._id}>
            <div className="bg-gray-100 p-3 rounded-xl shrink-0">
              <img src={product.picture} alt={product.name} className="w-24" />
            </div>
            <div className="pl-4">
              <h3 className="font-bold text-lg">{product.name}</h3>
              <p className="text-sm leading-4 text-gray-500">
                {product.description}
              </p>
              <div className="flex">
                <div className="grow">${product.price}</div>
                <div className="mt-2">
                  <button
                    onClick={() => lessOfThisProduct(product._id)}
                    className="border border-rose-500 px-2 rounded-lg text-rose-500 font-bold transition-all delay-150 hover:bg-rose-500 hover:text-white"
                  >
                    -
                  </button>
                  <span className="px-2">
                    {selectedProducts.filter((id) => id === product._id).length}
                  </span>
                  <button
                    onClick={() => moreOfThisProduct(product._id)}
                    className="border border-emerald-500 px-2 rounded-lg text-emerald-500 font-bold transition-all delay-150 hover:bg-emerald-500 hover:text-white"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
      <form action="/api/checkout" method="POST">
        <div className="mt-4">
          <input
            className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2"
            type="text"
            placeholder="Street address, number"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2"
            type="text"
            placeholder="City and postal code"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2"
            type="text"
            placeholder="Your name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2"
            type="email"
            placeholder="Email address"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mt-4">
          <div className="flex my-3">
            <h3 className="grow font-bold text-gray-400">Subtotal:</h3>
            <h3 className="font-bold">${subtotal}</h3>
          </div>
          <div className="flex my-3">
            <h3 className="grow font-bold text-gray-400">Delivery:</h3>
            <h3 className="font-bold">${deliveryPrice}</h3>
          </div>
          <div className="flex my-3 border-t-2 pt-3 border-dashed border-emerald-500">
            <h3 className="grow font-bold text-gray-400">Total:</h3>
            <h3 className="font-bold">${total}</h3>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <input
            type="hidden"
            name="products"
            value={selectedProducts.join(",")}
          />

          <button
            type="submit"
            className="bg-emerald-500 px-5 py-2 rounded-xl font-bold text-white sm:w-[50%] w-full my-4 shadow-emerald-300 shadow-lg"
          >
            Pay ${total}
          </button>
        </div>
      </form>
    </Layout>
  );
}
