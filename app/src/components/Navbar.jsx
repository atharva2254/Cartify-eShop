import { Link } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  CircleUserRound,
  LogIn,
  Menu,
  LogOut,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, admin, logout, cartItems } = useAuth();

  const firstName = user?.name?.split(" ")[0];

  //console.log(firstName);
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  return (
    <nav className="bg-[#264653] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="text-xl font-bold">
                Cartify
              </Link>
            </div>
            {/* Desktop Navigation */}
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              <Link
                to="/"
                className="text-white focus:border-b-2 focus:border-[#e9c46a] px-1 pt-1 pb-2 text-sm font-medium"
              >
                Home
              </Link>
              <Link
                to="/dashboard"
                className="text-white focus:border-[#e9c46a] focus:border-b-2 px-1 pt-1 pb-2 text-sm font-medium"
              >
                Shop
              </Link>
              {admin ? (
                <Link
                  to="/admin/dashboard"
                  className="text-white focus:border-[#e9c46a] focus:border-b-2 px-1 pt-1 pb-2 text-sm font-medium"
                >
                  Admin Dashboard
                </Link>
              ) : (
                <Link
                  to={"/addProduct"}
                  className="text-white focus:border-[#e9c46a] focus:border-b-2 px-1 pt-1 pb-2 text-sm font-medium"
                >
                  Add Product
                </Link>
              )}
            </div>
          </div>

          {/* Search and Icons */}
          <div className="flex items-center">
            <div className="hidden md:block relative mx-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#e9c46a] focus:border-[#e9c46a] sm:text-sm"
              />
            </div>
          </div>
          <div className="flex items-center">
            <div className="hidden md:ml-4 md:flex md:items-center md:space-x-6">
              {user ? (
                <>
                  <Link
                    to="/profile"
                    className="text-white hover:text-[#e9c46a] focus:outline-none flex gap-1.5 items-center justify-center bg-[#1d2d34] px-2.5 py-1.5 rounded-2xl"
                  >
                    <CircleUserRound className="h-6 w-6" />
                    <span className="font-bold">{firstName}</span>
                  </Link>

                  <Link
                    to="/cart"
                    className="text-white hover:text-[#e9c46a] focus:outline-none relative"
                  >
                    <ShoppingCart className="h-6 w-6" />
                    <span className="absolute -top-2 -right-2 bg-[#e76f51] text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItems.length}
                    </span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-white hover:text-[#e9c46a] focus:outline-none flex gap-1.5 items-center "
                  >
                    <span className="text-sm">Sign Out</span>
                    <LogOut className="h-6 w-6" />
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="text-white hover:text-[#e9c46a] focus:outline-none flex gap-1"
                >
                  <LogIn className="h-6 w-6" />
                  Login
                </Link>
              )}
            </div>
            {/* Mobile menu button */}

            <div className="mr-2 flex items-center gap-3 md:hidden">
              {user && (
                <Link
                  to="/cart"
                  className="text-white relative md:hidden"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <ShoppingCart className="h-6 w-6" />
                  <span className="absolute -top-2 -right-2 bg-[#e76f51] text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                </Link>
              )}

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-[#e9c46a] focus:outline-none"
              >
                {mobileMenuOpen ? (
                  <X className="block h-6 w-6" />
                ) : (
                  <Menu className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`bg-[#264653] transition-all duration-300 ease-in transform overflow-hidden ${
          mobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="pt-2 pb-3 px-4 space-y-1">
          <div className="relative mt-2 mb-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#e9c46a] focus:border-[#e9c46a] sm:text-sm"
            />
          </div>
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-white bg-[#264653]"
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-[#264653]"
          >
            Shop
          </Link>
          <Link
            to="/addProduct"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-[#264653]"
          >
            Add Product
          </Link>
          <div className="pt-4 border-t text-center border-white">
            {user ? (
              <div className="flex items-center justify-between px-3 py-2">
                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white hover:text-[#e9c46a] focus:outline-none flex gap-1.5 items-center justify-center bg-[#1d2d34] px-2.5 py-2 rounded-2xl"
                >
                  <CircleUserRound className="h-6 w-6" />
                  <span className="font-bold">{firstName}</span>
                </Link>
                <button
                  className="text-white hover:text-[#e9c46a] focus:outline-none flex gap-1.5 items-center "
                  onClick={async () => {
                    await handleLogout();
                    setMobileMenuOpen(false);
                  }}
                >
                  <LogOut className="h-6 w-6" />
                  <span className="text-sm">Sign Out</span>
                </button>
              </div>
            ) : (
              <Link
                to={"/login"}
                className="text-md font-medium text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login / Register
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
