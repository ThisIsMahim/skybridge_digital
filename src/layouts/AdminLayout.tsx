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
        <div className="min-h-screen flex w-full bg-background flex-col md:flex-row">
            {/* Sidebar / Bottom Dock */}
            <aside
                className={cn(
                    "bg-white text-gray-900 transition-all duration-300 z-50",
                    // Mobile Styles: Bottom Dock
                    "fixed bottom-0 left-0 right-0 h-16 w-full flex flex-row items-center border-t border-gray-200",
                    // Desktop Styles: Sidebar
                    "md:flex-col md:fixed md:inset-y-0 md:left-0 md:h-full md:border-r md:border-gray-200 md:border-t-0",
                    sidebarOpen ? "md:w-56" : "md:w-16"
                )}
            >
                {/* Logo (Desktop Only) */}
                <div className="hidden md:flex h-16 items-center justify-between px-4 border-b border-gray-200">
                    {sidebarOpen && (
                        <span className="font-display text-lg font-bold tracking-tight text-gray-900">
                            SKYBRIDGE
                        </span>
                    )}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    >
                        <Menu className="h-5 w-5" />
                    </Button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 w-full md:py-6">
                    <ul className="flex flex-row md:flex-col justify-around md:justify-start md:space-y-1 md:px-3 w-full h-full items-center md:items-stretch">
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.href;
                            return (
                                <li key={item.name} className="flex-1 md:flex-none flex justify-center">
                                    <Button
                                        variant="ghost"
                                        onClick={() => navigate(item.href)}
                                        className={cn(
                                            "flex flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-3 rounded-lg transition-colors duration-200 h-full md:h-auto py-1 px-1 md:px-3 md:py-2.5",
                                            isActive
                                                ? "bg-gray-100 text-gray-900"
                                                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                                            !sidebarOpen && "md:justify-center md:px-0"
                                        )}
                                    >
                                        <item.icon className="h-6 w-6 md:h-5 md:w-5 flex-shrink-0" />
                                        {/* Mobile Label */}
                                        <span className="text-[10px] md:hidden font-medium">{item.name}</span>
                                        {/* Desktop Label */}
                                        {sidebarOpen && (
                                            <span className="hidden md:inline text-sm font-medium">{item.name}</span>
                                        )}
                                    </Button>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Logout Button (Desktop Sidebar) */}
                <div className="hidden md:block p-3">
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

                {/* Footer (Desktop Only) */}
                {sidebarOpen && (
                    <div className="hidden md:block p-4 border-t border-gray-200">
                        <p className="text-xs text-gray-500">© 2024 Skybridge</p>
                    </div>
                )}
            </aside>

            {/* Main Content Wrapper */}
            <div className={cn(
                "flex-1 flex flex-col transition-all duration-300 min-h-screen",
                // Mobile: No margin, padding bottom for dock
                "ml-0 pb-20",
                // Desktop: Margin left for sidebar
                sidebarOpen ? "md:ml-56" : "md:ml-16",
                "md:pb-0"
            )}>
                {/* Header */}
                <header className="h-16 border-b border-border bg-background flex items-center justify-between px-6 sticky top-0 z-40 shadow-sm">
                    <h1 className="text-xl font-display font-semibold text-foreground">
                        {currentTitle}
                    </h1>
                    <div className="flex items-center gap-4">
                        {/* Mobile Logout */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden text-muted-foreground"
                            onClick={handleLogout}
                        >
                            <LogOut className="h-5 w-5" />
                        </Button>

                        <div className="flex items-center gap-2">
                            <div className="hidden sm:flex flex-col items-end">
                                <span className="text-sm font-medium">Admin</span>
                            </div>
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                                <span className="text-sm font-bold text-primary">A</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-auto p-4 md:p-6 space-y-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
