import * as express from 'express';
import { establishConnection } from './database';

class App {
    public app: express.Application;
    public port: number;

    constructor(routers, middlewares, port: number) {
        this.app = express();
        this.port = port;

        establishConnection();
        this.initalizeMiddleware(middlewares);
        this.initializeRoutes(routers);
    }

    private initalizeMiddleware(middlewares) {
        this.app.use(middlewares)
    }

    private initializeRoutes(routers) {
        routers.forEach(router => {
            this.app.use('/api', router.route)
        });
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}

export default App;