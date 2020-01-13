import {Request, Response, NextFunction} from 'express'; 

import BaseController from './BaseController';
import AuthController from './AuthContoller';
import UserController from './UserController';
import IPathRoute from '../interfaces/IPathRoute';

class AppController extends BaseController {

    constructor() {
        super();
    }

    private routeList: IPathRoute[] = [
        { path: '/auth', controller: new AuthController()} ,
        { path: '/user', controller: new UserController() }
    ];
    
    public init() {
        this.router.get('/test', (req: Request, res: Response, next: NextFunction) => {
            res.json({api: "test"});
        });

        for(const {path, controller} of this.routeList) {
            controller.init();
            this.router.use(`${path}`, controller.getRouter());
        }
    }
}

export default AppController;