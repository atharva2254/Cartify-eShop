import { useAuth } from "../context/AuthContext";
import { CreditCard, Truck } from "lucide-react";
import { toast } from "react-toastify";
import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export const Payment = () => {
  const navigate = useNavigate();
  const { setStep, cartItems, user, fetchCart } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState("razorpay");

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  );

  const items = cartItems.map((cartItem) => ({
    productId: cartItem.productId,
    quantity: cartItem.quantity,
  }));

  const shipping = 40;
  const total = subtotal + shipping;

  const handleCod = async () => {
    try {
      const amount = total;
      const res = await api.post("/user/orders/cod", {
        amount,
        items: items,
      });
      toast.success(res.data.message);
      navigate("/order-successful", { replace: true });
      fetchCart();
    } catch (error) {
      toast.error("Something went wrong");
      console.log("Error in cod: ", error);
    }
  };

  const handlePayment = async () => {
    const amount = total; // e.g. ₹500
    const res = await api.post("/user/orders", {
      amount,
      items: items,
    });

    const { orderId } = res.data;

    const options = {
      key: import.meta.env.RAZORPAY_KEY_ID,
      amount: amount,
      currency: "INR",
      name: "Cartify",
      description: "Order Payment",
      order_id: orderId,
      modal: {
        ondismiss: async function () {
          // User closed without paying -> delete order from backend
          try {
            await api.delete(`/user/orders/${orderId}`);
            console.log("Order deleted on dismiss");
            toast.error("Payment cancelled.");
          } catch (err) {
            console.error("Error deleting order on dismiss", err);
          }
        },
      },
      handler: async function (response) {
        const verfiyRes = await api.post("/user/orders/verifyPayment", {
          order_id: orderId,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        });
        console.log(verfiyRes.data.success);
        if (verfiyRes.data.success) {
          toast.success("Payment successful");
          fetchCart();
          navigate("/order-successful", { replace: true });
          // Add order to database or further actions
        } else {
          toast.error("Payment verification failed!");
          navigate("/order-failed", { replace: true });
        }
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: user.phone,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);

    rzp.open();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Method</h2>

      <div className="space-y-4 mb-6">
        <div
          className={`border rounded-lg p-4 cursor-pointer transition-colors ${
            paymentMethod === "razorpay"
              ? "border-[#2a9d8f] bg-[#2a9d8f]/10"
              : "border-gray-200 hover:border-gray-300"
          }`}
          onClick={() => setPaymentMethod("razorpay")}
        >
          <div className="flex items-center">
            <CreditCard className="w-5 h-5 text-[#2a9d8f] mr-3" />
            <span className="font-medium text-gray-900">Pay Now</span>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Pay securely with your credit/debit card or upi through Razorpay
          </p>
        </div>

        <div
          className={`border rounded-lg p-4 cursor-pointer transition-colors ${
            paymentMethod === "cod"
              ? "border-[#2a9d8f] bg-[#2a9d8f]/10"
              : "border-gray-200 hover:border-gray-300"
          }`}
          onClick={() => setPaymentMethod("cod")}
        >
          <div className="flex items-center">
            <Truck className="w-5 h-5 text-[#2a9d8f] mr-3" />
            <span className="font-medium text-gray-900">Cash on Delivery</span>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Pay in cash when your order is delivered
          </p>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between">
        <button
          onClick={() => setStep("address")}
          className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50"
        >
          Back to Address
        </button>
        <button
          onClick={paymentMethod == "razorpay" ? handlePayment : handleCod}
          className="px-6 py-3 rounded-md text-white font-medium bg-[#2a9d8f] hover:bg-[#264653]"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Payment;
