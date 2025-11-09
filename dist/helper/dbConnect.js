"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
require("dotenv").config();
const uri = process.env.MONGO_URI; // your MongoDB Atlas URI
const connectToDatabase = async () => {
    try {
        await mongoose.connect(uri, {
            dbName: "user", // your database name
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB via Mongoose");
    }
    catch (error) {
        console.error(" MongoDB connection error:", error);
        throw error;
    }
};
module.exports = connectToDatabase;
//# sourceMappingURL=dbConnect.js.map