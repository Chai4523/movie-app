import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import HeaderNav from "./components/header-nav/HeaderNav.jsx";
import Home from "./pages/homePage/Home.jsx";
import InfoPage from "./pages/infoPage/InfoPage.jsx";
import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';


createRoot(document.getElementById("root")).render(
  <MantineProvider defaultColorScheme="dark">
    <HeaderNav />
    {/* <Home /> */}
    <InfoPage />
  </MantineProvider>
);
