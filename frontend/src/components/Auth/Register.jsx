"use client";

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

// Zod validation schema
const registerSchema = z.object({
  fullname: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(50, "Full name must be less than 50 characters"),
  email: z.string().email("Please enter a valid email address"),
  mobile: z
    .string()
    .min(10, "Mobile number must be at least 10 digits")
    .max(15, "Mobile number must be less than 15 digits")
    .regex(/^[+]?[\d\s-()]+$/, "Please enter a valid mobile number"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

const Register = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    mobile: "",
    password: "",
    file: null,
  });
  console.log(formData.file);

  const navigate = useNavigate();

  const [error, setError] = useState({});

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

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files?.[0] })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = registerSchema.safeParse(formData);

    if (!result.success) {
      setError(result.error.formErrors.fieldErrors);
    } else {
      setError({});
      console.log(formData);

      try {
        const res = await axios.post("http://localhost:3000/api/v1/user/register", formData, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        });

        if (res.data.success) {
          toast.success(res.data.message)
          navigate("/login")
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message)
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
        <p className="mt-2 text-center text-sm text-gray-600">Join our social media bot platform</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="mt-1">
                <input
                  id="fullname"
                  name="fullname"
                  type="text"
                  value={formData.fullname}
                  onChange={handleInputChange}
                  className={`appearance-none block w-full px-3 py-2 border ${error.fullname ? "border-red-300" : "border-gray-300"
                    } rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  placeholder="Enter your full name"
                />
                {error.fullname && <p className="mt-2 text-sm text-red-600">{error.fullname}</p>}
              </div>
            </div>

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
                  className={`appearance-none block w-full px-3 py-2 border ${error.email ? "border-red-300" : "border-gray-300"
                    } rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  placeholder="Enter your email"
                />
                {error.email && <p className="mt-2 text-sm text-red-600">{error.email}</p>}
              </div>
            </div>

            {/* Mobile */}
            <div>
              <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
                Mobile Number
              </label>
              <div className="mt-1">
                <input
                  id="mobile"
                  name="mobile"
                  type="tel"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className={`appearance-none block w-full px-3 py-2 border ${error.mobile ? "border-red-300" : "border-gray-300"
                    } rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  placeholder="Enter your mobile number"
                />
                {error.mobile && <p className="mt-2 text-sm text-red-600">{error.mobile}</p>}
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
                  className={`appearance-none block w-full px-3 py-2 border ${error.password ? "border-red-300" : "border-gray-300"
                    } rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  placeholder="Create a password"
                />
                {error.password && <p className="mt-2 text-sm text-red-600">{error.password}</p>}
              </div>
            </div>

            {/* Profile Image Upload (Optional) */}
            <div>
              <label htmlFor="file" className="block text-sm font-medium text-gray-700">
                Profile Picture <span className="text-gray-400">(optional)</span>
              </label>
              <div className="mt-1">
                <input
                  id="file"
                  name="file"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                 file:rounded-md file:border-0 file:text-sm file:font-semibold
                 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="border-gray-600 rounded-full bg-blue-600 w-full p-1.5 text-white font-bold cursor-pointer"
              >
                Create Account
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="text-center">
              <span className="text-sm text-gray-600">
                Already have an account?{" "}
                <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Sign in
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
