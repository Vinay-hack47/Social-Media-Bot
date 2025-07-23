"use client" // This page uses client-side hooks and Redux

import { useState } from "react"
import { useSelector } from "react-redux"
import PostCard from "@/components/PostCard" // Updated import path
import UserInfoSidebar from "@/components/UserInfoSidebar" // Updated import path
import SuggestionsSidebar from "@/components/SuggestionsSidebar" // Updated import path
import FeedToggle from "@/components/FeedToggle" // Updated import path
import PostSkeleton from "@/components/skeletons/PostSkeleton" // Updated import path
import useExploreFeed from "@/hooks/useExploreFeed" // Assuming this hook exists and works client-side
import Navbar from "@/components/Navbar"

const Explore = () => {
  const user = useSelector((state) => state.auth.user)
  const [feedType, setFeedType] = useState("all")
  const { posts, loading, refetch } = useExploreFeed(feedType)
  console.log("specfic post",posts);
  


  // Placeholder for onLike and onCommentClick handlers
  // const handleLike = (postId) => {
  //   console.log(`Liked post: ${postId}`)
  //   // Implement actual like logic here (API call, state update)
  //   // You might want to refetch posts or update the specific post in Redux state
  // }

  const handleCommentClick = (postId) => {
    console.log(`Comment button clicked for post: ${postId}`)
    // Implement logic to open a comment modal or navigate to post details
  }

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      <div className="pt-16 grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-4 py-6 bg-gray-50 dark:bg-gray-950 min-h-screen">
        {/* Left Sidebar */}
        <div className="hidden lg:block col-span-1">
          <UserInfoSidebar user={user} />
        </div>

        {/* Center Feed */}
        <main className="col-span-1 lg:col-span-2 xl:col-span-3 space-y-6">
          <FeedToggle selected={feedType} onChange={setFeedType} />
          {loading ? (
            <>
              <PostSkeleton />
              <PostSkeleton />
              <PostSkeleton />
              {!user && (
                <div className="text-center text-muted-foreground mt-4">
                  <p className="text-lg font-semibold">Please login to view posts.</p>
                </div>
              )}
            </>
          ) : (
            <div className="max-w-xl mx-auto space-y-6">
              {posts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-center text-muted-foreground">
                  <p className="text-lg font-medium">No posts available.</p>
                  <p className="text-sm mt-2">Try switching the feed type or check back later!</p>
                </div>
              ) : (
                posts.map((post) => (
                  <PostCard
                    key={post._id}
                    post={post}
                    refetch={refetch}
                    onCommentClick={handleCommentClick}
                  />
                ))
              )}
            </div>
          )}
        </main>

        {/* Right Sidebar */}
        <div className="hidden xl:block col-span-1">
          <SuggestionsSidebar />
        </div>
      </div>
    </>
  )
}

export default Explore
