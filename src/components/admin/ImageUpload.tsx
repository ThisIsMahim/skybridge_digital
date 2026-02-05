import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { API_URL } from "@/config/api";

interface ImageUploadProps {
    value: string;
    onChange: (url: string) => void;
    label?: string;
    className?: string;
}

const ImageUpload = ({ value, onChange, label = "Upload Image", className }: ImageUploadProps) => {
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("image", file);

        setUploading(true);
        try {
            const res = await fetch(`${API_URL}/upload`, {
                method: "POST",
                body: formData,
            });

            if (!res.ok) throw new Error("Upload failed");

            const data = await res.json();
            onChange(data.url);
            toast.success("Image uploaded successfully");
        } catch (error) {
            toast.error("Failed to upload image");
            console.error(error);
        } finally {
            setUploading(false);
            // Reset input so same file can be selected again if needed
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    const handleRemove = () => {
        onChange("");
    };

    return (
        <div className={`space-y-2 ${className}`}>
            <label className="text-sm font-medium">{label}</label>

            {value ? (
                <div className="relative group rounded-md overflow-hidden border border-border bg-muted aspect-video w-full max-w-[300px]">
                    <img
                        src={value}
                        alt="Uploaded preview"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                        <Button
                            variant="destructive"
                            size="icon"
                            className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={handleRemove}
                            type="button"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            ) : (
                <div
                    className="border-2 border-dashed border-border rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors h-32 w-full max-w-[300px]"
                    onClick={() => fileInputRef.current?.click()}
                >
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    {uploading ? (
                        <div className="flex flex-col items-center gap-2 text-muted-foreground">
                            <Loader2 className="h-6 w-6 animate-spin" />
                            <span className="text-xs">Uploading...</span>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-2 text-muted-foreground">
                            <Upload className="h-6 w-6" />
                            <span className="text-xs">Click to upload</span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
