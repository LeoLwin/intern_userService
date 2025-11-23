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
const mongoose_1 = __importDefault(require("mongoose"));
const blogModel_1 = require("../model/blogModel");
const responseStatus_1 = __importDefault(require("../helper/responseStatus"));
const countBlogs = () => __awaiter(void 0, void 0, void 0, function* () {
    return blogModel_1.Blog.countDocuments();
});
const findBlogs = (page, perPage) => __awaiter(void 0, void 0, void 0, function* () {
    return blogModel_1.Blog.find()
        .skip((page - 1) * perPage)
        .limit(perPage)
        .sort({ createdAt: -1 });
});
const creatBlog = (title, content, session) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = new blogModel_1.Blog({ title, content });
    return blog.save({ session });
});
const updateBlog = (id, title, content, session) => __awaiter(void 0, void 0, void 0, function* () {
    return blogModel_1.Blog.findByIdAndUpdate(id, { title, content }, { new: true, session });
});
const deleteBlog = (id, session) => __awaiter(void 0, void 0, void 0, function* () {
    return blogModel_1.Blog.findByIdAndDelete(id, { session });
});
const runInTransaction = (operations) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const result = yield operations(session);
        yield session.commitTransaction();
        session.endSession();
        return result;
    }
    catch (err) {
        yield session.abortTransaction();
        session.endSession();
        const errorMessage = err instanceof Error ? err.message : String(err);
        return responseStatus_1.default.UNKNOWN(errorMessage);
    }
});
exports.default = {
    countBlogs,
    findBlogs,
    creatBlog,
    updateBlog,
    deleteBlog,
    runInTransaction
};
