import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/layout";
import ErrorPage from "../pages/errorPage/errorPage";
import Home from "../pages/homePage/Home";
import InfoPage from "../pages/infoPage/InfoPage";
import SearchPage from "../pages/searchPage/SearchPage";
import { homeLoader } from "./loader/homeLoader";
import { infoLoader } from "./loader/infoLoader";
import { GenreProvider } from "../contexts/GenreContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <GenreProvider>
            <Home />
          </GenreProvider>
        ),
        loader: homeLoader,
      },
      {
        path: ":mediaType/:id",
        element: <InfoPage />,
        loader: infoLoader,
      },
      {
        path: "search/:mediaType",
        element: (
          <GenreProvider>
            <SearchPage />
          </GenreProvider>
        ),
      },
    ],
  },
]);

export default router;
