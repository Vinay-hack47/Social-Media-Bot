// src/components/RootLayout.jsx
import { Outlet } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { fetchCurrentUser } from "@/api/user"
import { setUser } from "@/redux/authSlice"

const RootLayout = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await fetchCurrentUser()
        dispatch(setUser(user))
      } catch (err) {
        console.error("Auto-fetch user failed:", err.message)
        // Optional: toast.error("Session expired or not logged in.")
      }
    }

    getUser()
  }, [dispatch])

  return <Outlet />
}

export default RootLayout
