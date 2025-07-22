// // This is a mock service. Replace with real Twitter API integration later.
// export const twitterAPI = {
//   post: async ({ content, media, user }) => {
//     // Simulate API delay
//     await new Promise(res => setTimeout(res, 500));
//     return { success: true, tweetId: "mockTweetId123", postedAt: new Date() };
//   },
//   like: async ({ tweetId, user }) => {
//     await new Promise(res => setTimeout(res, 200));
//     return { success: true };
//   },
//   comment: async ({ tweetId, comment, user }) => {
//     await new Promise(res => setTimeout(res, 200));
//     return { success: true, commentId: "mockCommentId123" };
//   },
//   follow: async ({ targetUserId, user }) => {
//     await new Promise(res => setTimeout(res, 200));
//     return { success: true };
//   },
//   unfollow: async ({ targetUserId, user }) => {
//     await new Promise(res => setTimeout(res, 200));
//     return { success: true };
//   }
// };