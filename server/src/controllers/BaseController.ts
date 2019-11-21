import {Router} from 'express';

/**
 * Base class of route controllers
 */
abstract class BaseController {

    protected router: Router;

    constructor() {
        this.router = Router();
    }

    public abstract init();

    public getRouter(): Router {
        return this.router;
    }
}

export default BaseController;