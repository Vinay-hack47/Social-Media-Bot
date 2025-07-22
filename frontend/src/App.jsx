// import React, { useEffect } from 'react'
// import RegisterForm from './components/Auth/Register'
// import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
// import Register from './components/Auth/Register'
// import Home from './components/Home'
// import Login from './components/Auth/Login'
// import ForgotPassword from './components/Auth/ForgotPassword'
// import ResetPassword from './components/Auth/ResetPassword'
// import Dashboard from './components/Dashboard/Dashboard'
// import Features from './components/Features'
// import Contact from './components/Contact'
// import CreatePost from './components/CreatePost'
// import Profile from './components/Profile'
// import Feeds from './components/Feeds'
// import Explore from './pages/Explore'
// import { useSelector } from 'react-redux'

// const App = () => {
// const Debug = () => {
//   const state = useSelector(s => s);
//   useEffect(() => console.log('STORE SNAPSHOT', state), []);
//   return null;
// };
  

//   const appRouter = createBrowserRouter([
//     {
//       path: '/',
//       element : <Home></Home>
//     },
//     {
//       path: '/login',
//       element : <Login></Login>
//     },
//     {
//       path: '/register',
//       element: <Register></Register>
//     },
//     {
//       path: "/forgot-password",
//       element : <ForgotPassword></ForgotPassword>
//     },
//     {
//       path : "/reset-password/:token",
//       element: <ResetPassword></ResetPassword>
//     },
//     {
//       path: "/dashboard",
//       element: <Dashboard></Dashboard>
//     },
//     {
//       path: "/features",
//       element: <Features></Features>
//     },
//     {
//       path: "/contact",
//       element: <Contact></Contact>
//     },
//     {
//       path: "/createPost",
//       element: <CreatePost></CreatePost>
//     },
//     {
//       path: "/profile",
//       element: <Profile></Profile>
//     },
//     {
//       path: "/explore",
//       element: <Explore></Explore>
//     }
//   ])
//   return (
//     <>
//     <Debug></Debug>
//     <RouterProvider router={appRouter}></RouterProvider>
//     </>
//   )
// }

// export default App



// import React from "react"
// import { createBrowserRouter, RouterProvider } from "react-router-dom"
// import { useSelector } from "react-redux"
// import RootLayout from "./components/RootLayout"

// import Home from "./components/Home"
// import Login from "./components/Auth/Login"
// import Register from "./components/Auth/Register"
// import ForgotPassword from "./components/Auth/ForgotPassword"
// import ResetPassword from "./components/Auth/ResetPassword"
// import Dashboard from "./components/Dashboard/Dashboard"
// import Features from "./components/Features"
// import Contact from "./components/Contact"
// import CreatePost from "./components/CreatePost"
// import Profile from "./components/Profile"
// import Explore from "./pages/Explore"
// import ProtectedRoute from "./components/ProtectedRoute"
// import PlatformContent from "./components/PlatformContent"

// const App = () => {
//   const Debug = () => {
//     const state = useSelector((s) => s)
//     React.useEffect(() => console.log("STORE SNAPSHOT", state), [])
//     return null
//   }
// const appRouter = createBrowserRouter([
//   {
//     path: "/",
//     element: <RootLayout />,
//     children: [
//       { path: "/", element: <Home /> },
//       { path: "/login", element: <Login /> },
//       { path: "/register", element: <Register /> },
//       { path: "/forgot-password", element: <ForgotPassword /> },
//       { path: "/reset-password/:token", element: <ResetPassword /> },

//       {
//         element: <ProtectedRoute />,
//         children: [
//           { path: "/dashboard", element: <Dashboard /> },
//           { path: "/createPost", element: <CreatePost /> },
//           { path: "/profile", element: <Profile /> },
//           { path: "/explore", element: <Explore /> },
//           { path: "/platform", element: <PlatformContent /> },
//         ],
//       },

//       { path: "/features", element: <Features /> },
//       { path: "/contact", element: <Contact /> },
//     ],
//   },
// ])

//   return (
//     <>
//       <Debug />
//       <RouterProvider router={appRouter} />
//     </>
//   )
// }

// export default App




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
