import express from "express"
import cors from "cors"
import mongoose from "mongoose";
import UserRouter from "./Routers/User/UserRouter";
import ProductContentRouter from "./Routers/Product/ProductContent/ProductRouter";
import ProductHistoryRouter from "./Routers/Product/ProductHistory/ProductHistory";
import dotenv from "dotenv";
import path from "path";

const envPath = path.resolve(process.cwd(), ".env");
dotenv.config({ path: envPath });

const App = express();
App.use(express.json());
App.use(cors());

// Connecting various express api routers to one single express server
App.use("/Scriptify/Api/User" , UserRouter);
App.use("/Scriptify/Api/Product" , ProductHistoryRouter);
App.use("/Scriptify/Api/Product/Content" , ProductContentRouter);

// Connect to DB and start the server
main();
async function main()
{
    try{
        await mongoose.connect(process.env.MONGODB_URL as string);
        console.log("Connection to the Database was successfull !");

        // process.env.VERCEL is automatically set to "1" by Vercel at runtime.
        // We skip App.listen() there because Vercel is serverless and manages
        // the HTTP layer itself. Locally we still need to listen on a port.
        if (!process.env.VERCEL) {
            App.listen(process.env.PORT || 5000);
            console.log(`Server running on port ${process.env.PORT || 5000}`);
        }

        return;
    }
    catch(e)
    {
        console.log("Connection with database was not successfull , Error recieved : " + e);
        return;
    }
}

// Export the Express app as default so Vercel can use it as a serverless handler
export default App;

