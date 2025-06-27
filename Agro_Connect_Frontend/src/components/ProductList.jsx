import React, { useEffect, useState } from "react";
import API from "../services/api";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get("/products/all")
      .then((res) => setProducts(res.data))
      .catch((err) => {
        console.error("Error fetching products:", err);
        alert("Failed to load products");
      });
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-6 text-green-600">
        🛒 Available Fresh Produce
      </h2>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-lg rounded-xl p-4 border border-green-100 hover:shadow-xl transition duration-300"
            >
              <h3 className="text-lg font-semibold text-green-800">
                {product.name}
              </h3>
              <p className="text-gray-700 mt-2">{product.description}</p>
              <p className="mt-3 text-green-600 font-bold">₹{product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
