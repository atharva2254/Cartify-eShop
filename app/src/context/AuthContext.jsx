import { toast } from "react-toastify";
import api from "../api";
import { useContext, createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [step, setStep] = useState("address");

  const fetchUser = async () => {
    try {
      const res = await api.get("/user/me");
      setUser(res.data);
    } catch (error) {
      console.log("User not logged in");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.log("Error while fetching products: ", error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    if (window.confirm("Are you sure you want to logout?")) {
      try {
        const res = await api.post("/user/logout");
        setUser(null);
        toast.success(res.data.message);
      } catch (error) {
        console.log("Failed to logout: ", error);
        toast.error(error.response?.data?.message || "Failed to logout!");
      }
    }
  };

  const fetchCart = async () => {
    try {
      const res = await api.get("/user/cart");
      setCartItems(res.data);
    } catch (error) {
      console.log("Error while fetching cart! ", error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId) => {
    try {
      await api.put("/user/cart", { product_id: productId });
      fetchCart();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCart();
      fetchProducts();
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        step,
        setStep,
        admin,
        loading,
        setUser,
        fetchUser,
        products,
        fetchProducts,
        cartItems,
        fetchCart,
        addToCart,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
