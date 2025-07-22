// import { v4 as uuidv4 } from "uuid";
// import { ScheduledItem } from "../models/scheduledItem.js";
// import getDataUri from "../utils/dataUri.js";
// import cloudinary from "../utils/cloudinary.js";

// export const createScheduledItem = async (req, res) => {
//   try {
//     const { content, scheduledFor, platforms } = req.body;
//     const userId = req.id;

//     if (!content || !platforms || platforms.length === 0) {
//       return res
//         .status(400)
//         .json({ message: "Content and platforms are required" });
//     }

//     let cloudResponse = null; // ✅ define it here

//     const file = req.file;

//     if (file) {
//       const fileUri = getDataUri(file);
//       cloudResponse = await cloudinary.uploader.upload(fileUri.content);
//     }

//     // Save ScheduledItem
//     const scheduledItem = await ScheduledItem.create({
//       user: userId,
//       type: "post", // Always post (not tweet) when scheduling
//       content,
//       image: cloudResponse
//         ? {
//             public_id: cloudResponse.public_id,
//             url: cloudResponse.secure_url,
//           }
//         : undefined, // ✅ don't set image field if there's no image
//       platforms: JSON.parse(platforms), // platforms was sent as JSON string
//       scheduledFor,
//       status: "scheduled",
//       meta: {
//         taskId: uuidv4(),
//       },
//     });

//     res.status(201).json({
//       message: "Post scheduled successfully",
//       scheduledItem,
//       success: true,
//     });
//   } catch (error) {
//     console.error("Error scheduling post:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };



import { v4 as uuidv4 } from "uuid";
import cloudinary from "cloudinary";
import { ScheduledItem } from "../models/scheduledItem.js";
import getDataUri from "../utils/dataUri.js";

// POST /api/v1/schedule/create
export const createScheduledItem = async (req, res) => {
  try {
    const { content, scheduledFor, platforms } = req.body;
    const userId = req.id;

    if (!content || !platforms || platforms.length === 0) {
      return res.status(400).json({
        message: "Content and at least one platform are required",
      });
    }

    const file = req.file;
    let cloudResponse = null;

    if (file) {
      const fileUri = getDataUri(file);
      cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    }

    const parsedPlatforms = Array.isArray(platforms)
      ? platforms
      : JSON.parse(platforms);

    const scheduledItem = await ScheduledItem.create({
      user: userId,
      type: "post", // Always post for scheduled content
      content,
      image: cloudResponse
        ? {
            public_id: cloudResponse.public_id,
            url: cloudResponse.secure_url,
          }
        : undefined,
      platforms: parsedPlatforms,
      scheduledFor,
      status: "scheduled",
      meta: {
        taskId: uuidv4(),
      },
    });

    res.status(201).json({
      message: "Post scheduled successfully",
      scheduledItem,
      success: true,
    });
  } catch (error) {
    console.error("Error scheduling post:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const getAllScheduledPostOfUser = async(req,res) =>{
  try {
    const userId  = req.id;
    const scheduledItems = await ScheduledItem.find({user:userId})

    res.status(200).json({scheduledItems})
    
  } catch (error) {
    console.error("Error fetching scheduled posts:", error);
  }
}