import { Router } from "express";
import { ProductModel } from "../../../Db/Db";
import { Middleware } from "../../../Middleware/middleware";
import { SuccessStatusCodes , ServerErrors , ClientErrorStatusCodes} from "../../../StatusCodes/Codes";

const ProductHistoryRouter = Router();

// Api Endpoint to retrieve the creation history of the registered user in the application
ProductHistoryRouter.post("/History" , Middleware , async function(req:any , res:any){
    const UserId:any = req.UserId;

    try{
        const history:any = ProductModel.find({
            userId : UserId
        });
        
        if(history)
        {
            res.status(SuccessStatusCodes).json({
                Data : history 
            });
            return;
        }
        else
        {
            res.status(ServerErrors.InternalServerError).json({
                msg : "Internal Server Error Occurred !"
            });
            return;
        }
    }
    catch(e)
    {
        res.status(ServerErrors.InternalServerError).json({
            msg : "Internal Server Error Occurred !"
        });
        return;
    }
});

// Api Endpoint to retrieve a particular creation history and view it !
ProductHistoryRouter.post("/History/Content/Old/View" , Middleware , async function(req:any , res:any){
    const ContentId:any = req.body.ContentId; 

    if(!ContentId)
    {
        res.status(ClientErrorStatusCodes.BadRequest).json({
            msg : "The Id of the Content was not provided by the user ."
        });
        return;
    }

    try{
        const Data:any = await ProductModel.findOne({
            _id : ContentId
        });

        if(!Data)
        {
            res.status(ServerErrors.InternalServerError).json({
                msg : "Internal Server Error Occurred !"
            });
            return;
        }

        res.status(SuccessStatusCodes.Success).json({
            Data : Data 
        });
        return ;
    }
    catch(e)
    {
        res.status(ServerErrors.InternalServerError).json({
            msg : "Internal Server Error Occurred !"
        });
        return;
    }
});

export default ProductHistoryRouter;