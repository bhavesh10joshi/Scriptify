"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Db_1 = require("../../../Db/Db");
const middleware_1 = require("../../../Middleware/middleware");
const Codes_1 = require("../../../StatusCodes/Codes");
const ProductHistoryRouter = (0, express_1.Router)();
// Api Endpoint to retrieve the creation history of the registered user in the application
ProductHistoryRouter.post("/History", middleware_1.Middleware, async function (req, res) {
    const UserId = req.UserId;
    try {
        const history = await Db_1.ProductModel.find({
            userId: UserId
        });
        if (history) {
            res.status(Codes_1.SuccessStatusCodes.Success).json({
                Data: history
            });
            return;
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
            msg: "Internal Server Error Occurred !"
        });
        return;
    }
});
// Api Endpoint to retrieve a particular creation history and view it !
ProductHistoryRouter.post("/History/Content/Old/View", middleware_1.Middleware, async function (req, res) {
    const ContentId = req.body.ContentId;
    if (!ContentId) {
        res.status(Codes_1.ClientErrorStatusCodes.BadRequest).json({
            msg: "The Id of the Content was not provided by the user ."
        });
        return;
    }
    try {
        const Data = await Db_1.ProductModel.findOne({
            _id: ContentId
        });
        if (!Data) {
            res.status(Codes_1.ServerErrors.InternalServerError).json({
                msg: "Internal Server Error Occurred !"
            });
            return;
        }
        res.status(Codes_1.SuccessStatusCodes.Success).json({
            Data: Data
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
exports.default = ProductHistoryRouter;
//# sourceMappingURL=ProductHistory.js.map