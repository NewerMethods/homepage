
import { Outlet } from "react-router-dom";
import { AppHeader } from "./AppHeader";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <AppHeader />
      <main className="flex-1 container py-4 md:py-8 lg:py-12">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
