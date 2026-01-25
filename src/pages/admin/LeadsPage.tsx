import { useState, useEffect } from "react";
import { Copy, Check, Filter } from "lucide-react";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { API_URL, getAuthHeader } from "@/config/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const AdminLeadsPage = () => {
    const [leads, setLeads] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchLeads = async () => {
        try {
            const res = await fetch(`${API_URL}/leads`, { headers: getAuthHeader() });
            if (res.ok) {
                const data = await res.json();
                setLeads(data);
            }
        } catch (error) {
            toast.error("Failed to load leads");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeads();
    }, []);

    const updateStatus = async (id: string, newStatus: string) => {
        try {
            const res = await fetch(`${API_URL}/leads/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    ...getAuthHeader()
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (res.ok) {
                toast.success("Status updated");
                fetchLeads(); // Refresh
            } else {
                toast.error("Failed to update status");
            }
        } catch (error) {
            toast.error("Error updating status");
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard");
    }

    const getStatusVariant = (status: string) => {
        switch (status) {
            case "Closed": return "bg-emerald-100 text-emerald-700 border-emerald-200";
            case "New": return "bg-amber-100 text-amber-700 border-amber-200";
            case "Contacted": return "bg-sky-100 text-sky-700 border-sky-200";
            case "Meeting Scheduled": return "bg-purple-100 text-purple-700 border-purple-200";
            default: return "bg-muted text-muted-foreground";
        }
    };

    return (
        <div className="space-y-6">
            <Card className="border border-border">
                <CardHeader>
                    <CardTitle>All Leads</CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="text-center py-10">Loading leads...</div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Message/Notes</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {leads.map((lead) => (
                                    <TableRow key={lead._id}>
                                        <TableCell className="text-muted-foreground text-xs">
                                            {new Date(lead.createdAt).toLocaleDateString()} <br />
                                            {new Date(lead.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </TableCell>
                                        <TableCell className="font-medium">{lead.name}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                {lead.email}
                                                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyToClipboard(lead.email)}>
                                                    <Copy className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {lead.isBookingRequest ? (
                                                <Badge variant="secondary">Booking</Badge>
                                            ) : (
                                                <Badge variant="outline">Contact</Badge>
                                            )}
                                        </TableCell>
                                        <TableCell className="max-w-xs truncate" title={lead.message}>
                                            {lead.message}
                                            {lead.isBookingRequest && (
                                                <div className="text-xs text-muted-foreground mt-1">
                                                    Topic: {lead.meetingTopic} <br />
                                                    Pref: {new Date(lead.preferredDate).toLocaleDateString()} @ {lead.preferredTimeRange}
                                                </div>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <Select defaultValue={lead.status} onValueChange={(val) => updateStatus(lead._id, val)}>
                                                <SelectTrigger className={cn("w-[140px] h-8", getStatusVariant(lead.status))}>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="New">New</SelectItem>
                                                    <SelectItem value="Contacted">Contacted</SelectItem>
                                                    <SelectItem value="Meeting Scheduled">Meeting Scheduled</SelectItem>
                                                    <SelectItem value="Closed">Closed</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {leads.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">No leads found.</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminLeadsPage;
