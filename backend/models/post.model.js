// import mongoose from "mongoose";

// const postSchema =new  mongoose.Schema({
//   owner:{
//     type : mongoose.Schema.Types.ObjectId,
//     ref : "User"
//   },
//   title:{
//     type:String,
//     required:true
//   },
//   content:{
//     type:String,
//     required:true
//   },
//   image:{
//     url: String
//   },
//   caption:{
//     type: String,
//     required : true
//   },
//   scheduledAt:{
//     type:Date,
//     required: true
//   },
//   likes:[
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref : "User"
//     }
//   ],
//   posted :{
//     type:boolean,
//     default: false
//   }
// });

// export const Post = mongoose.model("Post", postSchema);

// import mongoose from "mongoose";

// const postSchema = new mongoose.Schema({
//   owner: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//   },
//   title: {
//     type: String,
//   },
//   content: {
//     type: String,
//   },
//   media: [
//     {
//       url: { type: String, required: true },
//       type: { type: String, enum: ["image", "video"], required: true },
//     },
//   ],
//   platforms: [
//     {
//       type: String,
//       enum: ["twitter", "facebook", "instagram", "snapchat"],

//     },
//   ],
//   scheduledAt: {
//     type: Date,
//   },
//   publishStatus: {
//     twitter: {
//       status: {
//         type: String,
//         enum: ["pending", "success", "failed"],
//         default: "pending",
//       },
//       timestamp: Date,
//     },
//     facebook: {
//       status: {
//         type: String,
//         enum: ["pending", "success", "failed"],
//         default: "pending",
//       },
//       timestamp: Date,
//     },
//     instagram: {
//       status: {
//         type: String,
//         enum: ["pending", "success", "failed"],
//         default: "pending",
//       },
//       timestamp: Date,
//     },
//     snapchat: {
//       status: {
//         type: String,
//         enum: ["pending", "success", "failed"],
//         default: "pending",
//       },
//       timestamp: Date,
//     },
//   },
//   likes: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//   ],
//   posted: {
//     type: Boolean,
//     default: false,
//   },
// });

// export const Post = mongoose.model("Post", postSchema);

import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  caption: {
    type: String,
  },
  image: {
    public_id: String,
    url: String,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  content:{
    type:String
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      comment:{
        type: String,
        required: true,
      }
    },
  ],
});

export const  Post = mongoose.model("Post", postSchema);
