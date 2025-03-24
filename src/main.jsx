import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import HeaderNav from "./components/header-nav/HeaderNav.jsx";
import Home from "./Home.jsx";
import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';


createRoot(document.getElementById("root")).render(
  <MantineProvider>
    <HeaderNav />
    <Home />
  </MantineProvider>
);
