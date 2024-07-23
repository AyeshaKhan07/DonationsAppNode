import {
  createBrowserRouter,
} from "react-router-dom";
import SignIn from "./pages/auth";
import Home from "./pages/home";
import { StorageService } from "./services/local-storage.service";
import { WEB_URLS } from "./constants";

const router = createBrowserRouter([
  {
    path: WEB_URLS.HOME,
    element: <Home />
  },
  {
    path: "/login",
    element: !StorageService.getAuthToken() ? <SignIn/> : <Home />
  },
]);

export default router