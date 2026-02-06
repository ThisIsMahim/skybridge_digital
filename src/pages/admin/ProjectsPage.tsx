import { useState, useEffect, useCallback, memo } from "react";
import { Plus, Pencil, Trash2, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { API_URL, getAuthHeader } from "@/config/api";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import ImageUpload from "@/components/admin/ImageUpload";

// Memoized Project Card Component to prevent re-renders of the entire list
const ProjectCard = memo(({ project, onEdit, onDelete }: { project: any, onEdit: (p: any) => void, onDelete: (id: string) => void }) => {
    return (
        <Card className="overflow-hidden group">
            <div className="aspect-video w-full overflow-hidden bg-muted relative">
                <img
                    src={project.imageUrl}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => (e.currentTarget.src = "https://placehold.co/600x400?text=No+Image")}
                />
                {project.featured && (
                    <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded font-bold uppercase">
                        Featured
                    </div>
                )}
            </div>
            <CardHeader className="pb-2">
                <CardTitle className="flex justify-between items-start">
                    <span className="truncate">{project.title}</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4 h-10">
                    {project.description}
                </p>
                <div className="flex flex-wrap gap-1 mb-4">
                    {project.tags.map((tag: string) => (
                        <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                    ))}
                </div>
                <div className="flex justify-between items-center mt-auto pt-2 border-t border-border">
                    <div className="flex gap-2">
                        {project.liveLink && (
                            <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                                <ExternalLink className="h-4 w-4" />
                            </a>
                        )}
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => onEdit(project)}>
                            <Pencil className="h-3 w-3 mr-1" /> Edit
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => onDelete(project._id)}>
                            <Trash2 className="h-3 w-3" />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
});
ProjectCard.displayName = "ProjectCard";

const AdminProjectsPage = () => {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<any>(null);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        imageUrl: "",
        challengeImage: "",
        solutionImage: "",
        liveLink: "",
        repoLink: "",
        tags: "",
        featured: false
    });

    const fetchProjects = async () => {
        try {
            const res = await fetch(`${API_URL}/projects`); // Public endpoint
            if (res.ok) {
                const data = await res.json();
                setProjects(data);
            }
        } catch (error) {
            toast.error("Failed to lead projects");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleOpenDialog = useCallback((project: any = null) => {
        if (project) {
            setEditingProject(project);
            setFormData({
                title: project.title,
                description: project.description,
                imageUrl: project.imageUrl || "",
                challengeImage: project.challengeImage || "",
                solutionImage: project.solutionImage || "",
                liveLink: project.liveLink || "",
                repoLink: project.repoLink || "",
                tags: project.tags ? project.tags.join(", ") : "",
                featured: project.featured
            });
        } else {
            setEditingProject(null);
            setFormData({
                title: "",
                description: "",
                imageUrl: "",
                challengeImage: "",
                solutionImage: "",
                liveLink: "",
                repoLink: "",
                tags: "",
                featured: false
            });
        }
        setIsDialogOpen(true);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            ...formData,
            tags: formData.tags ? formData.tags.split(",").map(t => t.trim()).filter(Boolean) : []
        };

        try {
            const url = editingProject
                ? `${API_URL}/projects/${editingProject._id}`
                : `${API_URL}/projects`;

            const method = editingProject ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json", ...getAuthHeader() },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                toast.success(editingProject ? "Project updated" : "Project created");
                setIsDialogOpen(false);
                fetchProjects();
            } else {
                toast.error("Operation failed");
            }
        } catch (error) {
            toast.error("Error saving project");
        }
    };

    const handleDelete = useCallback(async (id: string) => {
        if (!confirm("Are you sure you want to delete this project?")) return;

        try {
            const res = await fetch(`${API_URL}/projects/${id}`, {
                method: "DELETE",
                headers: getAuthHeader()
            });

            if (res.ok) {
                toast.success("Project deleted");
                // Optimistic update could go here, but re-fetching ensures consistency
                // For better performance, filter out locally:
                setProjects(prev => prev.filter(p => p._id !== id));
            } else {
                toast.error("Failed to delete project");
            }
        } catch (error) {
            toast.error("Error deleting project");
        }
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={() => handleOpenDialog()}>
                            <Plus className="mr-2 h-4 w-4" /> Add Project
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto p-0 gap-0 border-zinc-800 bg-zinc-900/95 backdrop-blur-xl">
                        <DialogHeader className="p-4 border-b border-white/10 sticky top-0 bg-zinc-900/95 backdrop-blur-xl z-10">
                            <DialogTitle className="text-lg font-bold">{editingProject ? "Edit Project" : "Add New Project"}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="p-4 space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase text-muted-foreground font-bold tracking-wider">Title</label>
                                    <Input
                                        value={formData.title}
                                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                                        required
                                        className="h-8 text-sm bg-white/5 border-white/10 focus-visible:ring-accent"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase text-muted-foreground font-bold tracking-wider">Tags</label>
                                    <Input
                                        value={formData.tags}
                                        onChange={e => setFormData({ ...formData, tags: e.target.value })}
                                        placeholder="React, Node, etc."
                                        className="h-8 text-sm bg-white/5 border-white/10 focus-visible:ring-accent"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] uppercase text-muted-foreground font-bold tracking-wider">Description</label>
                                <Textarea
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    required
                                    className="min-h-[60px] text-sm bg-white/5 border-white/10 focus-visible:ring-accent resize-none"
                                />
                            </div>

                            <div className="grid grid-cols-3 gap-2">
                                <ImageUpload
                                    label="Main"
                                    value={formData.imageUrl}
                                    onChange={(url) => setFormData(prev => ({ ...prev, imageUrl: url }))}
                                    className="text-xs"
                                />
                                <ImageUpload
                                    label="Challenge"
                                    value={formData.challengeImage}
                                    onChange={(url) => setFormData(prev => ({ ...prev, challengeImage: url }))}
                                    className="text-xs"
                                />
                                <ImageUpload
                                    label="Solution"
                                    value={formData.solutionImage}
                                    onChange={(url) => setFormData(prev => ({ ...prev, solutionImage: url }))}
                                    className="text-xs"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase text-muted-foreground font-bold tracking-wider">Live Link</label>
                                    <Input
                                        value={formData.liveLink}
                                        onChange={e => setFormData({ ...formData, liveLink: e.target.value })}
                                        className="h-8 text-sm bg-white/5 border-white/10 focus-visible:ring-accent"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase text-muted-foreground font-bold tracking-wider">Repo Link</label>
                                    <Input
                                        value={formData.repoLink}
                                        onChange={e => setFormData({ ...formData, repoLink: e.target.value })}
                                        className="h-8 text-sm bg-white/5 border-white/10 focus-visible:ring-accent"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-2">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="featured"
                                        checked={formData.featured}
                                        onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                                        className="h-4 w-4 rounded border-white/20 bg-white/5 text-accent focus:ring-accent"
                                    />
                                    <label htmlFor="featured" className="text-xs font-medium cursor-pointer select-none">Featured Project</label>
                                </div>
                                <Button type="submit" className="bg-white text-black hover:bg-white/90 font-bold px-8 h-9 text-xs uppercase tracking-wide">
                                    Save
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <ProjectCard
                            key={project._id}
                            project={project}
                            onEdit={handleOpenDialog}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminProjectsPage;
