  "use client"

  import { Card, CardContent } from "@/components/ui/card"
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
  import { Button } from "@/components/ui/button"
  import { Separator } from "@/components/ui/separator"
  import { useNavigate } from "react-router-dom"
  import { useSelector } from "react-redux"

  const UserInfoSidebar = () => {
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth)

    if (!user) {
      // Handle case where user data is not available yet
      return (
        <aside className="sticky top-20 hidden lg:block w-full max-w-xs animate-pulse">
          <Card className="shadow-md rounded-xl">
            <CardContent className="flex flex-col items-center text-center p-6 space-y-4">
              <Avatar className="w-20 h-20 bg-gray-200 rounded-full" />
              <div className="space-y-2 w-full">
                <div className="h-5 bg-gray-200 rounded w-3/4 mx-auto" />
                <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
              </div>
              <div className="flex justify-around w-full text-sm">
                <div className="flex flex-col items-center space-y-1">
                  <div className="h-4 bg-gray-200 rounded w-8" />
                  <div className="h-3 bg-gray-200 rounded w-12" />
                </div>
                <div className="flex flex-col items-center space-y-1">
                  <div className="h-4 bg-gray-200 rounded w-8" />
                  <div className="h-3 bg-gray-200 rounded w-12" />
                </div>
              </div>
              <Separator className="my-2 bg-gray-200" />
              <div className="h-9 bg-gray-200 rounded-md w-full" />
              <div className="h-9 bg-gray-200 rounded-md w-full" />
            </CardContent>
          </Card>
        </aside>
      )
    }

    return (
      <aside className="sticky top-20 hidden lg:block w-full max-w-xs">
        <Card className="shadow-md rounded-xl border border-gray-200 dark:border-gray-800">
          <CardContent className="flex flex-col items-center text-center p-6 space-y-4">
            <Avatar className="w-24 h-24 border-2 border-primary-foreground shadow-sm">
              <AvatarImage
                src={user?.avatar?.url || "/placeholder.svg?height=96&width=96"}
                alt={user.fullname || "User Avatar"}
              />
              <AvatarFallback classname="bg-primary text-primary-foreground text-xl font-semibold">
                {user.fullname ? user.fullname.charAt(0).toUpperCase() : "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{user.fullname || "Unknown User"}</h2>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>  
            <div className="flex justify-around w-full text-sm text-muted-foreground">
              <div className="flex flex-col items-center">
                <span className="font-semibold text-base text-gray-800 dark:text-gray-200">
                  {user?.followers?.length || 0}
                </span>
                <span>Followers</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-semibold text-base text-gray-800 dark:text-gray-200">
                  {user?.followings?.length || 0}
                </span>
                <span>Following</span>
              </div>
            </div>
            <Separator className="my-4 bg-gray-200 dark:bg-gray-700" />
            <Button
              variant="outline"
              size="sm"
              className="w-full rounded-full text-primary border-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-200 bg-transparent"
              onClick={() => navigate("/profile")}
            >
              Edit Profile
            </Button>
            <Button
              variant="default"
              size="sm"
              className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
              onClick={() => navigate("/createPost")}
            >
              Create Post 
            </Button>
          </CardContent>
        </Card>
      </aside>
    )
  }

  export default UserInfoSidebar
