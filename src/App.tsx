import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Work from "./pages/Work";
import CaseStudies from "./pages/CaseStudies";
import CaseStudyDetail from "./pages/CaseStudyDetail";
import AdminDashboard from "./pages/AdminDashboard"; // Keeping for reference or fallback, can remove later
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboardHome from "./pages/admin/DashboardHome";
import AdminLeadsPage from "./pages/admin/LeadsPage";
import AdminProjectsPage from "./pages/admin/ProjectsPage";
import AdminBlogsPage from "./pages/admin/BlogsPage";
import AdminSettingsPage from "./pages/admin/SettingsPage";
import NotFound from "./pages/NotFound";
import FluidBackground from "./components/FluidBackground";
import CustomCursor from "./components/CustomCursor";
import CustomScrollbar from "./components/CustomScrollbar";
import { ReactLenis } from "@studio-freight/react-lenis";
import InitialLoadReveal from "./components/InitialLoadReveal";

const queryClient = new QueryClient();

const App = () => (
  <ReactLenis root>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <FluidBackground />
        <CustomCursor />
        <CustomScrollbar />
        <div className="relative z-10">
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AnimatedRoutes />
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  </ReactLenis>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  const [shouldShowGlobal] = useState(() => location.pathname !== "/");

  return (
    <AnimatePresence mode="wait">
      {shouldShowGlobal && <InitialLoadReveal />}
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        <Route path="/work" element={<Work />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/case-studies/:id" element={<CaseStudyDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardHome />} />
          <Route path="leads" element={<AdminLeadsPage />} />
          <Route path="projects" element={<AdminProjectsPage />} />
          <Route path="blog" element={<AdminBlogsPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};


export default App;
