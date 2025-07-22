import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const PostSkeleton = () => {
  return (
    <Card className="mb-4 shadow-sm rounded-xl border border-gray-100 dark:border-gray-800 animate-pulse">
      <CardContent className="p-4 space-y-4">
        {/* Header: Avatar + Name */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700" />
          <div className="space-y-2 w-full">
            <Skeleton className="h-4 w-1/3 bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-3 w-1/4 bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>
        {/* Post content */}
        <Skeleton className="h-4 w-full bg-gray-200 dark:bg-gray-700" />
        <Skeleton className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700" />
        <Skeleton className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700" />
        {/* Media placeholder */}
        <Skeleton className="h-64 w-full rounded-lg bg-gray-200 dark:bg-gray-700" />
        {/* Action buttons */}
        <div className="flex gap-4 pt-2 border-t border-gray-100 dark:border-gray-800">
          <Skeleton className="h-8 w-20 rounded-full bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-8 w-24 rounded-full bg-gray-200 dark:bg-gray-700" />
        </div>
      </CardContent>
    </Card>
  )
}

export default PostSkeleton
