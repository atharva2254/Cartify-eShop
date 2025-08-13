import { useState } from "react";
import { User } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Orders from "./Orders";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const { user, logout } = useAuth();
  const dateString = user?.joined; // e.g. "2025-08-11T14:23:05.000Z"
  const dateObj = new Date(dateString);
  const navigate = useNavigate();

  const formattedDate = dateObj.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleLogout = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  if (!user) return <div>Loading...</div>;
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex items-center mb-4">
                <div className="bg-[#2a9d8f] text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl">
                  <User />
                </div>
                <div className="ml-3">
                  <h3 className="font-bold text-gray-900">{user.name}</h3>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
              </div>
              <div className="text-sm text-gray-600 mb-1">{formattedDate}</div>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <button
                onClick={() => setActiveTab("profile")}
                className={`w-full text-left px-6 py-3 font-medium ${
                  activeTab === "profile"
                    ? "bg-[#f4a261] text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Profile Information
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className={`w-full text-left px-6 py-3 font-medium ${
                  activeTab === "orders"
                    ? "bg-[#f4a261] text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                My Orders
              </button>
              <button
                onClick={() => setActiveTab("addresses")}
                className={`w-full text-left px-6 py-3 font-medium ${
                  activeTab === "addresses"
                    ? "bg-[#f4a261] text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Saved Addresses
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className={`w-full text-left px-6 py-3 font-medium ${
                  activeTab === "settings"
                    ? "bg-[#f4a261] text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Account Settings
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left px-6 py-3 font-medium text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-grow">
            {activeTab === "profile" && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Profile Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <div className="bg-gray-50 p-3 rounded-md">{user.name}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <div className="bg-gray-50 p-3 rounded-md">
                      {user.email}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <div className="bg-gray-50 p-3 rounded-md">
                      {user.phone}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <div className="bg-gray-50 p-3 rounded-md">
                      {user?.address ? (
                        <div className=" rounded-lg">
                          <p className="font-medium text-gray-900">
                            {user.address.lane}
                          </p>
                          {user.address.town && (
                            <p className="text-gray-600">{user.address.town}</p>
                          )}
                          <p className="text-gray-600">
                            {user.address.city}, {user.address.state} -{" "}
                            {user.address.pincode}
                          </p>
                        </div>
                      ) : (
                        <span className="text-red-400 text-sm">
                          Address not Added
                        </span>
                      )}
                    </div>
                  </div>
                  <button className="mt-6 bg-[#2a9d8f] hover:bg-[#264653] text-white py-2 px-4 rounded-md font-medium transition-colors duration-200">
                    Edit Profile
                  </button>
                </div>
              </div>
            )}

            {activeTab === "orders" && <Orders />}

            {activeTab === "addresses" && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    Saved Addresses
                  </h2>
                </div>
                {user?.address ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between">
                        <h3 className="font-medium text-gray-900">
                          Home Address
                        </h3>
                      </div>
                      <p className="mt-2 text-gray-600">{user.address.lane}</p>
                      <p className="text-gray-600">
                        {user.address.town}, {user.address.city}
                      </p>
                      <p className="mt-2 text-gray-600">{user.address.state}</p>
                      <p className="mt-2 text-gray-600">
                        {user.address.pincode}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <span className="text-red-400 text-sm">
                      Address not Added
                    </span>
                  </div>
                )}
              </div>
            )}

            {activeTab === "settings" && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Account Settings
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Change Password
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Current Password
                        </label>
                        <input
                          type="password"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2a9d8f] focus:ring-[#2a9d8f] sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          New Password
                        </label>
                        <input
                          type="password"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2a9d8f] focus:ring-[#2a9d8f] sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2a9d8f] focus:ring-[#2a9d8f] sm:text-sm"
                        />
                      </div>
                      <button className="bg-[#2a9d8f] hover:bg-[#264653] text-white py-2 px-4 rounded-md font-medium transition-colors duration-200">
                        Update Password
                      </button>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Account Deletion
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Deleting your account will remove all of your information
                      from our database. This cannot be undone.
                    </p>
                    <button className="bg-[#e76f51] hover:bg-[#f4a261] text-white py-2 px-4 rounded-md font-medium transition-colors duration-200">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
