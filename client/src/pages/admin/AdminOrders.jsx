import React, { useEffect, useState } from "react";
import axios from "../../api/config";

const statusOptions = ["pending", "processing", "shipped", "delivered", "cancelled"];

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
  try {
    const { data } = await axios.get("/orders"); // Admin-only endpoint

    // ✅ Sort so pending orders appear first
    const sorted = [...data].sort((a, b) => {
      if (a.status === "pending" && b.status !== "pending") return -1;
      if (a.status !== "pending" && b.status === "pending") return 1;
      return 0;
    });

    setOrders(sorted);
    setLoading(false);
  } catch (err) {
    console.error(err);
    setLoading(false);
  }
};


  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, status) => {
    try {
      const { data } = await axios.put(`/orders/${orderId}/status`, { status });
      setOrders((prev) =>
        prev.map((order) => (order._id === orderId ? data : order))
      );
    } catch (err) {
      console.error(err);
      alert("❌ Failed to update status");
    }
  };

  if (loading) return <p className="text-center py-10 text-gray-500">Loading orders...</p>;

  if (!orders.length) return <p className="text-center py-16 text-gray-500">No orders yet.</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Orders</h1>

      {orders.map((order) => (
  <div
    key={order._id}
    className={`p-4 mb-6 rounded shadow-md border
      ${
        order.status === "pending"
          ? "bg-yellow-100 border-yellow-400"
          : "bg-white"
      }`}
  >
    <div className="flex justify-between items-center mb-4">
      <p>
        <span className="font-semibold">User:</span>{" "}
        {order.user?.name || order.user?._id}
      </p>
      <p>
        <span className="font-semibold">Total:</span> $
        {order.total?.toFixed(2)}
      </p>
    </div>

    <div className="space-y-3 mb-4">
      {order.products?.map((item) => (
        <div
          key={item._id}
          className="flex items-center justify-between bg-gray-50 p-3 rounded"
        >
          <div className="flex items-center">
            <img
              src={item.product?.image}
              alt={item.product?.name}
              className="w-20 h-20 object-cover rounded mr-4"
            />
            <div>
              <p className="font-semibold">{item.product?.name}</p>
              <p className="text-gray-600">Qty: {item.quantity}</p>
              <p className="text-gray-600">
                Price: ${item.product?.price?.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>

    <div className="flex items-center justify-between mt-3">
      <p className="text-sm text-gray-400">Order ID: {order._id}</p>
      <select
        className="border rounded px-3 py-1"
        value={order.status}
        onChange={(e) => handleStatusChange(order._id, e.target.value)}
      >
        {statusOptions.map((status) => (
          <option key={status} value={status}>
            {status.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  </div>
))}

    </div>
  );
}
