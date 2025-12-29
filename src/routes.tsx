import { createBrowserRouter } from "react-router";
import App from "./pages/App/App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: '*',
    element: <div>404 Not Found</div>,
  }
]);

export { router };