"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Middleware = Middleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Codes_1 = require("../StatusCodes/Codes");
function Middleware(req, res, next) {
    try {
        const token = req.headers["authorization"];
        if (!token) {
            return res.status(Codes_1.ClientErrorStatusCodes.Unathorized).json({ msg: "No token provided!" });
        }
        if (!process.env.JWT_PASS) {
            console.error("JWT_PASS environment variable is missing!");
            return res.status(Codes_1.ServerErrors.InternalServerError).json({ msg: "Server configuration error." });
        }
        const check = jsonwebtoken_1.default.verify(token, process.env.JWT_PASS);
        if (check) {
            req.UserId = check.id;
            next();
        }
        else {
            return res.status(Codes_1.ClientErrorStatusCodes.Unathorized).json({
                msg: "Incorrect Token Recieved !"
            });
        }
    }
    catch (err) {
        return res.status(Codes_1.ClientErrorStatusCodes.Unathorized).json({
            msg: "Invalid or expired token!"
        });
    }
}
//# sourceMappingURL=middleware.js.map