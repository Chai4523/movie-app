import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import HeaderNav from "./components/header-nav/HeaderNav.jsx";
import Home from "./Home.jsx";

createRoot(document.getElementById("root")).render(
  <>
    <HeaderNav />
    <Home />
  </>
);
