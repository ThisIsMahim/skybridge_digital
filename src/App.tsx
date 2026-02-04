import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState, lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import CustomCursor from "./components/CustomCursor";
import CustomScrollbar from "./components/CustomScrollbar";
import { ReactLenis } from "@studio-freight/react-lenis";
import InitialLoadReveal from "./components/InitialLoadReveal";
import AdvancedLoader from "./components/AdvancedLoader";
import { ChatProvider } from "./context/ChatContext";

const FluidBackground = lazy(() => import("./components/FluidBackground"));

// Lazy loaded components for better performance

const Index = lazy(() => import("./pages/Index"));
const Contact = lazy(() => import("./pages/Contact"));
const Login = lazy(() => import("./pages/Login"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const CaseStudyDetail = lazy(() => import("./pages/CaseStudyDetail"));
const AdminLayout = lazy(() => import("./layouts/AdminLayout"));
const AdminDashboardHome = lazy(() => import("./pages/admin/DashboardHome"));
const AdminLeadsPage = lazy(() => import("./pages/admin/LeadsPage"));
const AdminProjectsPage = lazy(() => import("./pages/admin/ProjectsPage"));
const AdminBlogsPage = lazy(() => import("./pages/admin/BlogsPage"));
const AdminSettingsPage = lazy(() => import("./pages/admin/SettingsPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

// Simple loading fallback


const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <ReactLenis root>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <ChatProvider>
            <AnimatePresence mode="wait">
              {isLoading && <AdvancedLoader onComplete={() => setIsLoading(false)} />}
            </AnimatePresence>
            {!isLoading && (
              <>
                <Suspense fallback={null}>
                  <FluidBackground />
                </Suspense>
                <CustomCursor />
                <CustomScrollbar />

                <div className="relative z-10">
                  <Toaster />
                  <Sonner />
                  <BrowserRouter>
                    <AnimatedRoutes />
                  </BrowserRouter>
                </div>
              </>
            )}
          </ChatProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ReactLenis>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();
  const [shouldShowGlobal] = useState(() => location.pathname !== "/");

  return (
    <AnimatePresence mode="wait">
      {shouldShowGlobal && <InitialLoadReveal />}
      <Suspense fallback={null}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Index />} />
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

export default App;
