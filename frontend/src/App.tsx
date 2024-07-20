import { RouterProvider } from "react-router-dom";
import Layout from "./components/layout.component";
import router from "./router";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";

export default function App() {
  return <ThemeProvider theme={theme}>
    <Layout>
      <RouterProvider router={router} />
    </Layout>
  </ThemeProvider>
}
