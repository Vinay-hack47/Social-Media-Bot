import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import axios from "axios";
import { setUser } from "@/redux/authSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    mobile: user?.mobile || "",
    bio: user?.profile?.bio || "",
    location: user?.profile?.location || "",
    website: user?.profile?.website || "",
    // file : user?.avatar?.url || "",
    file : null,
  });

  // const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview] = useState(user?.avatar?.url || "");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleImageChange = (e) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     // setProfileImage(file);
  //     setPreview(URL.createObjectURL(file));
  //   }
  // };

  console.log(formData);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

     e.preventDefault();
    //update the formData with the new values
    const updatedData = new FormData();
    updatedData.append("fullname", formData.fullname);
    updatedData.append("email", formData.email);
    updatedData.append("mobile", formData.mobile);
    updatedData.append("bio", formData.bio);
    updatedData.append("location", formData.location);
    updatedData.append("website", formData.website);
    if (formData.file) {
      updatedData.append("file", formData.file);
    }

    try {
      const res = await axios.post("http://localhost:3000/api/v1/user/updateProfile", updatedData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setUser(res.data.user));
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">My Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Image */}
        <div className="flex items-center gap-6">
          <img
            src={preview || "https://github.com/shadcn.png"}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border"
          />
          <div>
            <Label htmlFor="file">Update Profile Picture</Label>
            <Input type="file" id="file" accept="image/*" onChange={(e) =>{
               const file = e.target.files[0];
              if (file) {
                setFormData(prev => ({ ...prev, file: file }));
                setPreview(URL.createObjectURL(file));
              }
            }} />
          </div>
        </div>

        {/* Full Name */}
        <div>
          <Label>Full Name</Label>
          <Input name="fullname" value={formData.fullname} onChange={handleChange} />
        </div>

        {/* Email */}
        <div>
          <Label>Email</Label>
          <Input name="email" value={formData.email} onChange={handleChange} />
        </div>

        {/* Mobile */}
        <div>
          <Label>Mobile</Label>
          <Input name="mobile" value={formData.mobile} onChange={handleChange} />
        </div>

        {/* Bio */}
        <div>
          <Label>Bio</Label>
          <textarea
            name="bio"
            className="w-full p-2 border rounded"
            rows={3}
            value={formData.bio}
            onChange={handleChange}
          />
        </div>

        {/* Location */}
        <div>
          <Label>Location</Label>
          <Input name="location" value={formData.location} onChange={handleChange} />
        </div>

        {/* Website */}
        <div>
          <Label>Website</Label>
          <Input name="website" value={formData.website} onChange={handleChange} />
        </div>

        <Button type="submit" className="w-full bg-blue-600 text-white cursor-pointer">
          Save Changes
        </Button>
      </form>
    </div>
  );
};

export default Profile;
