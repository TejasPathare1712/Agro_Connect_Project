import React, { useState, useEffect } from "react";
import API from "../services/api";

const FarmerDashboard = () => {
  const [form, setForm] = useState({ name: "", price: "", description: "" });
  const [products, setProducts] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addProduct = async (e) => {
    e.preventDefault();
    try {
      await API.post("/products/add", form);
      alert("Product added");
      setForm({ name: "", price: "", description: "" }); // Reset form
      fetchProducts();
    } catch (err) {
      alert("Failed to add product");
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products/my");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-green-700 text-center mb-6">
          Farmer Dashboard
        </h2>

        {/* Product Form */}
        <form
          onSubmit={addProduct}
          className="bg-white p-6 rounded-lg shadow-md border border-green-200 mb-8"
        >
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Add New Product
          </h3>

          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            className="w-full mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="w-full mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />

          <input
            type="text"
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Add Product
          </button>
        </form>

        {/* Product List */}
        <h3 className="text-2xl font-semibold mb-4 text-green-800">
          My Products
        </h3>
        {products.length === 0 ? (
          <p className="text-gray-500">No products added yet.</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {products.map((p) => (
              <li
                key={p.id}
                className="bg-white border border-green-100 rounded shadow-sm p-4 hover:shadow-md transition"
              >
                <h4 className="text-lg font-semibold text-green-700">
                  {p.name}
                </h4>
                <p className="text-gray-600">₹{p.price}</p>
                <p className="text-gray-500">{p.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FarmerDashboard;
