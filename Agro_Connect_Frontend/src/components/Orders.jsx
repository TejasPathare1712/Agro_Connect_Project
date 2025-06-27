import React, { useEffect, useState } from "react";
import API from "../services/api";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/orders/my", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (Array.isArray(res.data)) {
        setOrders(res.data);
      } else {
        console.error("Unexpected response:", res.data);
        setOrders([]);
      }
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      setOrders([]);
    }
  };

  const placeOrder = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      await API.post(
        "/orders/place",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Order placed successfully");
      fetchOrders();
    } catch (err) {
      alert("Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
          My Orders
        </h2>

        <div className="text-center mb-6">
          <button
            onClick={placeOrder}
            disabled={loading}
            className={`bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Placing Order..." : "Place New Order"}
          </button>
        </div>

        {orders.length === 0 ? (
          <p className="text-center text-gray-500">You have no orders yet.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white border border-gray-200 rounded shadow-md p-4"
              >
                <h4 className="text-xl font-semibold text-green-800 mb-2">
                  Order #{order.id}
                </h4>
                <p className="text-gray-600 mb-2">
                  Date:{" "}
                  {order.orderDate
                    ? new Date(order.orderDate).toLocaleString()
                    : "N/A"}
                </p>

                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {(order.orderItems || []).map((item, index) => (
                    <li key={index}>
                      {item.product ? (
                        <>
                          <span className="font-medium">
                            {item.product.name}
                          </span>{" "}
                          - ₹{item.product.price} × {item.quantity}
                        </>
                      ) : (
                        <span className="text-red-500">Product not found</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
