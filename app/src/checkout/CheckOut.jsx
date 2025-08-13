import { CheckCircle } from "lucide-react";
import Address from "./Address";
import Payment from "./Payment";
import { useAuth } from "../context/AuthContext";
import { formatPrice } from "../utils/priceformat";

const CheckoutPage = () => {
  const { step, cartItems } = useAuth(); // 'address', 'payment', 'complete'

  // Calculate order summary
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  );
  const shipping = 40;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Progress Steps */}
        <div className="flex justify-between mb-12 relative">
          <div className="flex-1 flex flex-col items-center relative">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                step === "address"
                  ? "bg-[#2a9d8f] text-white"
                  : step === "payment" || step === "complete"
                  ? "bg-green-200 text-green-800"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {step === "complete" ? (
                <CheckCircle className="w-6 h-6" />
              ) : (
                <span>1</span>
              )}
            </div>
            <span
              className={`text-sm font-medium ${
                step === "address"
                  ? "text-[#2a9d8f]"
                  : step === "payment" || step === "complete"
                  ? "text-green-600"
                  : "text-gray-600"
              }`}
            >
              Address
            </span>
            <div
              className={`absolute top-6 left-1/2 h-1 w-full ${
                step === "payment" || step === "complete"
                  ? "bg-green-200"
                  : "bg-gray-200"
              }`}
            ></div>
          </div>

          <div className="flex-1 flex flex-col items-center relative">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                step === "payment"
                  ? "bg-[#2a9d8f] text-white"
                  : step === "complete"
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {step === "complete" ? (
                <CheckCircle className="w-6 h-6" />
              ) : (
                <span>2</span>
              )}
            </div>
            <span
              className={`text-sm font-medium ${
                step === "payment"
                  ? "text-[#2a9d8f]"
                  : step === "complete"
                  ? "text-green-600"
                  : "text-gray-600"
              }`}
            >
              Payment
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Checkout Steps */}
          <div className="lg:col-span-2">
            {step === "address" && <Address />}

            {step === "payment" && <Payment />}

            {/* {step === "complete" && <CompleteOrder />} */}
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div
                    key={item.productId._id}
                    className="flex justify-between items-start"
                  >
                    <div className="flex">
                      <img
                        src={item.productId.imageUrl}
                        alt={item.productId.product_name}
                        className="w-16 h-16 rounded-md object-contain mr-3"
                      />
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">
                          {item.productId.product_name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {formatPrice(item.productId.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Subtotal</span>
                  <span className="text-sm text-gray-900">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Shipping</span>
                  <span className="text-sm text-gray-900">
                    {formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between font-medium text-gray-900 border-t border-gray-200 pt-3">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              {/* {step === "address" && selectedAddress && (
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">
                    Shipping Address
                  </h3>
                  {(() => {
                    const address = savedAddresses.find(
                      (a) => a.id === selectedAddress
                    );
                    return (
                      <div className="text-sm text-gray-600">
                        <p>{address.street}</p>
                        <p>
                          {address.city}, {address.state} {address.zip}
                        </p>
                        <p>{address.country}</p>
                        <p className="mt-2">{address.phone}</p>
                      </div>
                    );
                  })()}
                </div>
              )} */}

              {/* {step === "payment" && (
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">
                    Payment Method
                  </h3>
                  <div className="text-sm text-gray-600 flex items-center">
                    {paymentMethod === "razorpay" ? (
                      <>
                        <CreditCard className="w-4 h-4 mr-2" />
                        Credit/Debit Card (Razorpay)
                      </>
                    ) : (
                      <>
                        <Truck className="w-4 h-4 mr-2" />
                        Cash on Delivery
                      </>
                    )} 
                  </div>
                </div>
              )}*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
