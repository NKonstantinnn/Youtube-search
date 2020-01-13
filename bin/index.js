"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = __importDefault(require("./App"));
function startServer() {
    try {
        const app = App_1.default.getInstance();
        app.run();
    }
    catch (err) {
        console.log(err);
    }
}
startServer();
