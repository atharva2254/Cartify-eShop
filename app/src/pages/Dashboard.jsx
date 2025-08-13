import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Search, TrendingUp } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { motion } from "framer-motion";

const categories = [
  { name: "all", label: "All Products" },
  { name: "electronics", label: "Electronics" },
  { name: "furniture", label: "Home & Furniture" },
  { name: "home", label: "Home & Kitchen" },
  { name: "beauty", label: "Beauty & Products" },
  { name: "clothing", label: "Clothing" },
  { name: "sports", label: "Sports" },
  { name: "toys", label: "Toys" },
  { name: "books", label: "Books" },
  { name: "others", label: "Others" },
];

const Dashboard = () => {
  const { loading, products } = useAuth();
  const [category, setCategory] = useState("all");
  // const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((product) => {
    const matchesCategory = category === "all" || product.category === category;
    return matchesCategory;
  });

  if (loading) return <div>Loading...</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }} // Start state
      animate={{ opacity: 1 }} // Animate to
      exit={{ opacity: 0 }} // Exit state
      transition={{ duration: 1 }} // Smoothness
    >
      <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
        {/* Main Content */}
        <main className="flex-grow">
          <div className="mt-4 md:mt-0 hidden md:block">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setCategory(cat.name)}
                  className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    category === cat.name
                      ? "bg-[#e76f51] text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
          {/* Hero Banner */}
          <div className="max-h-500 ">
            <div className="max-w-full max-h-500 text-center">
              <img
                src="/promotion.webp"
                alt="Promotion"
                className="object-contain"
              />
              {/* <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl mb-4">
                Discover Quality Products
              </h1>
              <p className="text-lg text-white/90 max-w-2xl mx-auto">
                Explore our curated collection of premium items at unbeatable
                prices.
              </p> */}
            </div>
          </div>

          {/* Products Section */}
          <section className="py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex md:flex-row md:items-center md:justify-between mb-8">
                <div>
                  <h2 className="flex items-center gap-3  text-2xl font-bold text-gray-900">
                    Featured Products
                    <TrendingUp />
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Handpicked selection of our best items
                  </p>
                </div>

                {/* Category Filter */}
              </div>

              {/* Products Grid */}
              {filteredProducts.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                  <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No products found
                  </h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    Try adjusting your search or filter to find what you're
                    looking for.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </motion.div>
  );
};

export default Dashboard;
