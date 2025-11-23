import mongoose from "mongoose";
import { Blog } from "../model/blogModel";
import Response from "../helper/responseStatus";
const countBlogs = async () => {
    return Blog.countDocuments();
}

const findBlogs = async (page: number, perPage: number) => {
    return Blog.find()
        .skip((page - 1) * perPage)
        .limit(perPage)
        .sort({ createdAt: -1 });
}

const creatBlog = async (title: string, content: string, session?: mongoose.ClientSession) => {
    const blog = new Blog({ title, content });
    return blog.save({ session }); 
}


const updateBlog = async (id: string, title: string, content: string, session?: mongoose.ClientSession) => {
    return Blog.findByIdAndUpdate(id, { title, content }, { new: true, session });
}

const deleteBlog = async (id: string, session?: mongoose.ClientSession) => {
    return Blog.findByIdAndDelete(id, { session });
}


const runInTransaction = async (operations: (session: mongoose.ClientSession) => Promise<any>) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const result = await operations(session);
    await session.commitTransaction();
    session.endSession();
    return result;
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    const errorMessage = err instanceof Error ? err.message : String(err);
    return Response.UNKNOWN(errorMessage);
  }
};


export default  {
    countBlogs,
    findBlogs,
    creatBlog,
    updateBlog,
    deleteBlog,
    runInTransaction
}