import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncLogoutUsers } from "../store/action/userActions";
import axios from "../api/config";

const Navbar = () => {
  const dispatch = useDispatch();

  // Assuming your user reducer stores a single logged-in user
  const rawUser = useSelector((state) => state.usersReducer.user);
  const user = rawUser?.user; // extract the nested user object

  const navigate = useNavigate();

  // show total product count (sum of quantities) from server-side cart
  const [cartCount, setCartCount] = useState(0);

  // fetch cart when user changes (will include auth token via axios config)
  useEffect(() => {
    let mounted = true;
    const fetchCart = async () => {
      if (!user) {
        if (mounted) setCartCount(0);
        return;
      }
      try {
        const { data } = await axios.get("/cart");
        const count =
          data?.items?.reduce((sum, it) => sum + (it.quantity || 0), 0) || 0;
        if (mounted) setCartCount(count);
      } catch (err) {
        console.error("Failed to load cart for navbar:", err);
      }
    };
    fetchCart();
    return () => {
      mounted = false;
    };
  }, [user]);

  console.log(user);

  const logout = () => {
    dispatch(asyncLogoutUsers());
    navigate("/login");
  };

  return (
    <nav className="bg-gray-200 px-4 py-2 flex justify-between items-center">
      <ul className="flex items-center">
        <li className="mr-6">
          <NavLink
            className={({ isActive }) =>
              isActive ? "text-blue-500" : "text-gray-800 hover:text-blue-700"
            }
            to="/"
          >
            Home
          </NavLink>
        </li>
        <li className="mr-6">
          <NavLink
            className={({ isActive }) =>
              isActive ? "text-blue-500" : "text-gray-800 hover:text-blue-700"
            }
            to="/products"
          >
            Products
          </NavLink>
        </li>
        {user && (
          <>
        <li className="mr-6 relative">
          <NavLink
            className={({ isActive }) =>
              isActive ? "text-blue-500" : "text-gray-800 hover:text-blue-700"
            }
            to="/cart"
          >
            Cart
            {cartCount > 0 && (
              <span className="ml-1 bg-red-500 text-white rounded-full px-2 text-sm">
                {cartCount}
              </span>
            )}
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? "text-blue-500" : "text-gray-800 hover:text-blue-700"
            }
            to="/myorders"
          >My Orders
          </NavLink>
        </li>
          
          </>
        )}

        {/* Show admin links only if role is admin */}
        {user && user.role === "admin" && (
          <>
          <li className="mr-6">
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-blue-500" : "text-gray-800 hover:text-blue-700"
              }
              to="/admin/create-product"
            >
              Create Product
            </NavLink>
          </li>

          <li className="mr-6">
      <NavLink
        className={({ isActive }) =>
          isActive ? "text-blue-500" : "text-gray-800 hover:text-blue-700"
        }
        to="/admin/orders"
      >
        Manage Orders
      </NavLink>
    </li>
          
              </>
        )}
      </ul>

      <div className="flex items-center">
        {user ? (
          <>
            <span className="mr-4">Hello, {user.name}</span>
            <button
              className="text-gray-800 hover:text-blue-700"
              onClick={logout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              className="mr-4 text-gray-800 hover:text-blue-700"
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className="text-gray-800 hover:text-blue-700"
            >
              Register
            </NavLink>
          </>
        )}

        
      </div>
    </nav>
  );
};

export default Navbar;
