import { Router } from "express";
import {z} from "zod" ;
import jwt from "jsonwebtoken" ;
import bcrypt from "bcrypt" 
import { UserModel } from "../../Db/Db";


const JWT_TOKEN = "SomeRandomToken" ;

const UserRouter = Router();

UserRouter.post("/SignUp" , async function(req:any , res:any)
{
    
});

export default UserRouter;