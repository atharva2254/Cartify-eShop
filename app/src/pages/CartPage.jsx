import { Link } from "react-router-dom";
import { ShoppingCart, User, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { formatPrice } from "../utils/priceformat";
import { toast } from "react-toastify";
import api from "../api";

const CartPage = () => {
  const { loading, cartItems, fetchCart } = useAuth();

  // const updateQuantity = (id, newQuantity) => {
  //   if (newQuantity < 1) return;
  //   setCartItems(
  //     cartItems.map((item) => {
  //       item.productId._id === id ? { ...item, quantity: newQuantity } : item;
  //     })
  //   );
  // };

  const removeFromCart = async (product_id) => {
    try {
      const res = await api.delete(`/user/cart/${product_id}`);
      toast.success(res.data.message);
      console.log(product_id);
      fetchCart();
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Server Error");
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  );
  const shipping = 9.99;
  const total = subtotal + shipping;

  if (loading) return <div>Loading...</div>;
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Your Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Your cart is empty
            </h3>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link
              to="/dashboard"
              className="inline-block bg-[#2a9d8f] hover:bg-[#264653] text-white font-medium py-2 px-6 rounded-md transition-colors duration-200"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <div key={item.productId._id} className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row">
                        <div className="flex-shrink-0 mb-4 sm:mb-0">
                          <img
                            src={item.productId.imageUrl}
                            alt={item.productId.product_name}
                            className="w-24 h-24 rounded-md object-contain"
                          />
                        </div>
                        <div className="ml-0 sm:ml-6 flex-grow">
                          <div className="flex justify-between">
                            <h3 className="text-lg font-medium text-gray-900">
                              {item.productId.product_name}
                            </h3>
                            <button
                              onClick={() => {
                                removeFromCart(item.productId._id);
                              }}
                              className="text-gray-400 hover:text-[#e76f51]"
                            >
                              <X className="h-5 w-5" />
                            </button>
                          </div>
                          <p className="mt-1 text-gray-600">
                            {formatPrice(item.productId.price)}
                          </p>
                          <div className="mt-4 flex items-center">
                            <button
                              // onClick={() =>
                              //   updateQuantity(
                              //     item.productId._id,
                              //     item.quantity - 1
                              //   )
                              // }
                              className="text-gray-500 hover:text-[#2a9d8f] p-1"
                            >
                              -
                            </button>
                            <span className="mx-2 text-gray-700">
                              {item.quantity}
                            </span>
                            <button
                              // onClick={() =>
                              //   updateQuantity(
                              //     item.productId._id,
                              //     item.quantity + 1
                              //   )
                              // }
                              className="text-gray-500 hover:text-[#2a9d8f] p-1"
                            >
                              +
                            </button>
                            <div className="ml-auto font-medium text-gray-900">
                              {formatPrice(
                                item.productId.price * item.quantity
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col justify-between">
                <h2 className="text-lg font-medium text-gray-900">
                  Order Summary
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-gray-900">
                      {formatPrice(shipping)}
                    </span>
                  </div>
                  <div className="border-t border-gray-200 pt-4 flex justify-between">
                    <span className="font-medium text-gray-900">Total</span>
                    <span className="font-bold text-gray-900">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>
                <Link
                  to="/checkout"
                  className="mt-10 w-full bg-[#2a9d8f] hover:bg-[#264653] text-center text-white py-3 px-4 rounded-md font-medium transition-colors duration-200"
                >
                  Checkout
                </Link>
                <div className="mt-6 text-center text-sm text-gray-500">
                  or{" "}
                  <Link
                    to="/dashboard"
                    className="text-[#2a9d8f] hover:text-[#264653] font-medium"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
