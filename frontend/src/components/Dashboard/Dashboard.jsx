"use client"

import React from "react"
import { Bot, BarChart3, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navbar from "../Navbar"
import { useSelector } from "react-redux"
import useGetAllUser from "@/hooks/useGetAllUser"

const Sidebar = () => (
  
  <div className="h-screen w-64 bg-gray-900 text-white flex flex-col p-4 shadow-lg">
    <div className="text-2xl font-bold mb-10 flex items-center gap-2">
      <Bot className="h-6 w-6" /> Botify
    </div>
    <nav className="flex-1 space-y-2">
      {[
        { label: "Dashboard", href: "/dashboard" },
        { label: "Analytics", href: "/analytics" },
        { label: "Explore", href: "/explore" },
        { label: "Create Post", href: "/createPlatformPost" },
        { label: "Scheduled Posts", href: "/schedulePost" },
        { label: "Platforms", href: "/platform" },
        { label: "Status Tracking", href: "/status" },
      ].map(({ label, href }) => (
        <a
          key={label}
          href={href}
          className="block px-3 py-2 rounded-md hover:bg-gray-800 transition-colors"
        >
          {label}
        </a>
      ))}
    </nav>
    <div className="mt-auto space-y-2">
      <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-800">
        <Settings className="mr-2 h-4 w-4" /> Settings
      </Button>
      <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-800">
        <LogOut className="mr-2 h-4 w-4" /> Logout
      </Button>
    </div>
  </div>
)

const Header = () => {
  const { user } = useSelector((store) => store.auth)

  return (
    <header className="bg-white shadow px-6 py-4 flex items-center justify-between dark:bg-gray-950 dark:text-white">
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <div className="text-sm text-muted-foreground">
        Welcome back, <span className="font-medium">{user?.fullname || "User"}</span>
      </div>
    </header>
  )
}

const MainContent = () => {
  const { user } = useSelector((store) => store.auth)

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-blue-100 p-5 rounded-2xl shadow-sm text-center">
          <p className="text-lg font-semibold text-blue-800">Total Posts</p>
          <p className="text-2xl font-bold text-blue-900">{user?.posts?.length || 0}</p>
        </div>
        <div className="bg-green-100 p-5 rounded-2xl shadow-sm text-center">
          <p className="text-lg font-semibold text-green-800">Pending Posts</p>
          <p className="text-2xl font-bold text-green-900">8</p>
        </div>
        <div className="bg-purple-100 p-5 rounded-2xl shadow-sm text-center">
          <p className="text-lg font-semibold text-purple-800">Media Files</p>
          <p className="text-2xl font-bold text-purple-900">42</p>
        </div>
        <div className="bg-yellow-100 p-5 rounded-2xl shadow-sm text-center">
          <p className="text-lg font-semibold text-yellow-800">Platforms Connected</p>
          <p className="text-2xl font-bold text-yellow-900">3</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-bold mb-4">Post Schedule Overview</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          (Chart or upcoming scheduled posts will appear here)
        </p>
      </div>
    </div>
  )
}

const Dashboard = () => {
  useGetAllUser();
  return (
    <>
      <Navbar />
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col bg-gray-100 dark:bg-gray-950">
          <Header />
          <main className="flex-1 overflow-y-auto">
            <MainContent />
          </main>
        </div>
      </div>
    </>
  )
}

export default Dashboard
