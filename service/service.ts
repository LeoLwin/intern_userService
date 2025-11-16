import Moleculer from "moleculer";
import { Blog } from "../model/blogModel";
import Response from "../helper/responseStatus";
import { createType, updateType } from "../type/type";

const blogService: Moleculer.ServiceSchema = {
  name: "blog",
  actions: {
    // List all blogs
    list: {
      async handler(ctx: Moleculer.Context<{}>) {
        try {
          const blogs = await Blog.find(); 
          return Response.OK(blogs, "Blogs fetched successfully",);
        } catch (error: any) {
          console.error("Error fetching blogs:", error.message);
          return Response.UNKNOWN(error.message);
        }
      },
    },

    // Get single blog
    get: {
      params: {
        id: "string",
      },
      async handler(ctx: Moleculer.Context<createType>) {
        try {
          const { id } = ctx.params;
          
           if(!id){
            return Response.INVALID_ARGUMENT("ID parameter is required");
           }

          const blog = await Blog.findById(id);

          if (!blog) {
            return Response.NOT_FOUND("Blog not found");
          }

          return Response.OK(blog, "Blog fetched successfully");
        } catch (error: any) {
          console.error("Error fetching blog:", error.message);
          return Response.UNKNOWN(error.message);
        }
      },
    },

    // Create a new blog
    create: {
      params: {
        title: "string",
        content: "string",
      },
      async handler(
        ctx: Moleculer.Context<updateType>
      ) {
        const { title, content } = ctx.params;
        console.log("Params : ", { title, content });
        try {
          const blog = new Blog({ title, content });
          await blog.save();
          return { message: "Blog created", blog };
        } catch (error: any) {
          console.error("Error creating blog:", error.message);
          return { message: "Error creating blog", error: error.message };
        }
      },
    },

    // Update a blog
    update: {
      params: {
        id: "string",
        title: { type: "string", optional: true },
        content: { type: "string", optional: true },
      },
      async handler(
        ctx: Moleculer.Context<{ id: string; title?: string; content?: string }>
      ) {
        try {
          const { id, ...updates } = ctx.params;

          const blog = await Blog.findByIdAndUpdate(id, updates, { new: true });

          if (!blog) {
            return Response.NOT_FOUND("Blog not found");
          }

          return Response.OK(blog, "Blog updated successfully");
        } catch (error: any) {
          console.error("Error updating blog:", error.message);
          return Response.UNKNOWN(error.message);
        }
      },
    },

    // Delete a blog
    delete: {
      params: {
        id: "string",
      },
      async handler(ctx: Moleculer.Context<{ id: string }>) {
        try {
          const { id } = ctx.params;

          const blog = await Blog.findByIdAndDelete(id);

          if (!blog) {
            return Response.NOT_FOUND("Blog not found");
          }

          return Response.OK(blog, "Blog deleted successfully");
        } catch (error: any) {
          console.error("Error deleting blog:", error.message);
          return Response.UNKNOWN(error.message);
        }
      },
    },
  },
};

export default  blogService;
