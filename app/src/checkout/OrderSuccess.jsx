import { CheckCircle, ShoppingBag, Home, Truck } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const OrderSuccess = ({ orderId = "#ORD-12345" }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-lg max-w-md w-full p-8 text-center"
      >
        {/* Animated Checkmark */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.2,
          }}
          className="mx-auto mb-6"
        >
          <div className="relative">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto" />
            <motion.div
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.5,
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <svg viewBox="0 0 24 24" className="w-20 h-20 text-green-500">
                <motion.path
                  d="M5 13l4 4L19 7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={3}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </div>
        </motion.div>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Order Confirmed!
        </h1>
        <p className="text-gray-600 mb-6">Thank you for your purchase</p>

        {/* Order Details */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-[#264653]/5 rounded-lg p-4 mb-6"
        >
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Order Number</span>
            <span className="font-medium text-[#264653]">{orderId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Expected Delivery</span>
            <span className="font-medium text-[#264653]">5-6 days</span>
          </div>
        </motion.div>

        {/* Delivery Animation */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex items-center justify-center mb-8"
        >
          <div className="relative w-64 h-16">
            <motion.div
              animate={{
                x: [0, 180, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: "linear",
              }}
              className="absolute top-0 left-0"
            >
              <Truck className="w-8 h-8 text-[#2a9d8f]" />
            </motion.div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                animate={{
                  width: ["0%", "100%", "0%"],
                  left: ["0%", "0%", "100%"],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: "linear",
                }}
                className="absolute top-0 left-0 h-full bg-[#2a9d8f]"
              />
            </div>
          </div>
        </motion.div>

        <p className="text-gray-600 mb-6">
          We've sent a confirmation email with your order details. Your items
          will be shipped soon.
        </p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <Link
            to="/orders"
            className="flex-1 flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2a9d8f] hover:bg-[#264653]"
          >
            <ShoppingBag className="w-5 h-5 mr-2" />
            View Orders
          </Link>
          <Link
            to="/dashboard"
            className="flex-1 flex items-center justify-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Home className="w-5 h-5 mr-2" />
            Back Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default OrderSuccess;
