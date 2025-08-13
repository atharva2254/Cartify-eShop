import { XCircle, RefreshCw, CreditCard, Home } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const OrderFailed = ({
  orderId = "#ORD-12345",
  errorMessage = "Payment was declined by your bank",
}) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-lg max-w-md w-full p-8 text-center"
      >
        {/* Animated X Icon */}
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
            <XCircle className="w-20 h-20 text-[#e76f51] mx-auto" />
            <motion.div
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.5,
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <svg viewBox="0 0 24 24" className="w-20 h-20 text-[#e76f51]">
                <motion.path
                  d="M18 6L6 18M6 6l12 12"
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
          Payment Failed
        </h1>
        <p className="text-gray-600 mb-6">{errorMessage}</p>

        {/* Order Details */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-[#264653]/5 rounded-lg p-4 mb-6"
        >
          <div className="flex justify-between">
            <span className="text-gray-600">Order Number</span>
            <span className="font-medium text-[#264653]">{orderId}</span>
          </div>
        </motion.div>

        {/* Pulsing Warning Animation */}
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut",
          }}
          className="text-sm text-[#e76f51] bg-[#e76f51]/10 p-3 rounded-lg mb-6 flex items-center justify-center"
        >
          <XCircle className="w-5 h-5 mr-2" />
          Your order is pending until payment is completed
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <button
            onClick={() => window.location.reload()}
            className="flex-1 flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#e76f51] hover:bg-[#f4a261]"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Try Again
          </button>
          <Link
            to="/checkout"
            className="flex-1 flex items-center justify-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <CreditCard className="w-5 h-5 mr-2" />
            Change Payment
          </Link>
          <Link
            to="/"
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

export default OrderFailed;
