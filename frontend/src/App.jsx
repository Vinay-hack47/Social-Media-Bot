import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { useSelector } from "react-redux"
import RootLayout from "./components/RootLayout"
import ProtectedRoute from "./components/ProtectedRoute"

import Home from "./components/Home"
import Login from "./components/Auth/Login"
import Register from "./components/Auth/Register"
import ForgotPassword from "./components/Auth/ForgotPassword"
import ResetPassword from "./components/Auth/ResetPassword"
import Dashboard from "./components/Dashboard/Dashboard"
import Features from "./components/Features"
import Contact from "./components/Contact"
import CreatePost from "./components/CreatePost"
import Profile from "./components/Profile"
import Explore from "./pages/Explore"
import PlatformContent from "./components/PlatformContent"
import CreatePlatformPost from "./components/CreatePlatformPost"
import ScheduledPostsContent from "./components/ScheduledPostContent"
import ComingSoon from "./components/Common/ComingSoon"
import Status from "./components/Status"
import Analytics from "./components/Analytics"

const App = () => {
  const Debug = () => {
    const state = useSelector((s) => s)
    React.useEffect(() => console.log("STORE SNAPSHOT", state), [])
    return null
  }

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { path: "", element: <Home /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "forgot-password", element: <ForgotPassword /> },
        { path: "reset-password/:token", element: <ResetPassword /> },
        { path: "features", element: <Features /> },
        { path: "contact", element: <Contact /> },

        {
          element: <ProtectedRoute />, // Protect only these routes
          children: [
            { path: "dashboard", element: <Dashboard /> },
            { path: "createPost", element: <CreatePost /> },
            { path: "profile", element: <Profile /> },
            { path: "explore", element: <Explore /> },
            { path: "platform", element: <PlatformContent /> },
            {
              path: "createPlatformPost",
              element: <CreatePlatformPost />
            },
            {
              path: "schedulePost",
              element: <ScheduledPostsContent />
            },
            {
              path: "analytics",
              element: <Analytics></Analytics>
            },
            {
              path: "status",
              element: <Status></Status>
            },

            
          ],
        },
      ],
    },
  ])

  return (
    <>
      <Debug />
      <RouterProvider router={appRouter} />
    </>
  )
}

export default App
