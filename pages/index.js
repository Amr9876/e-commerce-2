import { useState } from "react";
import Footer from "../components/Footer";
import Layout from "../components/Layout";
import Product from "../components/Product";
import { initMongoose } from "../lib/mongoose";
import { findAllProducts } from "./api/products";

export default function Home({ products }) {
  const [phrase, setPhrase] = useState("");

  if (!products) return "loading...";

  const categoriesNames = [...new Set(products.map((p) => p.category))];

  if (phrase) {
    products = products.filter((p) =>
      p.name.toLowerCase().includes(phrase.toLowerCase())
    );
  }

  return (
    <Layout>
      <input
        type="text"
        placeholder="Search for products..."
        className="bg-gray-100 w-full py-2 px-4 rounded-xl"
        value={phrase}
        onChange={(e) => setPhrase(e.target.value)}
      />
      <div>
        {categoriesNames.map((categoryName, i) => (
          <div key={i} className="lg:p-6">
            {products.find((p) => p.category === categoryName) && (
              <>
                <h2 className="lg:text-start text-center text-4xl font-bold py-5 capitalize">
                  {categoryName}
                </h2>

                <div className="flex lg:flex-row lg:gap-y-0 lg:items-start items-center gap-12 flex-col -mx-5 overflow-x-scroll snap-x scrollbar-hide">
                  {products
                    .filter((p) => p.category === categoryName)
                    .map((product) => (
                      <div key={product._id} className="px-5 snap-start">
                        <Product {...product} />
                      </div>
                    ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await initMongoose();

  const products = await findAllProducts();

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
