import React, { useEffect, useState } from "react";
import axios from "../api/config";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [updatingIds, setUpdatingIds] = useState({});

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const { data } = await axios.get("/cart");
      setCart(data);
    } catch (err) {
      console.log(err);
    }
  };

  const updateQty = async (id, type) => {
    try {
      // mark this item as updating to prevent duplicate clicks
      setUpdatingIds((s) => ({ ...s, [id]: true }));

      // call the update endpoint — it returns the updated cart, so use it
      const { data } = await axios.put(`/cart/item/${id}`, { type }); // returns updated cart

      // update local state using returned cart (avoid an extra GET request)
      setCart(data);
    } catch (err) {
      console.log(err);
    } finally {
      setUpdatingIds((s) => ({ ...s, [id]: false }));
    }
  };

  const removeItem = async (id) => {
    try {
      // call DELETE /cart/:productId (server expects productId as URL param)
      await axios.delete(`/cart/${id}`);

      loadCart();
    } catch (err) {
      console.log(err);
    }
  };
  const checkout = async () => {
  try {
    const orderData = {
      products: cart.items.map(item => ({
        product: item.product._id,
        quantity: item.quantity
      })),
      total: cart.items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      )
    };

    await axios.post("/orders", orderData);
    setCart({ items: [] });   // immediate UI clear
    loadCart();               // re-sync with server
    alert("✅ Order Placed Successfully!");
  } catch (err) {
    console.log(err.response?.data || err.message);
    alert("❌ Failed to place order");
  }
};


  if (!cart || cart.items.length === 0)
    return (
      <div className="text-center py-16 text-gray-500">
        🛒 Your cart is empty.
        <br />
        <Link to="/products" className="text-blue-600 underline">Go Shopping</Link>
      </div>
    );

  const total = cart.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cart.items.map(item => {
        if (!item.product) return (
          <div key={item._id} className="p-4">Product removed</div>
        );
        return (
          <div
            key={item._id}
            className="flex items-center justify-between bg-white p-4 mb-4 rounded shadow-md"
          >
            <img
              src={item.product.image}
              className="w-20 h-20 object-cover rounded"
              alt={item.product.name}
            />

            <div className="w-1/3">
              <h2 className="font-semibold text-lg">{item.product.name}</h2>
              <p className="text-gray-600">${item.product.price}</p>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => updateQty(item._id, "dec")}
                className={`px-3 py-1 rounded ${updatingIds[item._id] ? 'bg-gray-300 cursor-wait' : 'bg-gray-200 hover:bg-gray-300'}`}
                disabled={!!updatingIds[item._id]}
              >
                {updatingIds[item._id] ? '...' : '-'}
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => updateQty(item._id, "inc")}
                className={`px-3 py-1 rounded ${updatingIds[item._id] ? 'bg-gray-300 cursor-wait' : 'bg-gray-200 hover:bg-gray-300'}`}
                disabled={!!updatingIds[item._id]}
              >
                {updatingIds[item._id] ? '...' : '+'}
              </button>
            </div>

            <button
              onClick={() => removeItem(item.product._id)}
              className="text-red-500 hover:underline"
            >
              Remove
            </button>
          </div>
        )
      })}

      <div className="text-right text-2xl font-semibold mt-4">
        Total: <span className="text-green-600">${total}</span>
      </div>

      <button
        onClick={checkout}
        className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition"
      >
        ✅ Place Order
      </button>
    </div>
  );
};

export default Cart;
