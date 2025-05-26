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
