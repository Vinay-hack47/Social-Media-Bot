// import mongoose from 'mongoose';
// import postToTwitter from '../utils/postToTwitter.js';
// import postToFacebook from '../utils/postToFacebook.js';
// import { ScheduledItem } from '../models/scheduledItem.js';

// // import postToInstagram from '../utils/postToInstagram.js'; // if supported

// export const runScheduler = async () => {
//   try {
//     const now = new Date();

//     // Fetch all scheduled items due for posting
//     const scheduledItems = await ScheduledItem.find({
//       scheduledFor: { $lte: now },
//       status: 'scheduled'
//     });

//     for (const item of scheduledItems) {
//       let allSuccess = true;
//       const responseMap = new Map();

//       for (const platform of item.platforms) {
//         try {
//           let result;

//           if (platform === 'twitter') {
//             result = await postToTwitter(item);
//           } else if (platform === 'facebook') {
//             result = await postToFacebook(item);
//           } else {
//             throw new Error(`Unsupported platform: ${platform}`);
//           }

//           responseMap.set(platform, { success: true, response: result });
//         } catch (err) {
//           console.error(`Failed to post to ${platform} for item ${item._id}:`, err.message);
//           allSuccess = false;
//           responseMap.set(platform, { success: false, error: err.message });
//         }
//       }

//       item.platformResponse = responseMap;
//       item.status = allSuccess ? 'posted' : 'failed';
//       item.postedAt = allSuccess ? new Date() : undefined;
//       await item.save();
//     }
//   } catch (error) {
//     console.error('Error in runScheduler:', error.message);
//   }
// };
