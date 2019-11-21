import express, {Express, Request, Response, NextFunction} from 'express';
import bodyParser from 'body-parser';

import config from './config';

const app: Express = express();

// oportunity to get body of request as json type
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.get('/api/test', (req: Request, res: Response, next: NextFunction): void => {
    res.json({'api': 'test'})
});

async function start(): Promise<void> {
    const port = config.port;
    app.listen(port, (err) => {
        if(err) {
            console.log(err); 
        }
        else {
            console.log('Server is runnning on port', port);
        }
    });
}

start();