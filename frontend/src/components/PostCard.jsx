import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Trash } from "lucide-react"
import { useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { toast } from "sonner"
import { toggleFollowUser } from "./followToggleHandler"

const PostCard = ({ post, onDelete, onCommentClick, refetch }) => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const currentUserId = user?._id
  const isOwner = currentUserId === post.owner._id
  

  const [isLiked, setIsLiked] = useState(post.likes.includes(currentUserId))
  const [likeCount, setLikeCount] = useState(post.likes.length)
  const [comments, setComments] = useState(post.comments || [])
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState("")
  const isFollowing = user?.followings?.some(f => (f._id || f) === post?.owner?._id)
  const [loadingFollow, setLoadingFollow] = useState(false)
  const isVideo = post.image?.url?.endsWith(".mp4")
  const postId = post._id

  const handleLike = async () => {
    const nextLiked = !isLiked
    setIsLiked(nextLiked)
    setLikeCount(prev => nextLiked ? prev + 1 : prev - 1)

    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/posts/post/reaction/${postId}`,
        { withCredentials: true }
      )
      if (!res.data.success) {
        throw new Error(res.data.message)
      }
    } catch (error) {
      setIsLiked(!nextLiked)
      setLikeCount(prev => nextLiked ? prev - 1 : prev + 1)
      toast.error(error.response.data.message ||"Failed to like/unlike post")
    }
  }

  const deleteHandler = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/v1/posts/post/delete/${postId}`,
        { withCredentials: true }
      )
      if (res.data.success) {
        toast.success(res.data.message)
        onDelete?.(postId)
        refetch?.()
      }
    } catch (error) {
      toast.error(error.response.data.message || "Failed to delete post")
    }
  }

  const handleFollowToggle = async () => {
    setLoadingFollow(true)
    await toggleFollowUser({
      targetUserId: post?.owner?._id,
      isCurrentlyFollowing: isFollowing,
      dispatch,
    })
    setLoadingFollow(false)
  }

  const handleCommentSubmit = async () => {
    
    // if (!newComment.trim()) return
    try {
      const res = await axios.post(
        `http://localhost:3000/api/v1/posts/post/commentOnPost/${postId}`,
        { newComment },
        { withCredentials: true }
      )
      if (res.data.success) {
        const newC = {
          comment: newComment,
          commentedBy: {
            fullname: user.fullname,
            avatar: user.avatar,
          },
        }
        setComments(prev => [newC, ...prev])
        setNewComment("")
        toast.success(res.data.message||"Comment added")
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Failed to add comment")
    }
  }

  return (
    <>
    <Card className="mb-4 shadow-sm hover:shadow-md rounded-xl border border-gray-100 dark:border-gray-800">
      <CardContent className="p-4 space-y-3">
        {/* USER INFO */}
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={post?.owner?.avatar?.url || "/placeholder.svg"} />
            <AvatarFallback>{post?.owner?.fullname?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-gray-900 dark:text-gray-100">{post?.owner?.fullname}</p>
            <p className="text-xs text-muted-foreground">{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</p>
          </div>
        </div>

        {/* POST CONTENT */}
        <p className="text-gray-800 dark:text-gray-200">{post.caption}</p>
        <p className="text-gray-800 dark:text-gray-200">{post.content}</p>
        {post?.image?.url && (
          <div className="rounded-lg overflow-hidden max-h-[400px] bg-gray-100 dark:bg-gray-900">
            {isVideo ? (
              <video controls className="w-full h-auto rounded-lg">
                <source src={post.image.url} type="video/mp4" />
              </video>
            ) : (
              <img src={post.image.url} alt="Post" className="w-full h-auto object-cover rounded-lg" />
            )}
          </div>
        )}

        {/* ACTIONS */}
        <div className="flex items-center justify-between border-t pt-2">
          <div className="flex gap-2 items-center">
            <Button variant="ghost" size="sm" onClick={handleLike}
              className={`gap-1 px-3 py-1 rounded-full ${isLiked ? "text-red-500" : "text-muted-foreground"}`}>
              <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
              <span className="text-sm">{likeCount}</span>
            </Button>

            <Button variant="ghost" size="sm" onClick={() => setShowComments(!showComments)}
              className="gap-1 px-3 py-1 rounded-full text-muted-foreground hover:text-blue-500">
              <MessageCircle size={18} />
              <span className="text-sm">{comments?.length || 0}</span>
            </Button>

            {!isOwner && (
              <Button variant={isFollowing ? "outline" : "default"} size="sm"
                disabled={loadingFollow} onClick={handleFollowToggle}
                className="px-4 py-1 rounded-full text-sm">
                {loadingFollow ? "..." : isFollowing ? "Following" : "Follow"}
              </Button>
            )}
          </div>

          {isOwner && (
            <Button variant="ghost" size="sm" onClick={deleteHandler}
              className="px-3 py-1 rounded-full text-red-500">
              <Trash size={18} />
            </Button>
          )}
        </div>

        {/* COMMENT SECTION */}
        {showComments && (
          <div className="space-y-3 pt-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                className="flex-1 px-3 py-1 rounded-full border dark:bg-gray-800 dark:border-gray-700 text-sm"
              />
              <Button onClick={handleCommentSubmit} size="sm" className="rounded-full text-sm cursor-pointer">
                Post
              </Button>
            </div>

            <div className="space-y-2 max-h-[200px] overflow-y-auto">
              {comments.map((c, index) => (
                <div key={index} className="flex items-start gap-2 text-sm">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={c?.commentedBy?.avatar?.url || "/placeholder.svg"} />
                    <AvatarFallback>{c?.commentedBy?.fullname?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                  <div className="bg-muted p-2 rounded-lg w-full">
                    <p className="font-medium">{c?.commentedBy?.fullname}</p>
                    <p className="text-muted-foreground">{c?.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
    </>
  )
}

export default PostCard
