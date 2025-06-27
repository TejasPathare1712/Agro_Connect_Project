import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    alert("Logged out successfully");
    navigate("/login");
  };

  return (
    <nav className="bg-green-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <div className="text-xl font-bold">🌾 AgroConnect</div>
        <div className="flex gap-4 text-sm sm:text-base">
          <Link to="/" className="hover:text-yellow-300">
            Home
          </Link>
          <Link to="/register" className="hover:text-yellow-300">
            Register
          </Link>
          <Link to="/login" className="hover:text-yellow-300">
            Login
          </Link>
          <Link to="/products" className="hover:text-yellow-300">
            Products
          </Link>

          {role === "FARMER" && (
            <Link to="/farmer" className="hover:text-yellow-300">
              Farmer Dashboard
            </Link>
          )}
          {role === "CUSTOMER" && (
            <>
              <Link to="/cart" className="hover:text-yellow-300">
                Cart
              </Link>
              <Link to="/orders" className="hover:text-yellow-300">
                Orders
              </Link>
            </>
          )}
          {role && (
            <button
              onClick={handleLogout}
              className="bg-white text-green-700 px-3 py-1 rounded hover:bg-yellow-300 transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
