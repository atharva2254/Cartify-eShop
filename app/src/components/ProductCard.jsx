import { formatPrice } from "../utils/priceformat";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
  const { addToCart, fetchCart } = useAuth();

  const handleCart = async (product_id) => {
    try {
      await addToCart(product_id);
      fetchCart();
      toast.success("Added to Cart");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      console.log(error);
    }
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden p-2 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
      <div className="relative pb-[80%] overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.product_name}
          className="absolute h-full w-full object-contain inset-0 hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-[#e76f51] text-white text-xs font-bold px-2 py-1 rounded-full">
          {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-gray-900 line-clamp-1">
            {product.product_name}
          </h3>
        </div>
        <p className="text-gray-600 text-sm mb-3 h-10 line-clamp-2">
          {product.description}
        </p>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-lg font-bold line-clamp-3 text-[#2a9d8f]">
              {formatPrice(product.price)}
            </span>
            {product.mrp && (
              <span className="text-xs text-gray-500  line-through ml-1">
                {formatPrice(product.mrp)}
              </span>
            )}
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleCart(product._id);
          }}
          className="bg-[#f4a261] hover:bg-[#e76f51] text-white px-3 w-full mt-2 py-1 rounded-md text-sm transition-colors duration-200"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
