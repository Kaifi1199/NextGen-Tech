import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema(
  {
    title: {
      type: String,
    },
    shortDescription : {
      type:String,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    status : {
      type : String,
      default : 'inactive',
    },
    views : {
      type : Number,
      default : 0
    }
  },
  {
    timestamps: true,
  }
);

const blogs = mongoose?.models?.blogs || mongoose?.model("blogs", blogSchema);
export default blogs;
