
import { Outlet } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";

const Layout = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
