import * as express from "express"
import * as cors from 'cors';
import Route from './abstracts/router.abstract';
import { establishConnection } from './database';

class App {
    public app: express.Application;
    public port: number;

    constructor(routers: Route[], middlewares: any[], port: number) {
        this.app = express();
        this.port = port;

        establishConnection();
        this.initializeCors();
        this.initalizeMiddleware(middlewares);
        this.initializeRoutes(routers);
    }

    private initializeCors() {
        const corsOptions = {origin: 'http://localhost:5173'}
        this.app.use(cors(corsOptions))
    }

    private initalizeMiddleware(middlewares: any[]) {
        this.app.use(middlewares)
    }

    private initializeRoutes(routers: Route[]) {
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