import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/v1/user/forgot/password", { email });
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error sending reset email");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border px-3 py-2 mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
          Send Reset Link
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
