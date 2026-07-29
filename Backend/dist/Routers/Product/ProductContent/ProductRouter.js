"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Db_1 = require("../../../Db/Db");
const middleware_1 = require("../../../Middleware/middleware");
const aiservices_1 = require("../../../Services/aiservices");
const Codes_1 = require("../../../StatusCodes/Codes");
const aiservices_2 = require("../../../Services/aiservices");
const ProductContentRouter = (0, express_1.Router)();
// Api Endpoint to generate new product content 
ProductContentRouter.post("/Generate/New", middleware_1.Middleware, async function (req, res) {
    const { name, category, brandName, keyFeatures, targetAudience } = req.body;
    const UserId = req.UserId;
    if (!UserId) {
        res.status(Codes_1.ClientErrorStatusCodes.BadRequest).json({
            msg: "No userId Recieved !"
        });
        return;
    }
    try {
        const aiContent = await (0, aiservices_1.generateAIContent)({
            name,
            category,
            brandName,
            keyFeatures,
            targetAudience,
        });
        const newProduct = await Db_1.ProductModel.create({
            userId: UserId,
            name,
            category,
            brandName,
            keyFeatures,
            targetAudience,
            ...aiContent,
            createdDate: new Date().toISOString(),
        });
        res.status(Codes_1.SuccessStatusCodes.ResourceCreated).json({
            msg: "Data was successfully created !",
            Data: newProduct
        });
        return;
    }
    catch (e) {
        console.log(e);
        res.status(Codes_1.ServerErrors.InternalServerError).json({
            msg: "Internal Server Error Occurred !"
        });
        return;
    }
});
// Api endpoint to modulate the existing generated content by ai using ai
ProductContentRouter.post("/Modulate", middleware_1.Middleware, async function (req, res) {
    const productId = req.body.productId;
    const suggestion = req.body.suggestion;
    const UserId = req.UserId;
    if (!UserId) {
        res.status(Codes_1.ClientErrorStatusCodes.BadRequest).json({
            msg: "No userId Recieved !"
        });
        return;
    }
    try {
        const existingProduct = await Db_1.ProductModel.findOne({
            _id: productId,
            userId: UserId,
        });
        if (!existingProduct) {
            res.status(Codes_1.ClientErrorStatusCodes.ResourceNotFound).json({
                msg: "Incorrect ProductId Recieved ! "
            });
            return;
        }
        const updatedAIContent = await (0, aiservices_2.refineAIContent)({
            existingContent: {
                name: existingProduct.name,
                category: existingProduct.category,
                brandName: existingProduct.brandName,
                keyFeatures: existingProduct.keyFeatures,
                targetAudience: existingProduct.targetAudience,
                productDescription: existingProduct.productDescription || "",
                shortDescription: existingProduct.shortDescription || "",
                keySellingPoints: existingProduct.keySellingPoints || "",
                seoKeywords: existingProduct.seoKeywords || "",
                productTagline: existingProduct.productTagline || "",
            },
            suggestion,
        });
        Object.assign(existingProduct, updatedAIContent);
        await existingProduct.save();
        res.status(Codes_1.SuccessStatusCodes.ResourceCreated).json({
            msg: "Data was successfully modulated !",
            Data: existingProduct
        });
        return;
    }
    catch (e) {
        res.status(Codes_1.ServerErrors.InternalServerError).json({
            msg: "Internal Server Error Occurred !"
        });
        return;
    }
});
// Api Endpoint for deleting a particular instance of Ai Content for particular product 
ProductContentRouter.post("/Delete", middleware_1.Middleware, async function (req, res) {
    const productId = req.body.productId;
    try {
        const ContentDeleted = await Db_1.ProductModel.deleteOne({
            _id: productId
        });
        if (!ContentDeleted) {
            res.status(Codes_1.ServerErrors.InternalServerError).json({
                msg: "Internal Server Error Occurred !"
            });
            return;
        }
        res.status(Codes_1.SuccessStatusCodes.ResourceCreated).json({
            msg: "Content was successfully Deleted !"
        });
        return;
    }
    catch (e) {
        res.status(Codes_1.ServerErrors.InternalServerError).json({
            msg: "Internal Server Error Occurred !"
        });
        return;
    }
});
exports.default = ProductContentRouter;
//# sourceMappingURL=ProductRouter.js.map