import jwt from "jsonwebtoken";
import { ClientErrorStatusCodes , ServerErrors } from "../StatusCodes/Codes";

export function Middleware(req:any,res:any,next:any)
{
    try {
        const token = req.headers["authorization"];
        if (!token) {
            return res.status(ClientErrorStatusCodes.Unathorized).json({ msg: "No token provided!" });
        }
        
        if (!process.env.JWT_PASS) {
            console.error("JWT_PASS environment variable is missing!");
            return res.status(ServerErrors.InternalServerError).json({ msg: "Server configuration error." });
        }

        const check:any = jwt.verify(token, process.env.JWT_PASS as string);
        
        if(check) {
            req.UserId = check.id;
            next();
        } else {
            return res.status(ClientErrorStatusCodes.Unathorized).json({
                msg : "Incorrect Token Recieved !"
            });
        }
    } catch (err) {
        return res.status(ClientErrorStatusCodes.Unathorized).json({
            msg : "Invalid or expired token!"
        });
    }
}