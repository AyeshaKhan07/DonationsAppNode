import { Router } from 'express';
import * as Express from "express";

/*
* Abstract classes are base classes from which other classes may be derived. 
* They may not be instantiated directly. Unlike an interface, an abstract 
* class may contain implementation details for its members. The abstract keyword 
* is used to define abstract classes as well as abstract methods within an abstract 
* class.
*/

abstract class Route {
    public route = Express.Router();
    
    constructor() {
        this.wrapControllers();
        this.initializeControllers(this.route);
    }

    abstract wrapControllers(): void
    abstract initializeControllers(route: Router): void
}

export default Route