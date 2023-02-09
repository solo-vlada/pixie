import { createBrowserRouter, RouterProvider } from "react-router-dom";
//Pages
import Root from "./layouts/Root";
import ErrorPage from "./pages/ErrorPage";
import Homepage from "./pages/Homepage";
import Information from "./pages/Information";

const router = createBrowserRouter([
  {
    path: "/v2",
    element: <Root />,
    children: [
      { path: "/v2", element: <Homepage /> },
      {
        path: "brand?/:brand?/scale?/:scale?/scheme?/",
        element: <Information />,
        children: [
          { path: "public?/:scheme?", element: <Information /> },
          { path: "central?/:scheme?", element: <Information /> },
        ],
      },
    ],
  },
  {
    path: "*",
    element: (
      <>
        <Root />
        <ErrorPage />
      </>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
