import { createBrowserRouter } from "react-router";
import App from "./pages/App/App";
import Loading from "./pages/App/Loading";
import { loaderApp } from "./pages/App/loader";

const router = createBrowserRouter([
  {
    path: "/",
    HydrateFallback: Loading,
    loader: loaderApp,
    element: <App />,
  },
  {
    path: '*',
    element: <div>404 Not Found</div>,
  }
]);

export { router };