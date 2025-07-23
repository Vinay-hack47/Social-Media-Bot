import React from "react";
import { useSelector } from "react-redux";
import useGetAllUserScheduledPost from "@/hooks/useGetAllUserScheduledPost";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Share2 } from "lucide-react";

const ScheduledPostContent = () => {
  useGetAllUserScheduledPost();
  const scheduledPosts = useSelector((state) => state.post.allUserScheduledPost);

  if (!scheduledPosts || scheduledPosts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500">
        <Share2 className="w-10 h-10 mb-2" />
        <p>No scheduled posts found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {scheduledPosts.map((post) => (
        <Card
          key={post._id}
          className="shadow-lg rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 transition-all duration-300"
        >
          <CardContent className="p-5 flex flex-col gap-3">
            {/* Image preview */}
            {post.image?.url && (
              <img
                src={post.image.url}
                alt="scheduled"
                className="w-full h-48 object-cover rounded-lg border"
              />
            )}

            {/* Content */}
            <h3 className="font-bold text-lg text-gray-900 dark:text-white line-clamp-2">
              {post.content}
            </h3>

            {/* Platforms */}
            <div className="flex flex-wrap gap-2">
              {post.platforms?.map((platform) => (
                <Badge key={platform} variant="secondary" className="capitalize">
                  {platform}
                </Badge>
              ))}
            </div>

            {/* Scheduled time */}
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Calendar className="w-4 h-4" />
              {new Date(post.scheduledFor).toLocaleDateString()} &nbsp;
              <Clock className="w-4 h-4" />
              {new Date(post.scheduledFor).toLocaleTimeString()}
            </div>

            {/* Platform status */}
            {post.platformResponse && (
              <div className="flex flex-col gap-1 mt-2">
                <span className="text-xs text-gray-400">Status per platform:</span>
                {Object.entries(post.platformResponse).map(([platform, statusObj]) => (
                  <span key={platform} className="text-xs">
                    <b className="capitalize">{platform}:</b>{" "}
                    <span
                      className={
                        statusObj.status === "success"
                          ? "text-green-600"
                          : statusObj.status === "failed"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }
                    >
                      {statusObj.status}
                    </span>
                  </span>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ScheduledPostContent;
