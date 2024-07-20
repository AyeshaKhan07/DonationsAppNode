import * as React from "react";
import * as ReactDOM from "react-dom/client";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SignIn from "./pages/auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn/>
  },
]);

export default router