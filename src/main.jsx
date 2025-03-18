import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import HeaderNav from "./Head.jsx";
import Home from "./Home.jsx";

createRoot(document.getElementById("root")).render(
  <>
    <HeaderNav />
    <Home />
  </>
);
