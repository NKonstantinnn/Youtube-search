import { Request, Response, NextFunction, Handler } from 'express';
import { validationResult } from 'express-validator';

export default (validations): Handler => (
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            for(let validate of validations) {
                await validate.run(req);
            }
            const errors = validationResult(req);
            if (errors.isEmpty()) {
                return next();
            }
            res.status(422).json({ message: errors.array()[0].msg });
        }
        catch(err) {
            console.log(err);
        }
    }
);