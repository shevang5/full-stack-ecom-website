import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncGetUserOrders } from "../store/action/orderActions";

export default function MyOrders() {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(asyncGetUserOrders());
  }, [dispatch]);

  if (loading)
    return <p className="text-center py-10 text-gray-500">Loading orders...</p>;

  if (!orders || orders.length === 0)
    return (
      <p className="text-center py-16 text-gray-500">
        🛒 You have no orders yet.
      </p>
    );
     const statusOrder = ["pending", "processing", "shipped", "delivered"];

  // Badge styles for each status
  const statusBadge = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Optional: for progress bar stages
  // After checking if there are orders
// Sort orders so that pending ones appear first
const sortedOrders = [...orders].sort((a, b) => {
  if (a.status === "pending" && b.status !== "pending") return -1;
  if (a.status !== "pending" && b.status === "pending") return 1;
  return 0;
});

return (
  <div className="max-w-5xl mx-auto p-6">
    <h1 className="text-3xl font-bold mb-6 text-center">My Orders</h1>

    {sortedOrders.map((order) => {
      const statusIndex = statusOrder.indexOf(order.status);

      return (
        <div key={order._id} className="bg-white p-4 mb-6 rounded shadow-md">
          {/* Order Header */}
          <div className="flex justify-between items-center mb-4">
            <span
              className={`px-3 py-1 rounded-full font-semibold ${statusBadge(order.status)}`}
            >
              {order.status.toUpperCase()}
            </span>
            <p>
              <span className="font-semibold">Total:</span> $
              {order.total?.toFixed(2)}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center mb-4">
            {statusOrder.map((s, i) => (
              <div key={s} className="flex-1">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i <= statusIndex ? "bg-green-500" : "bg-gray-300"
                  }`}
                />
                <p className="text-xs text-center mt-1">{s}</p>
              </div>
            ))}
          </div>

          {/* Products */}
          <div className="space-y-3">
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
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                    <p className="text-gray-600">
                      Price: ${item.product?.price?.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-sm text-gray-400 mt-3">Order ID: {order._id}</p>
        </div>
      );
    })}
  </div>
);

}
