import {
  createBrowserRouter,
} from "react-router-dom";
import SignIn from "./pages/auth";
import Home from "./pages/home";
import { StorageService } from "./services/local-storage.service";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: !StorageService.getAuthToken() ? <SignIn/> : <Home />
  },
]);

export default router