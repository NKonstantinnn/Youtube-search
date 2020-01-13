"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseController_1 = __importDefault(require("./BaseController"));
const AuthContoller_1 = __importDefault(require("./AuthContoller"));
const UserController_1 = __importDefault(require("./UserController"));
class AppController extends BaseController_1.default {
    constructor() {
        super();
        this.routeList = [
            { path: '/auth', controller: new AuthContoller_1.default() },
            { path: '/user', controller: new UserController_1.default() }
        ];
    }
    init() {
        this.router.get('/test', (req, res, next) => {
            res.json({ api: "test" });
        });
        for (const { path, controller } of this.routeList) {
            controller.init();
            this.router.use(`${path}`, controller.getRouter());
        }
    }
}
exports.default = AppController;
