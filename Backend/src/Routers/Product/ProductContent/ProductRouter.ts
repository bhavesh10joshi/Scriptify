import { Router } from "express";
import { ProductModel } from "../../../Db/Db";
import { Middleware } from "../../../Middleware/middleware";
import { generateAIContent } from "../../../Services/aiservices";
import { ClientErrorStatusCodes, ServerErrors, SuccessStatusCodes } from "../../../StatusCodes/Codes";
import { refineAIContent } from "../../../Services/aiservices";

const ProductContentRouter = Router();

// Api Endpoint to generate new product content 
ProductContentRouter.post("/Generate/New" , Middleware , async function(req:any , res:any)
{
    const { name, category, brandName, keyFeatures, targetAudience } = req.body;
    const UserId = req.UserId;

    if(!UserId)
    {
        res.status(ClientErrorStatusCodes.BadRequest).json({
            msg : "No userId Recieved !"
        });
        return;
    }

    try
    {
        const aiContent = await generateAIContent({
            name,
            category,
            brandName,
            keyFeatures,
            targetAudience,
        });

        const newProduct = await ProductModel.create({
            userId : UserId ,
            name,
            category,
            brandName,
            keyFeatures,
            targetAudience,
            ...aiContent,
            createdDate: new Date().toISOString(),
        });

        res.status(SuccessStatusCodes.ResourceCreated).json({
            msg : "Data was successfully created !" , 
            Data : newProduct
        });
        return;
    }
    catch(e)
    {
        res.status(ServerErrors.InternalServerError).json({
            msg : "Internal Server Error Occurred !"
        });
        return;
    }
});
// Api endpoint to modulate the existing generated content by ai using ai
ProductContentRouter.post("/Modulate" , Middleware , async function(req:any , res:any)
{
    const  productId  = req.body.productId;
    const  suggestion  = req.body.suggestion;
    const UserId = req.UserId;

    if(!UserId)
    {
        res.status(ClientErrorStatusCodes.BadRequest).json({
            msg : "No userId Recieved !"
        });
        return;
    }

    try
    {
        const existingProduct = await ProductModel.findOne({
            _id: productId,
            userId : UserId,
        });

        if(!existingProduct)
        {
            res.status(ClientErrorStatusCodes.ResourceNotFound).json({
                msg : "Incorrect ProductId Recieved ! "
            });
            return;
        }
        const updatedAIContent = await refineAIContent({
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

        res.status(SuccessStatusCodes.ResourceCreated).json({
            msg : "Data was successfully modulated !" , 
            Data : existingProduct
        });
        return;
    }
    catch(e)
    {
        res.status(ServerErrors.InternalServerError).json({
            msg : "Internal Server Error Occurred !"
        });
        return;
    }
});
// Api Endpoint for deleting a particular instance of Ai Content for particular product 
ProductContentRouter.post("/Delete" , Middleware , async function(req:any , res:any)
{
    const productId  = req.body.productId;

    try
    {
        const ContentDeleted = await ProductModel.deleteOne({
            _id : productId
        });

        if(!ContentDeleted)
        {
            res.status(ServerErrors.InternalServerError).json({
                msg : "Internal Server Error Occurred !"
            });
            return;
        }

        res.status(SuccessStatusCodes.ResourceCreated).json({
            msg : "Content was successfully Deleted !"
        });
        return;
    }
    catch(e)
    {
        res.status(ServerErrors.InternalServerError).json({
            msg : "Internal Server Error Occurred !"
        });
        return;
    }
});
export default ProductContentRouter;