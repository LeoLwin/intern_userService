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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// service/blog/blog.logic.ts
const repository_1 = __importDefault(require("./repository"));
const responseStatus_1 = __importDefault(require("../helper/responseStatus"));
const listBlogs = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (current = 1, limit = 10) {
    const page = Math.max(Number(current), 1);
    const perPage = Math.max(Number(limit), 1);
    const total = yield repository_1.default.countBlogs();
    if (total === 0) {
        return responseStatus_1.default.NOT_FOUND("No blogs found");
    }
    const blogs = yield repository_1.default.findBlogs(page, perPage);
    const data = {
        by: blogs,
        pagination: {
            current: page,
            limit: perPage,
            rowsPerPage: Math.ceil(total / perPage),
            total,
        },
    };
    return responseStatus_1.default.OK(data, "Blogs fetched successfully");
});
const createBlog = (title, content) => __awaiter(void 0, void 0, void 0, function* () {
    return repository_1.default.runInTransaction((session) => __awaiter(void 0, void 0, void 0, function* () {
        const blog = yield repository_1.default.creatBlog(title, content);
        console.log("Created Blog :", blog);
        if (!blog || !blog._id) {
            return responseStatus_1.default.NOT_IMPLEMENTED("Blog could not be created");
        }
        return responseStatus_1.default.OK(blog, "Blog created successfully");
    }));
});
exports.default = {
    listBlogs,
    createBlog
};
