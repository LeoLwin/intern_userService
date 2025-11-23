"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const blogModel_1 = require("../model/blogModel");
const responseStatus_1 = __importDefault(require("../helper/responseStatus"));
const logic_1 = require("./logic");
const blogService = {
    name: "blog",
    actions: {
        // List all blogs
        list: {
            params: {
                current: "number",
                limit: "number",
            },
            handler(ctx) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        // const { current = 1, limit = 10 } = ctx.params;
                        const { current, limit } = ctx.params;
                        console.log("List Params : ", { current, limit });
                        return yield (0, logic_1.listBlogs)(current, limit);
                        // const page = Math.max(Number(current), 1);
                        // const perPage = Math.max(Number(limit), 1);
                        // const total = await Blog.countDocuments();
                        // console.log("Total Blogs:", total);
                        // if(total === 0){
                        //   return Response.NOT_FOUND("No blogs found");
                        // }
                        // const listResult = await Blog.find()
                        //   .skip((page - 1) * perPage)
                        //   .limit(perPage)
                        //   .sort({ createdAt: -1 });
                        // const data = {
                        //   by: listResult,
                        //   pagination: {
                        //     current: page,
                        //     limit: perPage,
                        //     rowsPerPage: Math.ceil(total / perPage),
                        //     total,
                        //   },
                        // };
                        // // const blogs = await Blog.find();
                        // return Response.OK(data, "Blogs fetched successfully",);
                    }
                    catch (error) {
                        console.error("Error fetching blogs:", error.message);
                        return responseStatus_1.default.UNKNOWN(error.message);
                    }
                });
            },
        },
        // Get single blog
        get: {
            params: {
                id: "string",
            },
            handler(ctx) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const { id } = ctx.params;
                        if (!id) {
                            return responseStatus_1.default.INVALID_ARGUMENT("ID parameter is required");
                        }
                        const blog = yield blogModel_1.Blog.findById(id);
                        if (!blog) {
                            return responseStatus_1.default.NOT_FOUND("Blog not found");
                        }
                        return responseStatus_1.default.OK(blog, "Blog fetched successfully");
                    }
                    catch (error) {
                        console.error("Error fetching blog:", error.message);
                        return responseStatus_1.default.UNKNOWN(error.message);
                    }
                });
            },
        },
        // Create a new blog
        create: {
            params: {
                title: "string",
                content: "string",
            },
            handler(ctx) {
                return __awaiter(this, void 0, void 0, function* () {
                    const { title, content } = ctx.params;
                    console.log("Params : ", { title, content });
                    try {
                        const blog = new blogModel_1.Blog({ title, content });
                        yield blog.save();
                        return { message: "Blog created", blog };
                    }
                    catch (error) {
                        console.error("Error creating blog:", error.message);
                        return { message: "Error creating blog", error: error.message };
                    }
                });
            },
        },
        // Update a blog
        update: {
            params: {
                id: "string",
                title: { type: "string", optional: true },
                content: { type: "string", optional: true },
            },
            handler(ctx) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const _a = ctx.params, { id } = _a, updates = __rest(_a, ["id"]);
                        const blog = yield blogModel_1.Blog.findByIdAndUpdate(id, updates, { new: true });
                        if (!blog) {
                            return responseStatus_1.default.NOT_FOUND("Blog not found");
                        }
                        return responseStatus_1.default.OK(blog, "Blog updated successfully");
                    }
                    catch (error) {
                        console.error("Error updating blog:", error.message);
                        return responseStatus_1.default.UNKNOWN(error.message);
                    }
                });
            },
        },
        // Delete a blog
        delete: {
            params: {
                id: "string",
            },
            handler(ctx) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const { id } = ctx.params;
                        const blog = yield blogModel_1.Blog.findByIdAndDelete(id);
                        if (!blog) {
                            return responseStatus_1.default.NOT_FOUND("Blog not found");
                        }
                        return responseStatus_1.default.OK(blog, "Blog deleted successfully");
                    }
                    catch (error) {
                        console.error("Error deleting blog:", error.message);
                        return responseStatus_1.default.UNKNOWN(error.message);
                    }
                });
            },
        },
    },
};
exports.default = blogService;
