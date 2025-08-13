import { useForm } from "react-hook-form";
import { Upload, X } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import api from "../api";
import { useAuth } from "../context/AuthContext";

const AddProduct = () => {
  const { fetchProducts } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      product_name: "",
      description: "",
      category: "",
      price: "",
      mrp: "",
      stock: "",
      image: null,
    },
  });

  const [imagePreview, setImagePreview] = useState(null);
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Clear previous image if exists
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setValue("image", file);
    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setValue("image", null);
    setImagePreview(null);
  };

  const onSubmit = (data) => {
    const formData = new FormData();

    // Append all form data
    formData.append("product_name", data.product_name);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("price", data.price);
    formData.append("mrp", data.mrp);
    formData.append("stock", data.stock);

    // Append the image file if exists
    if (data.image) {
      formData.append("image", data.image);
    }

    api
      .post("/products/submit", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        toast.success(res.data.message);
        reset();
        fetchProducts();
        setImagePreview(null);
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error(error?.response?.data?.message || "Something went wrong");
      });
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-[calc(100vh-64px)]">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Header */}
          <div className="bg-[#264653] px-6 py-4">
            <h2 className="text-xl font-bold text-white">Add New Product</h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-6">
            {/* Basic Information */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                Basic Information
              </h3>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label
                    htmlFor="product_name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Product Name *
                  </label>
                  <input
                    id="product_name"
                    {...register("product_name", {
                      required: "Product name is required",
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a9d8f] focus:border-[#2a9d8f]"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-[#e76f51]">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Description *
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    {...register("description", {
                      required: "Description is required",
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a9d8f] focus:border-[#2a9d8f]"
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-[#e76f51]">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Category *
                  </label>
                  <select
                    id="category"
                    {...register("category", {
                      required: "Category is required",
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a9d8f] focus:border-[#2a9d8f]"
                  >
                    <option value="">Select a category</option>
                    <option value="electronics">Electronics</option>
                    <option value="clothing">Clothing</option>
                    <option value="home">Home & Kitchen</option>
                    <option value="beauty">Beauty</option>
                    <option value="sports">Sports</option>
                    <option value="furniture">Home & Furniture</option>
                    <option value="toys">Toys</option>
                    <option value="books">Books</option>
                    <option value="others">Others</option>
                  </select>
                  {errors.category && (
                    <p className="mt-1 text-sm text-[#e76f51]">
                      {errors.category.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                Pricing Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label
                    htmlFor="mrp"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    MRP (Maximum Retail Price) *
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">₹</span>
                    </div>
                    <input
                      type="number"
                      id="mrp"
                      min="0"
                      step="0.01"
                      {...register("mrp", {
                        required: "MRP is required",
                        min: { value: 0, message: "MRP must be positive" },
                      })}
                      className="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a9d8f] focus:border-[#2a9d8f]"
                      placeholder="0.00"
                    />
                  </div>
                  {errors.mrp && (
                    <p className="mt-1 text-sm text-[#e76f51]">
                      {errors.mrp.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Selling Price *
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">₹</span>
                    </div>
                    <input
                      type="number"
                      id="price"
                      min="0"
                      step="0.01"
                      {...register("price", {
                        required: "Price is required",
                        min: { value: 0, message: "Price must be positive" },
                        // validate: (value) =>
                        //   parseFloat(value) <= parseFloat("mrp") ||
                        //   "Selling price must be less than or equal to MRP",
                      })}
                      className="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a9d8f] focus:border-[#2a9d8f]"
                      placeholder="0.00"
                    />
                  </div>
                  {errors.price && (
                    <p className="mt-1 text-sm text-[#e76f51]">
                      {errors.price.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="stock"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Stock Quantity *
                  </label>
                  <input
                    type="number"
                    id="stock"
                    min="0"
                    {...register("stock", {
                      required: "Stock quantity is required",
                      min: { value: 0, message: "Stock must be positive" },
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a9d8f] focus:border-[#2a9d8f]"
                  />
                  {errors.stock && (
                    <p className="mt-1 text-sm text-[#e76f51]">
                      {errors.stock.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                Product Image
              </h3>
              <div className="space-y-4">
                {imagePreview ? (
                  <div className="relative group w-48">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-48 object-contain inset-0 rounded-md border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute -top-2 -right-2 bg-[#e76f51] text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="w-48 h-48 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-[#2a9d8f] transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <div className="text-center">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <span className="text-sm text-gray-500">
                        Upload Image
                      </span>
                    </div>
                  </label>
                )}
                <p className="text-sm text-gray-500">
                  Upload a single image for the product (JPEG, PNG, etc.)
                </p>
                {errors.image && (
                  <p className="mt-1 text-sm text-[#e76f51]">
                    {errors.image.message}
                  </p>
                )}
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => {
                  reset();
                  removeImage();
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2a9d8f]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2a9d8f] hover:bg-[#264653] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2a9d8f]"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
