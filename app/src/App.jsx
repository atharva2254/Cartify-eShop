import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Dashboard from "./pages/Dashboard";
import CartPage from "./pages/CartPage";
import Navbar from "./components/Navbar";
import ProfilePage from "./pages/ProfilePage";
import { ToastContainer } from "react-toastify";
import { useAuth } from "./context/AuthContext";
import Footer from "./components/Footer";
import AddProduct from "./components/AddProducts";
import CheckOut from "./checkout/CheckOut";
import OrderSuccess from "./checkout/OrderSuccess";
import OrderFailed from "./checkout/OrderFailure";
import LoadingSpinner from "./components/LoadingSpinner";
import Orders from "./pages/Orders";

const App = () => {
  const { user, loading } = useAuth();
  if (loading) return <LoadingSpinner />;
  return (
    <Router>
      <ToastContainer />
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={user ? <Dashboard /> : <Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/addProduct" element={<AddProduct />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/order-successful" element={<OrderSuccess />} />
          <Route path="/order-failed" element={<OrderFailed />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </Router>
  );
};

export default App;
