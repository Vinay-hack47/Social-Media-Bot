
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import UserCard from "./UserCard" // Updated import path
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Users } from "lucide-react"
import { useState, useEffect } from "react" // Import useState and useEffect
import { toggleFollowUser } from "./followToggleHandler"
import { toast } from "sonner"
import { setUser } from "@/redux/authSlice"
import axios from "axios"
import { fetchCurrentUser } from "@/api/user"

const SuggestionsSidebar = () => {
  const { allUser } = useSelector((state) => state.auth);
  
  const { user } = useSelector((state) => state.auth);
  
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [suggestedUsers, setSuggestedUsers] = useState([])
  

 useEffect(() => {
  if (allUser && user) {
    const followingIds = user?.followings?.map(f => f._id || f) || []

    const filtered = allUser.filter(
      (u) => u._id !== user._id && !followingIds.includes(u._id)
    )
    setSuggestedUsers(filtered)
  }
}, [allUser, user, dispatch])

  
// const handleFollow = async (followId) => {
//   console.log(followId);
  
//   try {
//     const res = await axios.get(`http://localhost:3000/api/v1/posts/post/follow/${followId}`, {
      
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       withCredentials: true,
//     })

//     if (res.data.success) {
//       toast.success(res.data.message)
//       const updatedUser = await fetchCurrentUser();

//       dispatch(setUser(updatedUser));

//       setSuggestedUsers((prev) => prev.filter((u) => u._id !== followId))
//     }
//   } catch (error) {
//     console.error(error)
//     toast.error(error?.response?.data?.message || "Failed to follow user")
//   }
// }

const handleFollow = async (followId) => {
  const result = await toggleFollowUser({
    targetUserId: followId,
    isCurrentlyFollowing: false, // Suggestions will always show unfollowed users
    dispatch,
  })

  if (result.success) {
    setSuggestedUsers((prev) => prev.filter((u) => u._id !== followId))
  }
}

  return (
    <aside className="sticky top-20 hidden xl:block w-[320px] p-2">
      <Card className="shadow-lg rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Users className="w-5 h-5 text-primary" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Who to Follow</h3>
          </div>
          <ScrollArea className="h-[400px] pr-4">
            {suggestedUsers?.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-10">
                <p className="text-sm text-gray-500 dark:text-gray-400">No suggestions available.</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  Check back later for new recommendations!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {suggestedUsers.map((user) => (
                  <UserCard
                    key={user._id}
                    user={user}
                    onFollow={handleFollow}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 rounded-lg"
                  />
                ))}
              </div>
            )}
          </ScrollArea>
          <Button
            variant="ghost"
            className="w-full mt-6 text-primary font-semibold hover:bg-primary/10 rounded-full py-2 transition-colors duration-200"
            onClick={() => navigate("/suggestions")}
          >
            Discover More
          </Button>
        </CardContent>
      </Card>
    </aside>
  )
}

export default SuggestionsSidebar
