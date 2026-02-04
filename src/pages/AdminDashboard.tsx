import { useState, useEffect } from "react";
import { LayoutDashboard, Users, FileText, Settings, Menu, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { API_URL, getAuthHeader } from "@/config/api";
import { toast } from "sonner";

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "#dashboard" },
  { name: "Leads", icon: Users, href: "#leads" },
  { name: "Blog", icon: FileText, href: "#blog" },
  { name: "Settings", icon: Settings, href: "#settings" },
];

const getStatusVariant = (status: string) => {
  switch (status) {
    case "Closed":
      return "bg-emerald-100 text-emerald-700 border-emerald-200";
    case "New":
      return "bg-amber-100 text-amber-700 border-amber-200";
    case "Contacted":
      return "bg-sky-100 text-sky-700 border-sky-200";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const AdminDashboard = () => {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [leads, setLeads] = useState<any[]>([]);
  const [stats, setStats] = useState([
    { title: "Total Leads", value: "0", change: "0%" },
    { title: "Active Projects", value: "0", change: "0%" },
    // { title: "Conversion Rate", value: "0%", change: "0%" },
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const headers = getAuthHeader();
        const leadsRes = await fetch(`${API_URL}/leads`, { headers });
        if (leadsRes.ok) {
          const leadsData = await leadsRes.json();
          setLeads(leadsData);
          setStats(prev => prev.map(stat =>
            stat.title === "Total Leads" ? { ...stat, value: leadsData.length.toString() } : stat
          ));
        } else {
          if (leadsRes.status === 401) {
            localStorage.removeItem("token");
            navigate("/login");
          }
        }

        // Fetch projects count - assuming endpoint exists or needed
        // const projectsRes = await fetch(`${API_URL}/projects`, { headers });
        // ...
      } catch (error) {
        console.error("Failed to fetch data", error);
        toast.error("Failed to load dashboard data");
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex w-full bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          "bg-primary text-primary-foreground transition-all duration-300 flex flex-col",
          sidebarOpen ? "w-64" : "w-16"
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">
          {sidebarOpen && (
            <span className="font-display text-lg font-bold tracking-tight">
              SKYBRIDGE
            </span>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-primary-foreground hover:bg-white/10"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6">
          <ul className="space-y-1 px-3">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  onClick={() => setActiveNav(item.name)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-200",
                    activeNav === item.name
                      ? "bg-white/20 text-white"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  )}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {sidebarOpen && (
                    <span className="text-sm font-medium">{item.name}</span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-3">
          <Button
            variant="ghost"
            className={cn(
              "w-full flex items-center gap-3 text-white/70 hover:bg-white/10 hover:text-white justify-start",
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
          <div className="p-4 border-t border-white/10">
            <p className="text-xs text-white/50">© 2024 Skybridge Systems</p>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="h-16 border-b border-border bg-background flex items-center justify-between px-6">
          <h1 className="text-xl font-display font-semibold text-foreground">
            Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Admin</span>
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-sm font-medium text-primary">A</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat) => (
              <Card key={stat.title} className="border border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-display font-bold text-foreground">
                      {stat.value}
                    </span>
                    {/* <span className="text-sm font-medium text-emerald-600">
                      {stat.change}
                    </span> */}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Leads Table */}
          <Card className="border border-border">
            <CardHeader>
              <CardTitle className="text-lg font-display font-semibold">
                Recent Leads
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-border">
                    <TableHead className="text-muted-foreground">Name</TableHead>
                    <TableHead className="text-muted-foreground">Email</TableHead>
                    <TableHead className="text-muted-foreground">Date</TableHead>
                    <TableHead className="text-muted-foreground">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leads.map((lead) => (
                    <TableRow key={lead._id} className="border-border">
                      <TableCell className="font-medium text-foreground">
                        {lead.name}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {lead.email}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={cn("font-medium", getStatusVariant(lead.status))}
                        >
                          {lead.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                  {leads.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-muted-foreground h-24">
                        No leads found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
