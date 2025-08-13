import {
  ShoppingCart,
  Package,
  CheckCircle,
  Calendar,
  CreditCard,
  Eye,
  Truck,
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import api from "../api";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { formatPrice } from "../utils/priceformat";
import { useAuth } from "../context/AuthContext";

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case "delivered":
      return "bg-green-100 text-green-700 border-green-200";
    case "shipped":
      return "bg-purple-100 text-purple-700 border-purple-200";
    case "placed":
      return "bg-yellow-100 text-yellow-700 border-yellow-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
};

const getStatusIcon = (status) => {
  switch (status.toLowerCase()) {
    case "delivered":
      return <CheckCircle className="w-4 h-4" />;
    case "placed":
      return <Package className="w-4 h-4" />;
    case "shipped":
      return <Truck className="w-4 h-4" />;
    default:
  }
};

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  const fetchOrder = async () => {
    try {
      const res = await api.get("/user/orders");
      setOrders(res.data);
      console.log(res.data);
    } catch (error) {
      console.log("Error while fetching orders", error);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-[#2a9d8f] rounded-lg">
              <Package className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          </div>
          <p className="text-gray-600">
            Track and manage all your orders in one place
          </p>
        </div>

        {orders.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              No orders yet
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Start your shopping journey and discover amazing products tailored
              just for you.
            </p>
            <button className="bg-gradient-to-r from-[#2a9d8f] to-[#264653] hover:from-[#264653] hover:to-[#2a9d8f] text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Start Shopping
            </button>
          </div>
        ) : (
          /* Orders List */
          <div className="space-y-6">
            {orders.map((order, index) => (
              <div
                key={order._id}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Order Header */}
                <div className="bg-gradient-to-r from-gray-50 to-white p-6 border-b border-gray-100">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">
                          Order #{order._id.slice(-8).toUpperCase()}
                        </h3>
                        <div
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold border ${getStatusColor(
                            order.orderStatus
                          )}`}
                        >
                          {getStatusIcon(order.orderStatus)}
                          {order.orderStatus}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          {new Date(order.updatedAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <CreditCard className="w-4 h-4" />
                          {order.paymentMethod}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                      <div
                        className={`px-4 py-2 rounded-full text-sm font-semibold border ${
                          order.paymentStatus
                            ? "bg-green-50 text-green-700 border-green-200"
                            : "bg-amber-50 text-amber-700 border-amber-200"
                        }`}
                      >
                        {order.paymentStatus ? "✓ Paid" : "⏳ Payment Pending"}
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">
                          {formatPrice(order.amount)}
                        </div>
                        <div className="text-sm text-gray-500">
                          Total Amount
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Package className="w-5 h-5" />
                        Items Ordered ({order.items.length})
                      </h4>
                      <div className="space-y-4">
                        {order.items.map((item) => (
                          <div
                            key={item.productId._id}
                            className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                          >
                            <div className="flex-shrink-0">
                              <img
                                src={item.productId.imageUrl}
                                alt={item.productId.product_name}
                                className="w-20 h-20 rounded-xl object-contain shadow-md"
                              />
                            </div>
                            <div className="flex-1">
                              <h5 className="font-semibold text-gray-900 mb-1">
                                {item.productId.product_name}
                              </h5>
                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                <span className="bg-white px-3 py-1 rounded-full border">
                                  Qty: {item.quantity}
                                </span>
                                <span className="font-semibold text-[#2a9d8f]">
                                  {formatPrice(item.productId.price)} each
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-lg text-gray-900">
                                {formatPrice(
                                  item.productId.price * item.quantity
                                )}
                              </div>
                              <div className="text-sm text-gray-500">
                                Subtotal
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Order Summary & Actions */}
                    <div className="space-y-4">
                      <div className="bg-gradient-to-br from-[#2a9d8f]/5 to-[#264653]/5 p-6 rounded-xl border border-[#2a9d8f]/10">
                        <h5 className="font-semibold text-gray-900 mb-4">
                          Order Summary
                        </h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between text-gray-600">
                            <span>Subtotal</span>
                            <span>{formatPrice(order.amount - 40)}</span>
                          </div>
                          <div className="flex justify-between text-gray-600">
                            <span>Shipping</span>
                            <span>₹40.00</span>
                          </div>
                          <div className="border-t border-gray-200 pt-2 mt-2">
                            <div className="flex justify-between font-bold text-lg">
                              <span>Total</span>
                              <span className="text-[#2a9d8f]">
                                {formatPrice(order.amount)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <button className="w-full bg-gradient-to-r from-[#2a9d8f] to-[#264653] hover:from-[#264653] hover:to-[#2a9d8f] text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
                          <Eye className="w-4 h-4" />
                          View Details
                        </button>
                        <button className="w-full bg-white border-2 border-gray-200 hover:border-[#2a9d8f] text-gray-700 hover:text-[#2a9d8f] font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2">
                          <Truck className="w-4 h-4" />
                          Track Order
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default Orders;
