import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, FileText, Settings, Menu, LogOut, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/admin" },
    { name: "Leads", icon: Users, href: "/admin/leads" },
    { name: "Projects", icon: Briefcase, href: "/admin/projects" },
    { name: "Blog", icon: FileText, href: "/admin/blog" },
    { name: "Settings", icon: Settings, href: "/admin/settings" },
];

const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    const currentTitle = navItems.find((item) => item.href === location.pathname)?.name || "Admin Panel";

    return (
        <div className="min-h-screen flex w-full bg-background">
            {/* Sidebar */}
            <aside
                className={cn(
                    "bg-primary text-primary-foreground transition-all duration-300 flex flex-col fixed inset-y-0 left-0 z-50",
                    sidebarOpen ? "w-64" : "w-16"
                )}
            >
                {/* Logo */}
                <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
                    {sidebarOpen && (
                        <span className="font-display text-lg font-bold tracking-tight text-gray-900">
                            SKYBRIDGE
                        </span>
                    )}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="text-gray-600 hover:bg-gray-100"
                    >
                        <Menu className="h-5 w-5" />
                    </Button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 py-6">
                    <ul className="space-y-1 px-3">
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.href;
                            return (
                                <li key={item.name}>
                                    <Button
                                        variant="ghost"
                                        onClick={() => navigate(item.href)}
                                        className={cn(
                                            "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-200 justify-start",
                                            isActive
                                                ? "bg-gray-100 text-gray-900 hover:bg-gray-200"
                                                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                                            !sidebarOpen && "justify-center px-0"
                                        )}
                                    >
                                        <item.icon className="h-5 w-5 flex-shrink-0" />
                                        {sidebarOpen && (
                                            <span className="text-sm font-medium">{item.name}</span>
                                        )}
                                    </Button>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Logout Button */}
                <div className="p-3">
                    <Button
                        variant="ghost"
                        className={cn(
                            "w-full flex items-center gap-3 text-gray-600 hover:bg-gray-100 hover:text-gray-900 justify-start",
                            !sidebarOpen && "justify-center px-0"
                        )}
                        onClick={handleLogout}
                    >
                        <LogOut className="h-5 w-5" />
                        {sidebarOpen && <span>Logout</span>}
                    </Button>
                </div>

                {/* Footer */}
                {sidebarOpen && (
                    <div className="p-4 border-t border-gray-200">
                        <p className="text-xs text-gray-500">© 2024 Skybridge</p>
                    </div>
                )}
            </aside>

            {/* Main Content Wrapper */}
            <div className={cn("flex-1 flex flex-col transition-all duration-300", sidebarOpen ? "ml-64" : "ml-16")}>
                {/* Header */}
                <header className="h-16 border-b border-border bg-background flex items-center justify-between px-6 sticky top-0 z-40">
                    <h1 className="text-xl font-display font-semibold text-foreground">
                        {currentTitle}
                    </h1>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">Admin</span>
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-sm font-medium text-primary">A</span>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-auto p-6 space-y-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
