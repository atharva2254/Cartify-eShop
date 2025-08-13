import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user } = useAuth();
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#2a9d8f] to-[#264653] py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl mb-6">
            Welcome to Cartify
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Discover amazing products at unbeatable prices. Your one-stop
            destination for quality, style, and value.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/dashboard"
              className="bg-[#e9c46a] hover:bg-[#f4a261] text-[#264653] font-bold py-3 px-8 rounded-full transition-colors duration-200"
            >
              Shop Now
            </Link>
            {user ? (
              <> </>
            ) : (
              <Link
                to="/register"
                className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-8 rounded-full transition-colors duration-200"
              >
                Create Account
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Cartify?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide the best shopping experience with these amazing
              features
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Fast Delivery",
                description:
                  "Get your products delivered in just 2-3 business days",
                icon: "🚚",
                color: "bg-[#2a9d8f]",
              },
              {
                title: "Secure Payments",
                description: "100% secure payment methods with SSL encryption",
                icon: "🔒",
                color: "bg-[#e9c46a]",
              },
              {
                title: "24/7 Support",
                description:
                  "Our customer support team is always ready to help",
                icon: "💬",
                color: "bg-[#e76f51]",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-6 text-center"
              >
                <div
                  className={`${feature.color} w-16 h-16 rounded-full flex items-center justify-center text-2xl mx-auto mb-4`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Categories Preview */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our wide range of product categories
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                name: "Electronics",
                image: "/photo-1556740738-b6a63e27c4df.jpg",
              },
              {
                name: "Fashion",
                image: "/photo-clothing.jpg",
              },
              {
                name: "Home & Garden",
                image: "/home&garden.png",
              },
              {
                name: "Beauty",
                image: "/photo-beauty.jpg",
              },
            ].map((category, index) => (
              <Link
                key={index}
                to="/dashboard"
                className="group relative overflow-hidden rounded-xl h-48"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                  <h3 className="text-white text-xl font-bold">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      {/* <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it - hear from our happy customers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Frequent Shopper",
                comment:
                  "Cartify has the best prices and fastest delivery I've ever experienced!",
                rating: 5,
              },
              {
                name: "Michael Chen",
                role: "Tech Enthusiast",
                comment:
                  "Great selection of electronics and excellent customer service.",
                rating: 4,
              },
              {
                name: "Emma Williams",
                role: "Fashion Blogger",
                comment:
                  "I always find unique fashion pieces here that no one else has.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonial.rating
                          ? "text-[#e9c46a] fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">
                  "{testimonial.comment}"
                </p>
                <div className="flex items-center">
                  <div className="bg-[#2a9d8f] text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <h4 className="font-bold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Home;
