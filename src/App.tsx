
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import CV from "./pages/CV";
import Substack from "./pages/Substack";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const RedirectHandler = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const redirectPath = sessionStorage.getItem('redirectPath');
    if (redirectPath) {
      sessionStorage.removeItem('redirectPath');
      // Vite's base URL, e.g., /homepage/
      const basePath = import.meta.env.BASE_URL;
      let navigateTo = redirectPath;

      // If the redirectPath starts with the base path, strip it
      // so react-router can handle the relative path correctly.
      if (navigateTo.startsWith(basePath)) {
        // e.g. /homepage/cv -> /cv
        navigateTo = navigateTo.substring(basePath.length -1);
      }

      // Ensure navigateTo is not empty and not just the root
      if (navigateTo && navigateTo !== '/') {
        navigate(navigateTo, { replace: true });
      }
    }
  }, [navigate]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <RedirectHandler />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/cv" element={<CV />} />
            <Route path="/substack" element={<Substack />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
