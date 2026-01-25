import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock, Globe, Video, UserPlus, ArrowLeft, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { bookingConfig } from "@/config/booking";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const BookingModal = ({ children }: { children: React.ReactNode }) => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [view, setView] = useState<"calendar" | "form">("calendar");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        notes: "",
        guests: [] as string[],
    });

    const handleTimeSelect = (time: string) => {
        setSelectedTime(time);
        setView("form");
    };

    const handleBack = () => {
        setView("calendar");
    };

    const handleSubmit = async () => {
        if (!formData.name || !formData.email) {
            toast.error("Please fill in all required fields");
            return;
        }

        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        console.log("Booking Submitted:", {
            date,
            time: selectedTime,
            ...formData
        });

        toast.success("Booking confirmed! Check your email for details.");
        setIsSubmitting(false);
        setIsOpen(false);

        // Reset state after closing
        setTimeout(() => {
            setView("calendar");
            setSelectedTime(null);
            setFormData({ name: "", email: "", notes: "", guests: [] });
        }, 500);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="max-w-3xl p-0 gap-0 overflow-hidden bg-black/40 backdrop-blur-xl border-white/10 sm:rounded-3xl shadow-2xl">
                <div className="flex flex-col md:flex-row h-full md:h-[500px]">
                    {/* Left Sidebar - Admin Info */}
                    <div className="w-full md:w-[280px] p-6 border-b md:border-b-0 md:border-r border-white/10 bg-white/5 flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10 border border-white/20 shadow-sm">
                                <AvatarImage src={bookingConfig.admin.avatar} alt={bookingConfig.admin.name} />
                                <AvatarFallback>{bookingConfig.admin.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="space-y-0.5">
                                <h4 className="font-medium text-sm text-foreground">
                                    {bookingConfig.admin.name}
                                    <span className="text-muted-foreground/60 font-normal ml-1 block text-xs">
                                        {bookingConfig.admin.handle}
                                    </span>
                                </h4>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div>
                                <h2 className="text-lg font-bold leading-tight">{bookingConfig.meeting.title}</h2>
                                <h3 className="text-lg font-bold leading-tight text-muted-foreground">({bookingConfig.meeting.duration})</h3>
                            </div>
                            <p className="text-muted-foreground text-xs leading-relaxed">
                                {bookingConfig.meeting.description}
                            </p>
                        </div>

                        <div className="flex flex-col gap-2 mt-auto pt-4 text-xs font-medium text-muted-foreground">
                            {view === "form" && date && selectedTime && (
                                <div className="mb-2 p-2 rounded-lg bg-white/5 border border-white/10 animate-fade-in">
                                    <div className="flex items-center gap-2 text-foreground mb-1">
                                        <CalendarIcon className="w-3 h-3" />
                                        <span className="text-xs font-semibold">
                                            {format(date, "EEE, MMM d")}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-foreground/80 pl-5">
                                        <span className="text-[10px]">
                                            {selectedTime}
                                        </span>
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center gap-2">
                                <Clock className="w-3 h-3" />
                                <span>{bookingConfig.meeting.duration}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Video className="w-3 h-3" />
                                <span>{bookingConfig.meeting.platform}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Globe className="w-3 h-3" />
                                <Select defaultValue="asia-dhaka">
                                    <SelectTrigger className="w-[120px] h-6 bg-transparent border-none p-0 focus:ring-0 shadow-none hover:text-foreground text-xs">
                                        <SelectValue placeholder="Timezone" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="asia-dhaka">Asia/Dhaka</SelectItem>
                                        <SelectItem value="utc">UTC</SelectItem>
                                        <SelectItem value="est">EST</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    {/* Right Content */}
                    <div className="flex-1 flex flex-col md:flex-row p-0 relative overflow-hidden bg-black/20">
                        {/* View 1: Calendar & Time */}
                        <div className={cn(
                            "absolute inset-0 flex flex-col md:flex-row transition-transform duration-500 ease-in-out",
                            view === "calendar" ? "translate-x-0" : "-translate-x-full"
                        )}>
                            {/* Calendar Section */}
                            <div className="flex-1 p-4 flex flex-col items-center justify-center">
                                <div className="mb-2 w-full px-4">
                                    <h3 className="text-sm font-semibold text-center md:text-left">
                                        {date ? format(date, "MMMM yyyy") : "Select a date"}
                                    </h3>
                                </div>
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    disabled={{ before: new Date() }}
                                    className="rounded-md border-none p-0 scale-90 md:scale-100"
                                    classNames={{
                                        month: "space-y-4",
                                        table: "w-full border-collapse space-y-1",
                                        head_row: "flex w-full justify-between gap-1",
                                        row: "flex w-full mt-2 justify-between gap-1",
                                        cell: "text-center text-xs p-0 relative [&:has([aria-selected])]:bg-white/10 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                                        day: cn(
                                            "h-8 w-8 p-0 font-normal aria-selected:opacity-100 hover:bg-white/10 hover:text-white rounded-full transition-all duration-200 text-xs"
                                        ),
                                        day_selected:
                                            "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground shadow-glow",
                                        day_today: "bg-white/5 text-accent-foreground",
                                        day_disabled: "text-muted-foreground/30 opacity-50 hover:bg-transparent pointer-events-none",
                                        head_cell: "text-muted-foreground rounded-md w-8 font-normal text-[0.7rem]",
                                    }}
                                />
                            </div>

                            {/* Time Slots Section */}
                            <div className="w-full md:w-40 border-t md:border-t-0 md:border-l border-white/10 p-4 bg-white/5 flex flex-col gap-3">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs font-medium text-muted-foreground">{date ? format(date, "EEE d") : "Select date"}</span>
                                </div>
                                <ScrollArea className="h-[120px] md:h-full pr-2">
                                    <div className="flex md:flex-col gap-2 flex-wrap md:flex-nowrap">
                                        {bookingConfig.availableSlots.map((time) => (
                                            <Button
                                                key={time}
                                                variant={selectedTime === time ? "default" : "outline"}
                                                className={cn(
                                                    "w-full justify-center rounded-lg border-white/10 hover:border-primary/50 hover:text-primary transition-all duration-200 h-8 text-xs bg-transparent hover:bg-white/5",
                                                    selectedTime === time && "border-primary bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground shadow-glow"
                                                )}
                                                onClick={() => handleTimeSelect(time)}
                                            >
                                                {time}
                                            </Button>
                                        ))}
                                    </div>
                                </ScrollArea>
                            </div>
                        </div>

                        {/* View 2: Form */}
                        <div className={cn(
                            "absolute inset-0 p-6 flex flex-col transition-transform duration-500 ease-in-out bg-transparent",
                            view === "form" ? "translate-x-0" : "translate-x-full"
                        )}>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute top-2 right-2 rounded-full h-8 w-8 hover:bg-white/10"
                                onClick={handleBack}
                            >
                                <ArrowLeft className="h-4 w-4" />
                            </Button>

                            <div className="max-w-sm mx-auto w-full flex flex-col h-full pt-4">
                                <h3 className="text-lg font-semibold mb-4">Enter Details</h3>

                                <div className="space-y-3 flex-1 overflow-y-auto pr-1">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="name" className="text-xs">Your name *</Label>
                                        <Input
                                            id="name"
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="rounded-lg border-white/10 bg-white/5 focus:bg-white/10 focus:border-primary/50 h-9 text-sm"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label htmlFor="email" className="text-xs">Email address *</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="john@example.com"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="rounded-lg border-white/10 bg-white/5 focus:bg-white/10 focus:border-primary/50 h-9 text-sm"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label htmlFor="notes" className="text-xs">Additional notes</Label>
                                        <Textarea
                                            id="notes"
                                            placeholder="Anything else?"
                                            value={formData.notes}
                                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                            className="min-h-[80px] rounded-lg border-white/10 bg-white/5 focus:bg-white/10 focus:border-primary/50 resize-none text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="pt-4 mt-auto flex items-center justify-between border-t border-white/10">
                                    <Button variant="ghost" onClick={handleBack} className="rounded-full h-8 text-sm hover:bg-white/5">Back</Button>
                                    <Button
                                        onClick={handleSubmit}
                                        disabled={isSubmitting}
                                        className="rounded-full px-6 bg-primary text-primary-foreground hover:bg-primary/90 h-9 text-sm shadow-glow"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                                                Scheduling...
                                            </>
                                        ) : (
                                            "Confirm"
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
