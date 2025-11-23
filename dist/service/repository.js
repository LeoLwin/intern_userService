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
Object.defineProperty(exports, "__esModule", { value: true });
// service/blog/blog.repository.ts
const blogModel_1 = require("../model/blogModel");
const countBlogs = () => __awaiter(void 0, void 0, void 0, function* () {
    return blogModel_1.Blog.countDocuments();
});
const findBlogs = (page, perPage) => __awaiter(void 0, void 0, void 0, function* () {
    return blogModel_1.Blog.find()
        .skip((page - 1) * perPage)
        .limit(perPage)
        .sort({ createdAt: -1 });
});
exports.default = {
    countBlogs,
    findBlogs
};
