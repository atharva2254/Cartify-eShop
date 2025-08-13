import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { MapPin } from "lucide-react";
import api from "../api";
import { useAuth } from "../context/AuthContext";

const Address = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { user, setStep } = useAuth();
  const [userAddress, setUserAddress] = useState({});

  useEffect(() => {
    if (user?.address) {
      setUserAddress(user.address);
    }
  }, [user]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Handle address update
  const onSubmit = async (data) => {
    try {
      const response = await api.patch("/user/update/address", {
        address: {
          lane: data.lane,
          town: data.town,
          city: data.city,
          state: data.state,
          pincode: data.pincode,
        },
      });

      setUserAddress(response.data.address);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating address:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Shipping Address</h2>

      {!isEditing ? (
        <>
          {userAddress ? (
            <div className="mb-6 p-4 border border-gray-200 rounded-lg">
              <p className="font-medium text-gray-900">{userAddress.lane}</p>
              {userAddress.town && (
                <p className="text-gray-600">{userAddress.town}</p>
              )}
              <p className="text-gray-600">
                {userAddress.city}, {userAddress.state} - {userAddress.pincode}
              </p>
            </div>
          ) : (
            <div className="mb-6 p-4 border border-gray-200 rounded-lg text-gray-600">
              No address added yet
            </div>
          )}

          <div className="flex space-x-3">
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-[#2a9d8f] text-white rounded-md hover:bg-[#264653]"
            >
              {userAddress ? "Update Address" : "Add Address"}
            </button>

            {userAddress && (
              <button
                onClick={() => setStep("payment")}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              >
                Continue to Payment
              </button>
            )}
          </div>
        </>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Street Address *
            </label>
            <input
              type="text"
              defaultValue={userAddress?.lane || ""}
              {...register("lane", { required: "Street address is required" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors.lane && (
              <p className="text-sm text-red-500 mt-1">{errors.lane.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Locality/Town
            </label>
            <input
              type="text"
              defaultValue={userAddress?.town || ""}
              {...register("town")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City *
              </label>
              <input
                type="text"
                defaultValue={userAddress?.city || ""}
                {...register("city", { required: "City is required" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              {errors.city && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.city.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State *
              </label>
              <input
                type="text"
                defaultValue={userAddress?.state || ""}
                {...register("state", { required: "State is required" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              {errors.state && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.state.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pincode *
            </label>
            <input
              type="number"
              defaultValue={userAddress?.pincode || ""}
              {...register("pincode", {
                required: "Pincode is required",
                min: { value: 100000, message: "Must be a 6-digit pincode" },
                max: { value: 999999, message: "Must be a 6-digit pincode" },
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors.pincode && (
              <p className="text-sm text-red-500 mt-1">
                {errors.pincode.message}
              </p>
            )}
          </div>

          <div className="flex space-x-3 pt-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 border border-gray-300 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              // disabled={isLoading}
              className="px-4 py-2 bg-[#2a9d8f] text-white rounded-md hover:bg-[#264653] disabled:bg-gray-400"
            >
              Save Address
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Address;
