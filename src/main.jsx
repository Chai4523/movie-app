import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router/router.jsx";

createRoot(document.getElementById("root")).render(
  <MantineProvider defaultColorScheme="dark">
    <RouterProvider router={router} />
  </MantineProvider>
);

// TODO: https://stackoverflow.com/questions/60813961/react-scroll-to-top-on-page-refresh-dont-restore-position/72478740#72478740
