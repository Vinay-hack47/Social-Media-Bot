import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/authSlice";

// Zod validation schema
const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error[name]) {
      setError((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = loginSchema.safeParse(formData);
    if (!result.success) {
      setError(result.error.formErrors.fieldErrors);
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/api/v1/user/login", formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (res.data.success) {
        console.log(res.data);
        
        toast.success(res.data.message);
        dispatch(setUser(res.data.user));
        navigate("/dashboard"); 
        console.log(res.data.user);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Login to your account</h2>
        <p className="mt-2 text-center text-sm text-gray-600">Welcome back to the social media bot platform</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    error.email ? "border-red-300" : "border-gray-300"
                  } rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  placeholder="Enter your email"
                />
                {error.email && <p className="mt-2 text-sm text-red-600">{error.email}</p>}
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    error.password ? "border-red-300" : "border-gray-300"
                  } rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  placeholder="Enter your password"
                />
                {error.password && <p className="mt-2 text-sm text-red-600">{error.password}</p>}
              </div>

              {/* Forgot Password */}
              <div className="mt-2 text-right">
                <a href="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="border-gray-600 rounded-full bg-blue-600 w-full p-1.5 text-white font-bold cursor-pointer"
              >
                Login
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <span className="text-sm text-gray-600">
              Don’t have an account?{" "}
              <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                Sign up
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
