// service/blog/blog.repository.ts
import { Blog } from "../model/blogModel";
const countBlogs = async () => {
    return Blog.countDocuments();
}

const findBlogs = async (page: number, perPage: number) => {
    return Blog.find()
        .skip((page - 1) * perPage)
        .limit(perPage)
        .sort({ createdAt: -1 });
}


export default  {
    countBlogs,
    findBlogs
}