import axios from "axios"
import { fetchCurrentUser } from "@/api/user"
import { setUser } from "@/redux/authSlice"
import { toast } from "sonner"

export const toggleFollowUser = async ({ targetUserId, isCurrentlyFollowing, dispatch }) => {
  try {
    const endpoint = isCurrentlyFollowing
      ? `http://localhost:3000/api/v1/posts/post/unfollow/${targetUserId}`
      : `http://localhost:3000/api/v1/posts/post/follow/${targetUserId}`

    const res = await axios.get(endpoint, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    })

    if (res.data.success) {
      toast.success(res.data.message)

      const updatedUser = await fetchCurrentUser()
      dispatch(setUser(updatedUser)) // Updates global `user` in Redux

      return { success: true }
    } else {
      toast.error(res.data.message)
      return { success: false }
    }
  } catch (err) {
    toast.error(err?.response?.data?.message || "Failed to follow/unfollow")
    return { success: false }
  }
}
