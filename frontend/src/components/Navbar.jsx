import { Button } from "@/components/ui/button"
import { setUser } from "@/redux/authSlice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner";
import { Popover, PopoverTrigger, PopoverContent, PopoverAnchor } from "@/components/ui/popover";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { LogOut, User2 } from "lucide-react";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/user/logout", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setUser(null));
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Logout failed");
    }
  };

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white shadow">
      {/* Left: Logo + Nav */}
      <div className="flex items-center gap-10">
        <h1 className="text-xl font-bold text-blue-600">Botify</h1>
        <nav className="space-x-6">
          <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
          <Link to="/features" className="text-gray-700 hover:text-blue-600">Features</Link>
          <Link to="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link>
          <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
        </nav>
      </div>

      {/* Right: Auth buttons or profile */}
      {
        user ? (
          <Popover>
            <PopoverTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage
                  src={user?.avatar?.url || "https://github.com/shadcn.png"}
                  alt="User Avatar"
                />
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="bg-white w-64 shadow-lg rounded-md">
              <div className="p-2">
                <div className='flex gap-2 mb-2'>
                  <Avatar>
                    <AvatarImage
                      src={user?.avatar?.url || "https://github.com/shadcn.png"}
                      alt="User Avatar"
                    />
                  </Avatar>
                  <div>
                    <h4 className='font-medium'>{user?.fullname}</h4>
                    <p className='text-sm text-gray-600'>Welcome to Botify</p>
                  </div>
                </div>

                <div className='flex flex-col gap-2 text-gray-600'>

                  <div className='flex items-center gap-2'>
                    <User2 size={18} />
                    <Link to="/profile">
                      <Button variant="link" className=" h-auto text-blue-600">View Profile</Button>
                    </Link>
                  </div>


                  <div className='flex items-center gap-2'>
                    <LogOut size={18} />
                    <Button variant="link" onClick={logoutHandler} className=" h-auto text-red-500">Logout</Button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        ) : (
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="outline" className="px-5">Login</Button>
            </Link>
            <Link to="/register">
              <Button className="px-5">Get Started</Button>
            </Link>
          </div>
        )
      }
    </header>
  );
};

export default Navbar;
