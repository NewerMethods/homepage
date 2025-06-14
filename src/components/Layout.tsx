
import { Outlet } from "react-router-dom";
import { AppHeader } from "./AppHeader";

const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <AppHeader />
      <main className="flex-1 container py-4 md:py-8 lg:py-12">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
