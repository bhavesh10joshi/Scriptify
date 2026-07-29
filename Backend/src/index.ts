import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import UserRouter from "./Routers/User/UserRouter";
import ProductContentRouter from "./Routers/Product/ProductContent/ProductRouter";
import ProductHistoryRouter from "./Routers/Product/ProductHistory/ProductHistory";
import dotenv from "dotenv";
import path from "path";

const envPath = path.resolve(process.cwd(), ".env");
dotenv.config({ path: envPath });

const App = express();

//Apply CORS before express.json() and route definitions
App.use(cors());
App.use(express.json());

// Connecting various express api routers to one single express server
App.use("/Scriptify/Api/User", UserRouter);
App.use("/Scriptify/Api/Product", ProductHistoryRouter);
App.use("/Scriptify/Api/Product/Content", ProductContentRouter);

//Connect to DB and start the server
main();
async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_URL as string);
    console.log("Connection to the Database was successful!");

    if (!process.env.VERCEL) {
      App.listen(process.env.PORT || 5000);
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    }
  } catch (e) {
    console.log("Connection with database was not successful, Error received: " + e);
  }
}

export default App;