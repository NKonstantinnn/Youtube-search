import BaseController from '../controllers/BaseController';

/**
 * Declare path and route controller
 */
interface IPathRoute {
    path: string,
    controller: BaseController
};

export default IPathRoute;