import { useState, useEffect } from "react";
import { Users, Briefcase, FileText, ArrowUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { API_URL, getAuthHeader } from "@/config/api";

const AdminDashboardHome = () => {
    const [stats, setStats] = useState([
        { title: "Total Leads", value: "-", icon: Users, color: "text-blue-500" },
        { title: "Active Projects", value: "-", icon: Briefcase, color: "text-purple-500" },
        { title: "Blog Posts", value: "-", icon: FileText, color: "text-orange-500" },
    ]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const headers = getAuthHeader();

                // Parallel fetching
                const [leadsRes, projectsRes, blogsRes] = await Promise.all([
                    fetch(`${API_URL}/leads`, { headers }),
                    fetch(`${API_URL}/projects`, { headers: {} }), // Projects public
                    fetch(`${API_URL}/blogs`, { headers: {} }) // Blogs public
                ]);

                let leadsCount = "-";
                let projectsCount = "-";
                let blogsCount = "-";

                if (leadsRes.ok) {
                    const data = await leadsRes.json();
                    leadsCount = data.length.toString();
                }
                if (projectsRes.ok) {
                    const data = await projectsRes.json();
                    projectsCount = data.length.toString();
                }
                if (blogsRes.ok) {
                    const data = await blogsRes.json();
                    blogsCount = data.length.toString();
                }

                setStats([
                    { title: "Total Leads", value: leadsCount, icon: Users, color: "text-blue-500" },
                    { title: "Active Projects", value: projectsCount, icon: Briefcase, color: "text-purple-500" },
                    { title: "Blog Posts", value: blogsCount, icon: FileText, color: "text-orange-500" },
                ]);

            } catch (error) {
                console.error("Dashboard stats error", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat) => (
                    <Card key={stat.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {stat.title}
                            </CardTitle>
                            <stat.icon className={`h-4 w-4 ${stat.color}`} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            {/* <p className="text-xs text-muted-foreground mt-1">
                +20.1% from last month
              </p> */}
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Short quick links or recent activity could go here */}
            <div className="grid md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader><CardTitle>Welcome Back</CardTitle></CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            Use the sidebar to manage your website content. You can add new portfolio projects, write blog posts, or view incoming leads.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default AdminDashboardHome;
