
import { Router } from 'express';
 
interface Route {
  route: Router;
  wrapControllers: Function;
  initializeControllers: Function;
}
 
export default Route;