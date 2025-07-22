import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils" // Assuming cn utility is available


const UserCard = ({ user, onFollow }) => {
  return (
    <div className={cn("flex items-center justify-between p-3 rounded-lg")}>
      <div className="flex items-center gap-3">
        <Avatar className="w-12 h-12 border border-gray-200 dark:border-gray-700">
          <AvatarImage
            src={user?.avatar?.url || "/placeholder.svg?height=48&width=48"}
            alt={user.fullname || "User Avatar"}
          />
          <AvatarFallback className="bg-gray-200 text-gray-600">
            {user.fullname ? user.fullname.charAt(0).toUpperCase() : "U"}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-semibold text-gray-900 dark:text-gray-100">
            {user.fullname || "Unknown User"}
          </span>
        </div>
      </div>
      <Button
        size="sm"
        className="rounded-full px-4 py-2 text-sm transition-colors duration-200 cursor-pointer"
        onClick={() => onFollow?.(user?._id)} // <- Call parent callback
      >
        Follow
      </Button>
    </div>
  )
}


export default UserCard
