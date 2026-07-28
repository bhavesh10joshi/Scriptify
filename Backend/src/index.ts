import express from "express"
import cors from "cors"
import mongoose from "mongoose";
import UserRouter from "./Routers/User/UserRouter";
import ProductContentRouter from "./Routers/Product/ProductContent/ProductRouter";
import ProductHistoryRouter from "./Routers/Product/ProductHistory/ProductHistory";

const App = express();
App.use(express.json());
App.use(cors());

// Connecting various express api routers to one single express server
App.use("/Scriptify/Api/User" , UserRouter);
App.use("/Scriptify/Api/Product" , ProductHistoryRouter);
App.use("/Scriptify/Api/Product/Content" , ProductContentRouter);


main();
async function main()
{
    try{
        await mongoose.connect("");
        console.log("Connection to the Database was successfull !");
        App.listen(3000);
        return;
    }
    catch(e)
    {
        console.log("Connection with database was not successfull , Error recieved : " + e);
        return;
    }
}
