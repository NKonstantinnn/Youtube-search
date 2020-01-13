import express from 'express';
import {Express} from "express";
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';

import config from './config';
import AppController from './controllers/AppController';
import Passport from './middlewares/Passport';

/**
 * Main class of application
 */
export default class App {
    /**
     * App instanse
     */ 
    private static instance: App;
    /**
     * Express instance
     */ 
    private expApp: Express;


    private appController: AppController;

    /**
     * Create App instance if it does not exist yet
     * @return {App} App instance
     */
    public static getInstance(): App {
        if(!App.instance) {
            App.instance = new App();
        }
        return App.instance;
    }
    /**
     * App constructor
     * @constructor
     */
    constructor() {
        this.expApp = express();
        this.appController = new AppController();
    }

    /**
     * Initialize and run an application
     */
    public async run(): Promise<void> {

        this.expApp.use(cors());

        // serves the built version of your react app
        this.expApp.use(express.static(path.join(__dirname, '/client/build')))
        this.expApp.get('*', (req, res) => {
            res.sendFile(path.join(__dirname + '/client/build/index.html'))
        });

        // oportunity to get body of request as json type
        this.expApp.use(bodyParser.urlencoded({extended: false}));
        this.expApp.use(bodyParser.json());

        // Used Passport middlewares
        this.expApp.use(Passport.initialize());
        this.expApp.use(Passport.session());

        // API routing
        this.appController.init();
        this.expApp.use(`${config.apiPrefix}`, this.appController.getRouter());

         // connect database
        await mongoose.connect(config.databaseURL, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });

        // start server
        const port = process.env.PORT || config.port;
        this.expApp.listen(port, () => {
            console.log('Server is running on port ', port);
        });
    }
}