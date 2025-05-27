import { Outlet } from "react-router-dom";
import HeaderNav from "../header-nav/HeaderNav";
import useScrollToTop from "../../hooks/scrollToTop";

export default function Layout() {
  useScrollToTop();
  return (
    <>
      <HeaderNav />
      <main>
        <Outlet />
      </main>
    </>
  );
}
