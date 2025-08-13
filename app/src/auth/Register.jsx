import { useState } from "react";
import api from "../api";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";

const Register = () => {
  // const [userData, setData] = useState({ name: "", email: "", password: "" });
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { fetchUser, setUser } = useAuth();

  const onSubmit = async (data) => {
    if (data.password === data.confirmPassword) {
      try {
        const res = await api.post("/user/create", data);
        navigate("/dashboard", { replace: true });
        setUser();
        toast.success(res.data.message);
      } catch (error) {
        console.log("Login error: ", error);
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    } else {
      toast.error("Password does not match!");
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Create a new account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-[#2a9d8f] hover:text-[#264653]"
            >
              Sign in here
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="name" className="sr-only">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                {...register("name")}
                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-[#2a9d8f] focus:outline-none focus:ring-[#2a9d8f] sm:text-sm"
                placeholder="Full Name"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                {...register("email")}
                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-[#2a9d8f] focus:outline-none focus:ring-[#2a9d8f] sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="phone" className="sr-only">
                Phone No
              </label>
              <input
                id="phone"
                name="phone"
                type="number"
                required
                {...register("phone")}
                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-[#2a9d8f] focus:outline-none focus:ring-[#2a9d8f] sm:text-sm"
                placeholder="Phone no"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                {...register("password")}
                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-[#2a9d8f] focus:outline-none focus:ring-[#2a9d8f] sm:text-sm"
                placeholder="Password"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                {...register("confirmPassword")}
                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-[#2a9d8f] focus:outline-none focus:ring-[#2a9d8f] sm:text-sm"
                placeholder="Confirm Password"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-[#2a9d8f] focus:ring-[#2a9d8f]"
              required
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
              I agree to the{" "}
              <Link
                to="/terms"
                className="font-medium text-[#2a9d8f] hover:text-[#264653]"
              >
                Terms and Conditions
              </Link>
            </label>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-[#2a9d8f] py-2 px-4 text-sm font-medium text-white hover:bg-[#264653] focus:outline-none focus:ring-2 focus:ring-[#2a9d8f] focus:ring-offset-2"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Register;
