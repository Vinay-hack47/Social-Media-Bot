import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(`http://localhost:3000/api/v1/user/password/reset/${token}`, {
        newPassword: password,
      });
      toast.success(res.data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to reset password");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Reset Password</h2>
        <input
          type="password"
          placeholder="Enter new password"
          className="w-full border px-3 py-2 mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">
          Set New Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
