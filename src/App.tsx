import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
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
import { ReactLenis } from "@studio-freight/react-lenis";

const queryClient = new QueryClient();

const App = () => (
  <ReactLenis root>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <FluidBackground />
        <CustomCursor />
        <div className="relative z-10">
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
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
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  </ReactLenis>
);

export default App;
