// import mongoose from "mongoose";

// export const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI,{
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     })
//     console.log("MongoDB connected successfully");
    
//   } catch (error) {
//     console.error(error);
//   }
// };

// // export default connectDB


// db/connectDB.js
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1); // Exit process if DB connection fails
  }
};
