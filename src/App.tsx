
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
import NotFound from "./pages/NotFound";
import Reports from "./pages/Reports";
import ReportPage from "./pages/reports/ReportPage";
import Blog from "./pages/Blog";
import PostPage from "./pages/blog/PostPage";

const queryClient = new QueryClient();

const RedirectHandler = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const redirectPath = sessionStorage.getItem('redirectPath');
    if (redirectPath) {
      sessionStorage.removeItem('redirectPath');
      const basePath = import.meta.env.BASE_URL; // e.g., /homepage/

      if (redirectPath.startsWith(basePath)) {
        // Get the path part after the base path.
        // e.g., for '/homepage/cv', this results in 'cv'
        const relativePath = redirectPath.substring(basePath.length);

        // If there's a relative path, navigate to it.
        // If it's empty, it means we were at the root, so no navigation is needed.
        if (relativePath) {
          navigate(relativePath, { replace: true });
        }
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
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:postSlug" element={<PostPage />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/reports/:reportSlug" element={<ReportPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
