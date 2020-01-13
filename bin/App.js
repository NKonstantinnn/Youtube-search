"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const config_1 = __importDefault(require("./config"));
const AppController_1 = __importDefault(require("./controllers/AppController"));
const Passport_1 = __importDefault(require("./middlewares/Passport"));
class App {
    constructor() {
        this.expApp = express_1.default();
        this.appController = new AppController_1.default();
    }
    static getInstance() {
        if (!App.instance) {
            App.instance = new App();
        }
        return App.instance;
    }
    async run() {
        this.expApp.use(cors_1.default());
        this.expApp.use(express_1.default.static(path_1.default.join(__dirname, '/client/build')));
        this.expApp.get('*', (req, res) => {
            res.sendFile(path_1.default.join(__dirname + '/client/build/index.html'));
        });
        this.expApp.use(body_parser_1.default.urlencoded({ extended: false }));
        this.expApp.use(body_parser_1.default.json());
        this.expApp.use(Passport_1.default.initialize());
        this.expApp.use(Passport_1.default.session());
        this.appController.init();
        this.expApp.use(`${config_1.default.apiPrefix}`, this.appController.getRouter());
        await mongoose_1.default.connect(config_1.default.databaseURL, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });
        const port = process.env.PORT || config_1.default.port;
        this.expApp.listen(port, () => {
            console.log('Server is running on port ', port);
        });
    }
}
exports.default = App;
