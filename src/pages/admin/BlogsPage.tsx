import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
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

const AdminBlogsPage = () => {
    const [blogs, setBlogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingBlog, setEditingBlog] = useState<any>(null);

    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        summary: "",
        content: "",
        coverImage: "",
        tags: "",
        isPublished: false
    });

    const fetchBlogs = async () => {
        try {
            // Fetch from admin endpoint to get all blogs including drafts
            const res = await fetch(`${API_URL}/blogs/manage/all`, {
                headers: getAuthHeader()
            });

            if (res.ok) {
                const data = await res.json();
                setBlogs(data);
            }
        } catch (error) {
            toast.error("Failed to load blogs");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const handleOpenDialog = (blog: any = null) => {
        if (blog) {
            setEditingBlog(blog);
            setFormData({
                title: blog.title,
                slug: blog.slug,
                summary: blog.summary,
                content: blog.content,
                coverImage: blog.coverImage || "",
                tags: blog.tags.join(", "),
                isPublished: blog.isPublished
            });
        } else {
            setEditingBlog(null);
            setFormData({
                title: "",
                slug: "",
                summary: "",
                content: "",
                coverImage: "",
                tags: "",
                isPublished: false
            });
        }
        setIsDialogOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            ...formData,
            tags: formData.tags.split(",").map(t => t.trim()).filter(Boolean)
        };

        try {
            const url = editingBlog
                ? `${API_URL}/blogs/${editingBlog._id}`
                : `${API_URL}/blogs`;

            const method = editingBlog ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json", ...getAuthHeader() },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                toast.success(editingBlog ? "Blog updated" : "Blog created");
                setIsDialogOpen(false);
                fetchBlogs();
            } else {
                toast.error("Operation failed");
            }
        } catch (error) {
            toast.error("Error saving blog");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this post?")) return;
        try {
            const res = await fetch(`${API_URL}/blogs/${id}`, {
                method: "DELETE",
                headers: getAuthHeader()
            });
            if (res.ok) {
                toast.success("Blog deleted");
                fetchBlogs();
            }
        } catch (error) {
            toast.error("Error deleting blog");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold tracking-tight">Blog Posts</h2>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={() => handleOpenDialog()}>
                            <Plus className="mr-2 h-4 w-4" /> Add Post
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>{editingBlog ? "Edit Post" : "Create New Post"}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Title</label>
                                    <Input
                                        value={formData.title}
                                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Slug (URL friendly)</label>
                                    <Input
                                        value={formData.slug}
                                        onChange={e => setFormData({ ...formData, slug: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <ImageUpload
                                    label="Cover Image"
                                    value={formData.coverImage}
                                    onChange={(url) => setFormData(prev => ({ ...prev, coverImage: url }))}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Summary</label>
                                <Textarea
                                    value={formData.summary}
                                    onChange={e => setFormData({ ...formData, summary: e.target.value })}
                                    required
                                    className="h-20"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Content (Markdown supported)</label>
                                <Textarea
                                    value={formData.content}
                                    onChange={e => setFormData({ ...formData, content: e.target.value })}
                                    required
                                    className="min-h-[200px] font-mono text-sm"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Tags (comma separated)</label>
                                <Input
                                    value={formData.tags}
                                    onChange={e => setFormData({ ...formData, tags: e.target.value })}
                                    placeholder="Tech, Design, News"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="isPublished"
                                    checked={formData.isPublished}
                                    onChange={e => setFormData({ ...formData, isPublished: e.target.checked })}
                                    className="h-4 w-4 rounded border-gray-300"
                                />
                                <label htmlFor="isPublished" className="text-sm font-medium">Publish Immediately</label>
                            </div>
                            <Button type="submit" className="w-full">Save Post</Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="space-y-4">
                    {blogs.map((blog) => (
                        <Card key={blog._id} className="p-4 flex items-center justify-between">
                            <div className="flex gap-4 items-center">
                                <div className="h-16 w-24 bg-muted rounded overflow-hidden">
                                    {blog.coverImage ? (
                                        <img src={blog.coverImage} alt="" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">No Image</div>
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">{blog.title}</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Badge variant={blog.isPublished ? "default" : "secondary"}>
                                            {blog.isPublished ? "Published" : "Draft"}
                                        </Badge>
                                        <span className="text-xs text-muted-foreground">{new Date(blog.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(blog)}><Pencil className="h-4 w-4" /></Button>
                                <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(blog._id)}><Trash2 className="h-4 w-4" /></Button>
                            </div>
                        </Card>
                    ))}
                    {blogs.length === 0 && <div className="text-center text-muted-foreground py-10">No blogs posts found.</div>}
                </div>
            )}
        </div>
    );
};

export default AdminBlogsPage;
