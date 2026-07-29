"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
var ObjectId = mongoose_1.Schema.Types.ObjectId;
// Database Schema for storing the User related info
const UserSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
// Database Schema for the storing the product related information
const ProductSchema = new mongoose_1.Schema({
    userId: { type: ObjectId, required: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    brandName: { type: String, required: true },
    keyFeatures: { type: String, required: true },
    targetAudience: { type: String, required: true },
    // Ai generated Content info
    productDescription: { type: String },
    shortDescription: { type: String },
    keySellingPoints: { type: String },
    seoKeywords: { type: String },
    productTagline: { type: String },
    createdDate: { type: String }
});
// Exporting the Database Schema models
exports.UserModel = (0, mongoose_1.model)("User", UserSchema);
exports.ProductModel = (0, mongoose_1.model)("Product", ProductSchema);
//# sourceMappingURL=Db.js.map