import { Outlet } from 'react-router-dom';
import HeaderNav from '../header-nav/HeaderNav';

export default function Layout() {
  return (
    <>
      <HeaderNav />
      <main>
        <Outlet />
      </main>
    </>
  );
}
