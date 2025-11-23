// service/blog/blog.logic.ts
import repo from "./repository";
import Response from "../helper/responseStatus";
export async function listBlogs(current = 1, limit = 10) {
  const page = Math.max(Number(current), 1);
  const perPage = Math.max(Number(limit), 1);

  const total = await repo.countBlogs();
  if (total === 0) {
    return Response.NOT_FOUND("No blogs found");
  }

  const blogs = await repo.findBlogs(page, perPage);

  const data = {
    by: blogs,
    pagination: {
      current: page,
      limit: perPage,
      rowsPerPage: Math.ceil(total / perPage),
      total,
    },
  };

  return Response.OK(data, "Blogs fetched successfully");
}
