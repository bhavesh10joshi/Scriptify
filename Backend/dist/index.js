"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const UserRouter_1 = __importDefault(require("./Routers/User/UserRouter"));
const ProductRouter_1 = __importDefault(require("./Routers/Product/ProductContent/ProductRouter"));
const ProductHistory_1 = __importDefault(require("./Routers/Product/ProductHistory/ProductHistory"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const envPath = path_1.default.resolve(process.cwd(), ".env");
dotenv_1.default.config({ path: envPath });
const App = (0, express_1.default)();
//Apply CORS before express.json() and route definitions
App.use(express_1.default.json());
App.use((0, cors_1.default)());
// Connecting various express api routers to one single express server
App.use("/Scriptify/Api/User", UserRouter_1.default);
App.use("/Scriptify/Api/Product", ProductHistory_1.default);
App.use("/Scriptify/Api/Product/Content", ProductRouter_1.default);
//Connect to DB and start the server
main();
async function main() {
    try {
        await mongoose_1.default.connect(process.env.MONGODB_URL);
        console.log("Connection to the Database was successful!");
        if (!process.env.VERCEL) {
            App.listen(process.env.PORT || 5000);
            console.log(`Server running on port ${process.env.PORT || 5000}`);
        }
    }
    catch (e) {
        console.log("Connection with database was not successful, Error received: " + e);
    }
}
exports.default = App;
//# sourceMappingURL=index.js.map