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


export const getAllScheduledPostOfUser = async (req, res) => {
  try {
    const userId = req.id;

    const scheduledItems = await ScheduledItem.find({ user: userId }).populate({
          path: "user"
        });

    if (!scheduledItems.length) {
      return res.status(200).json({
        message: "No scheduled posts found for the user.",
        scheduledItems: [],
        success: true,
      });
    }

    return res.status(200).json({
      message: "Scheduled posts of user",
      scheduledItems,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching scheduled posts:", error);
    return res.status(500).json({
      message: "Failed to fetch scheduled posts",
      error: error.message,
      success: false,
    });
  }
};
