import Moleculer from "moleculer";
import { Blog } from "../model/blogModel";
import Response from "../helper/responseStatus";
import { createType, listType, updateType } from "../type/type";

const blogService: Moleculer.ServiceSchema = {
  name: "blog",
  actions: {
    // List all blogs
    list: {
      params: {
        current: "number",
        limit: "number",
      },
      async handler(ctx: Moleculer.Context<listType>) {
        try {
          const { current = 1, limit = 10 } = ctx.params;
          console.log("List Params : ", { current, limit });

          const page = Math.max(Number(current), 1);
          const perPage = Math.max(Number(limit), 1);

          const total = await Blog.countDocuments();
          console.log("Total Blogs:", total);
          if(total === 0){
            return Response.NOT_FOUND("No blogs found");
          }

          const listResult = await Blog.find()
            .skip((page - 1) * perPage)
            .limit(perPage)
            .sort({ createdAt: -1 });

          const data = {
            by: listResult,
            pagination: {
              current: page,
              limit: perPage,
              rowsPerPage: Math.ceil(total / perPage),
              total,
            },
          };


          // const blogs = await Blog.find();
          return Response.OK(data, "Blogs fetched successfully",);
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

          if (!id) {
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

export default blogService;
