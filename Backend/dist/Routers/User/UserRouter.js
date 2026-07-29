"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const Db_1 = require("../../Db/Db");
const zodValidations_1 = require("../../Validations/zodValidations");
const Codes_1 = require("../../StatusCodes/Codes");
const envPath = path_1.default.resolve(process.cwd(), ".env");
dotenv_1.default.config({ path: envPath });
const UserRouter = (0, express_1.Router)();
// Endpoint for Signing up into the application 
UserRouter.post("/SignUp", async function (req, res) {
    const name = req.body.name;
    const zodsafeObject = zodValidations_1.UserObject.safeParse(req.body);
    if (!zodsafeObject) {
        res.status(Codes_1.ServerErrors.InternalServerError).json({
            msg: "validations Failed/Wrong !"
        });
        return;
    }
    const SignUp = zodsafeObject.data;
    try {
        const HashedPassword = await bcrypt_1.default.hash(SignUp.Password, 5);
        if (HashedPassword) {
            try {
                const User = await Db_1.UserModel.create({
                    name: name,
                    email: SignUp.email,
                    password: HashedPassword
                });
                res.status(Codes_1.SuccessStatusCodes.ResourceCreated).json({
                    msg: "Signed Up Successfully !"
                });
                return;
            }
            catch (e) {
                console.log(e);
                res.status(Codes_1.ServerErrors.InternalServerError).json({
                    msg: "Internal Server Error Occured !"
                });
                return;
            }
        }
        else {
            res.status(Codes_1.ServerErrors.InternalServerError).json({
                msg: "Internal Server Error Occurred !"
            });
            return;
        }
    }
    catch (e) {
        console.log(e);
        res.status(Codes_1.ServerErrors.InternalServerError).json({
            msg: "Internal Server Error Occured !"
        });
        return;
    }
});
//API endpoint for Signing In into the application 
UserRouter.post("/Login", async function (req, res) {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const FindUser = await Db_1.UserModel.findOne({
            email: email
        });
        if (FindUser) {
            try {
                const Check = await bcrypt_1.default.compare(password, FindUser.password);
                if (Check) {
                    if (!process.env.JWT_PASS) {
                        return res.status(Codes_1.ServerErrors.InternalServerError).json({
                            msg: "Server configuration error: JWT_PASS is missing"
                        });
                    }
                    const token = jsonwebtoken_1.default.sign({
                        id: FindUser._id
                    }, process.env.JWT_PASS);
                    res.status(Codes_1.SuccessStatusCodes.Success).json({
                        token: token
                    });
                    return;
                }
                else {
                    res.status(Codes_1.ClientErrorStatusCodes.Unathorized).json({
                        msg: "Incorrect Password !"
                    });
                    return;
                }
            }
            catch (e) {
                console.log(e);
                res.status(Codes_1.ClientErrorStatusCodes.ResourceNotFound).json({
                    msg: "Account Dosen't Exists !"
                });
                return;
            }
        }
        else {
            res.status(Codes_1.ClientErrorStatusCodes.ResourceNotFound).json({
                msg: "Account Dosen't Exists !"
            });
            return;
        }
    }
    catch (e) {
        console.log(e);
        res.status(Codes_1.ClientErrorStatusCodes.ResourceNotFound).json({
            msg: "Account Dosen't Exists !"
        });
        return;
    }
});
exports.default = UserRouter;
//# sourceMappingURL=UserRouter.js.map