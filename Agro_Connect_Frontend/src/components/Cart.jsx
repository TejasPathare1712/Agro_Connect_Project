import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom"; // 🔥 Import useNavigate

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // 🔥 Initialize navigation

  const fetchCart = () => {
    const token = localStorage.getItem("token");
    API.get("/cart/view", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => setCartItems(res.data))
      .catch((err) => console.error(err));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!productId || quantity <= 0) return alert("Invalid input");

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      await API.post(
        `/cart/add?productId=${productId}&quantity=${quantity}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Item added to cart");
      setProductId("");
      setQuantity(1);
      fetchCart();
    } catch (err) {
      alert("Failed to add item");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await API.delete(`/cart/remove/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Item removed");
      fetchCart();
    } catch (err) {
      alert("Failed to remove item");
    }
  };

  const handlePlaceOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      await API.post(
        "/orders/place",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Order placed successfully");
      fetchCart();
      navigate("/orders"); // 🔥 Navigate to Order.jsx
    } catch (err) {
      alert("Failed to place order");
    }
  };

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.product.price,
    0
  );

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-green-700 text-center mb-6">
          Shopping Cart
        </h2>

        {/* Add to Cart Form */}
        <form
          onSubmit={handleAdd}
          className="bg-white p-6 mb-6 rounded-lg shadow-md border border-green-200"
        >
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Add Product to Cart
          </h3>

          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Product ID"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
            <input
              type="number"
              min="1"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-32 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className={`bg-green-600 text-white px-6 py-2 rounded transition ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-700"
              }`}
            >
              {loading ? "Adding..." : "Add"}
            </button>
          </div>
        </form>

        {/* Cart Items */}
        <h3 className="text-2xl font-semibold text-green-800 mb-4">
          Your Cart
        </h3>
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 p-4 rounded shadow-sm hover:shadow-md transition flex justify-between items-center"
              >
                <div>
                  <h4 className="text-lg font-semibold text-green-700">
                    {item.product.name}
                  </h4>
                  <p className="text-gray-600">Qty: {item.quantity}</p>
                  <p className="text-gray-500">₹{item.product.price} each</p>
                </div>
                <div className="text-right">
                  <p className="text-green-700 font-bold">
                    ₹{item.quantity * item.product.price}
                  </p>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            {/* Total & Place Order */}
            <div className="text-right mt-6">
              <p className="text-xl font-bold text-green-800 mb-3">
                Total: ₹{totalAmount}
              </p>
              <button
                onClick={handlePlaceOrder}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
              >
                Place Order
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
