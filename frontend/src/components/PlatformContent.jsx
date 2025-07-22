// "use client"

// import { useState } from "react"
// import {
//   Instagram,
//   Twitter,
//   Facebook,
//   Linkedin,
//   Youtube,
//   TwitterIcon as TikTok,
//   Plug,
//   CheckCircle,
//   XCircle,
// } from "lucide-react"
// import { Button } from "@/components/ui/button"

// const socialPlatforms = [
//   {
//     id: "instagram",
//     name: "Instagram",
//     icon: Instagram,
//     description: "Connect your Instagram account to manage posts and stories.",
//     color: "from-purple-500 to-pink-500",
//   },
//   {
//     id: "twitter",
//     name: "Twitter",
//     icon: Twitter,
//     description: "Link your Twitter account for scheduling tweets and analytics.",
//     color: "from-blue-400 to-blue-600",
//   },
//   {
//     id: "facebook",
//     name: "Facebook",
//     icon: Facebook,
//     description: "Manage your Facebook pages and groups with ease.",
//     color: "from-blue-600 to-blue-800",
//   },
//   {
//     id: "linkedin",
//     name: "LinkedIn",
//     icon: Linkedin,
//     description: "Automate your professional network updates and posts.",
//     color: "from-blue-700 to-blue-900",
//   },
//   {
//     id: "youtube",
//     name: "YouTube",
//     icon: Youtube,
//     description: "Schedule video uploads and manage your YouTube channel.",
//     color: "from-red-500 to-red-700",
//   },
//   {
//     id: "tiktok",
//     name: "TikTok",
//     icon: TikTok,
//     description: "Plan and publish your short-form video content.",
//     color: "from-black to-gray-800",
//   },
// ]

// const PlatformContent = () => {
//   // Use a state to manage connected platforms
//   const [connectedPlatforms, setConnectedPlatforms] = useState(() => {
//     // Initialize from localStorage or default to an empty set
//     if (typeof window !== "undefined") {
//       const stored = localStorage.getItem("connectedPlatforms")
//       return stored ? new Set(JSON.parse(stored)) : new Set()
//     }
//     return new Set()
//   })

//   const toggleConnection = (platformId) => {
//     setConnectedPlatforms((prev) => {
//       const newSet = new Set(prev)
//       if (newSet.has(platformId)) {
//         newSet.delete(platformId)
//       } else {
//         newSet.add(platformId)
//       }
//       if (typeof window !== "undefined") {
//         localStorage.setItem("connectedPlatforms", JSON.stringify(Array.from(newSet)))
//       }
//       return newSet
//     })
//   }

//   return (
//     <div className="p-6 space-y-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {socialPlatforms.map((platform) => {
//           const isConnected = connectedPlatforms.has(platform.id)
//           const Icon = platform.icon // Component for the icon

//           return (
//             <div
//               key={platform.id}
//               className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md flex flex-col items-center text-center"
//             >
//               <div
//                 className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 bg-gradient-to-br ${platform.color} text-white shadow-lg`}
//               >
//                 <Icon className="h-10 w-10" />
//               </div>
//               <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{platform.name}</h2>
//               <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{platform.description}</p>
//               <div className="flex items-center gap-2 mb-4">
//                 {isConnected ? (
//                   <span className="text-green-600 flex items-center gap-1">
//                     <CheckCircle className="h-4 w-4" /> Connected
//                   </span>
//                 ) : (
//                   <span className="text-red-500 flex items-center gap-1">
//                     <XCircle className="h-4 w-4" /> Not Connected
//                   </span>
//                 )}
//               </div>
//               <Button
//                 onClick={() => toggleConnection(platform.id)}
//                 className={`w-full cursor-pointer ${
//                   isConnected ? "bg-red-500 hover:bg-red-600" : "bg-indigo-600 hover:bg-indigo-700"
//                 } text-white`}
//               >
//                 <Plug className="mr-2 h-4 w-4" />
//                 {isConnected ? "Disconnect" : "Connect"}
//               </Button>
//             </div>
//           )
//         })}
//       </div>
//     </div>
//   )
// }

// export default PlatformContent




// "use client"

// import { useEffect, useState } from "react"
// import {
//   Instagram, Twitter, Facebook, Linkedin, Youtube,
//   TwitterIcon as TikTok, Plug, CheckCircle, XCircle,
// } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { useTwitterAuth } from "@/components/platforms/twitter/useTwitterAuth"
// import axios from "axios"

// const socialPlatforms = [
//   {
//     id: "instagram",
//     name: "Instagram",
//     icon: Instagram,
//     description: "Connect your Instagram account to manage posts and stories.",
//     color: "from-purple-500 to-pink-500",
//   },
//   {
//     id: "twitter",
//     name: "Twitter",
//     icon: Twitter,
//     description: "Link your Twitter account for scheduling tweets and analytics.",
//     color: "from-blue-400 to-blue-600",
//   },
//   {
//     id: "facebook",
//     name: "Facebook",
//     icon: Facebook,
//     description: "Manage your Facebook pages and groups with ease.",
//     color: "from-blue-600 to-blue-800",
//   },
//   {
//     id: "linkedin",
//     name: "LinkedIn",
//     icon: Linkedin,
//     description: "Automate your professional network updates and posts.",
//     color: "from-blue-700 to-blue-900",
//   },
//   {
//     id: "youtube",
//     name: "YouTube",
//     icon: Youtube,
//     description: "Schedule video uploads and manage your YouTube channel.",
//     color: "from-red-500 to-red-700",
//   },
//   {
//     id: "tiktok",
//     name: "TikTok",
//     icon: TikTok,
//     description: "Plan and publish your short-form video content.",
//     color: "from-black to-gray-800",
//   },
// ]


// const PlatformContent = () => {
//   const { connect } = useTwitterAuth()
//   // const [connectedPlatforms, setConnectedPlatforms] = useState(new Set())

//   // useEffect(() => {
//   //   const fetchTwitterStatus = async () => {
//   //     try {
//   //       const res = await axios.get("/api/twitter/is-connected")
//   //       if (res.data.connected) {
//   //         setConnectedPlatforms((prev) => new Set(prev).add("twitter"))
//   //       }
//   //     } catch (err) {
//   //       console.error("Failed to fetch Twitter connection status", err)
//   //     }
//   //   }

//   //   fetchTwitterStatus()
//   // }, [])

//   const handleConnectClick = async (platformId) => {

//     if (platformId === "twitter") {
//       await connect() // Will redirect
//     } else {
//       // For future platforms, fallback
//       alert("This platform's integration is not implemented yet.")
//     }
//   }

//   return (
//     <div className="p-6 space-y-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {socialPlatforms.map((platform) => {
//           // const isConnected = connectedPlatforms.has(platform.id)
//           const Icon = platform.icon

//           return (
//             <div
//               key={platform.id}
//               className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md flex flex-col items-center text-center"
//             >
//               <div
//                 className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 bg-gradient-to-br ${platform.color} text-white shadow-lg`}
//               >
//                 <Icon className="h-10 w-10" />
//               </div>
//               <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{platform.name}</h2>
//               <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{platform.description}</p>
//               <div className="flex items-center gap-2 mb-4">
//                 {isConnected ? (
//                   <span className="text-green-600 flex items-center gap-1">
//                     <CheckCircle className="h-4 w-4" /> Connected
//                   </span>
//                 ) : (
//                   <span className="text-red-500 flex items-center gap-1">
//                     <XCircle className="h-4 w-4" /> Not Connected
//                   </span>
//                 )}
//               </div>
//               <Button
//                 onClick={() => handleConnectClick(platform.id)}

//                 className={`w-full cursor-pointer ${
//                   isConnected ? "bg-red-500 hover:bg-red-600" : "bg-indigo-600 hover:bg-indigo-700"
//                 } text-white`}
//               >
//                 <Plug className="mr-2 h-4 w-4" />
//                 {isConnected ? "Disconnect" : "Connect"}
//               </Button>
//             </div>
//           )
//         })}
//       </div>
//     </div>
//   )
// }

// export default PlatformContent




// import { useState } from "react";
// import { Twitter, Instagram, Facebook, Youtube } from "lucide-react";
// import PlatformCard from "./PlatformCard";
// import { useTwitterAuth } from "./platforms/twitter/useTwitterAuth"

// const platformsData = [
//   { name: "Twitter", icon: Twitter },
//   { name: "Instagram", icon: Instagram },
//   { name: "Facebook", icon: Facebook },
//   { name: "YouTube", icon: Youtube },
// ];

// export default function PlatformContent() {
//   const { connect: connectTwitter } = useTwitterAuth();
//   const [connectedPlatforms, setConnectedPlatforms] = useState([]);

//   const handleConnect = async (platformName) => {
//     if (platformName === "Twitter") {
//       await connectTwitter(); // Redirects to Twitter
//       setConnectedPlatforms((prev) => [...prev, "Twitter"]);
//     } else {
//       alert(`${platformName} integration not implemented yet.`);
//     }
//   };

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//       {platformsData.map(({ name, icon: Icon }) => (
//         <PlatformCard
//           key={name}
//           platformName={name}
//           platformIcon={<Icon className="w-6 h-6 mr-2" />}
//           isConnected={connectedPlatforms.includes(name)}
//           onConnect={() => handleConnect(name)}
//         />
//       ))}
//     </div>
//   );
// }


// src/pages/PlatformContent.jsx
import { Twitter, Instagram, Facebook, Youtube } from "lucide-react";
import PlatformCard from "@/components/PlatformCard";
import { useTwitterAuth } from "./platforms/twitter/useTwitterAuth"
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import useTwitterDisconnect from "./platforms/twitter/useTwitterDisconnect";

const PlatformContent = () => {
  const { connect } = useTwitterAuth();
  const { disconnect } = useTwitterDisconnect();
  const { user } = useSelector((state) => state.auth);

  const twitterPlatform = user?.platforms?.find(p => p.name === "twitter");
  const isTwitterConnected = !!twitterPlatform?.platformId && !!twitterPlatform?.accessToken;


  return (
    <div className="p-6 flex flex-col gap-6">
      <PlatformCard
        name="Twitter"
        description="Connect your Twitter account to schedule posts and track engagement."
        icon={<Twitter className="w-6 h-6" />}
        onConnect={connect}
        onDisconnect={disconnect}
        initialConnected={isTwitterConnected}
      />

      <PlatformCard
        name="Instagram"
        description="Coming soon"
        icon={<Instagram className="w-6 h-6 opacity-30" />}
        onConnect={async () => { }}
        onDisconnect={async () => { }}
        initialConnected={false}
      />

      <PlatformCard
        name="Facebook"
        description="Coming soon"
        icon={<Facebook className="w-6 h-6 opacity-30" />}
        onConnect={async () => { }}
        onDisconnect={async () => { }}
        initialConnected={false}
      />

      <PlatformCard
        name="Youtube"
        description="Coming soon"
        icon={<Youtube className="w-6 h-6 opacity-30" />}
        onConnect={async () => { }}
        onDisconnect={async () => { }}
        initialConnected={false}
      />
    </div>
  );
};

export default PlatformContent;
