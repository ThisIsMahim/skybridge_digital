import { useState, useMemo } from "react";
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
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [view, setView] = useState<"types" | "date" | "time" | "form">("types");
    const [selectedMeetingType, setSelectedMeetingType] = useState<typeof bookingConfig.meetingTypes[0] | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [timezone, setTimezone] = useState(() => Intl.DateTimeFormat().resolvedOptions().timeZone);

    // Generate timezones list
    const timezones = useMemo(() => {
        try {
            // @ts-ignore - Intl.supportedValuesOf is available in modern browsers
            return (Intl as any).supportedValuesOf('timeZone').map((tz: string) => {
                const formatter = new Intl.DateTimeFormat('en-US', {
                    timeZone: tz,
                    timeZoneName: 'shortOffset'
                });
                const parts = formatter.formatToParts(new Date());
                const offset = parts.find(p => p.type === 'timeZoneName')?.value || '';
                // Format: Europe/Andorra GMT +1:00
                // offset usually comes as "GMT+1" or "GMT+5:30". 
                // We want to ensure it looks nice.
                return { value: tz, label: `${tz.replace(/_/g, " ")} ${offset}` };
            });
        } catch (e) {
            console.error("Intl.supportedValuesOf not supported", e);
            return [];
        }
    }, []);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        notes: "",
        guests: [] as string[],
    });

    const handleDateSelect = (newDate: Date | undefined) => {
        setDate(newDate);
        if (newDate) {
            setView("time");
        }
    };

    const handleTimeSelect = (time: string) => {
        setSelectedTime(time);
        setView("form");
    };

    const handleMeetingTypeSelect = (type: typeof bookingConfig.meetingTypes[0]) => {
        setSelectedMeetingType(type);
        setView("date");
    };

    const handleBack = () => {
        if (view === "form") {
            setView("time");
        } else if (view === "time") {
            setView("date");
        } else if (view === "date") {
            setView("types");
        }
    };

    const handleSubmit = async () => {
        const newErrors: { [key: string]: string } = {};
        if (!formData.name) newErrors.name = "Name is required";
        if (!formData.email) newErrors.email = "Email is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});

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
            setView("types");
            setDate(undefined);
            setSelectedTime(null);
            setSelectedMeetingType(null);
            setFormData({ name: "", email: "", notes: "", guests: [] });
        }, 500);
    };

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
        if (!open) {
            setTimeout(() => {
                setView("types");
                setDate(undefined);
                setSelectedTime(null);
                setSelectedMeetingType(null);
                setErrors({});
                setFormData({ name: "", email: "", notes: "", guests: [] });
            }, 500);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="max-w-3xl p-0 gap-0 overflow-y-auto md:overflow-hidden bg-black/40 backdrop-blur-xl border-white/10 sm:rounded-3xl shadow-2xl max-h-[85vh] md:max-h-none">
                <div className="flex flex-col md:flex-row h-auto md:h-[500px]">
                    {/* Left Sidebar - Admin Info */}
                    <div className="w-full md:w-[280px] p-4 md:p-6 border-b md:border-b-0 md:border-r border-white/10 bg-white/5 flex flex-col gap-4">
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

                        {selectedMeetingType ? (
                            <div className="space-y-3 animate-fade-in">
                                <div>
                                    <h2 className="text-lg font-bold leading-tight">{selectedMeetingType.title}</h2>
                                    <h3 className="text-lg font-bold leading-tight text-muted-foreground">
                                        ({selectedMeetingType.duration})
                                    </h3>
                                </div>
                                <p className="text-muted-foreground text-xs leading-relaxed">
                                    {selectedMeetingType.description}
                                </p>
                            </div>
                        ) : (
                            <div className="block text-muted-foreground text-xs italic opacity-50">
                                Select a meeting type to continue.
                            </div>
                        )}

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

                            {selectedMeetingType && (
                                <>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-3 h-3" />
                                        <span>{selectedMeetingType.duration}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Video className="w-3 h-3" />
                                        <span>{bookingConfig.meeting.platform}</span>
                                    </div>
                                </>
                            )}
                            <div className="flex items-center gap-2">
                                <Globe className="w-3 h-3" />
                                <Select value={timezone} onValueChange={setTimezone}>
                                    <SelectTrigger className="w-[140px] h-6 bg-transparent border-none p-0 focus:ring-0 shadow-none hover:text-foreground text-xs">
                                        <SelectValue placeholder="Timezone" />
                                    </SelectTrigger>
                                    <SelectContent className="max-h-[200px]">
                                        {timezones.map((tz: { value: string; label: string }) => (
                                            <SelectItem key={tz.value} value={tz.value} className="text-xs">{(tz.value === timezone) ? tz.label.split('GMT')[0] : tz.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    {/* Right Content */}
                    <div className="flex-1 flex flex-col md:flex-row p-0 relative overflow-hidden bg-black/20 min-h-[400px] md:min-h-0">

                        {/* View 0: Meeting Types Selection */}
                        <div className={cn(
                            "absolute inset-0 p-6 flex flex-col transition-transform duration-500 ease-in-out bg-transparent z-20",
                            view === "types" ? "translate-x-0" : "-translate-x-full"
                        )}>
                            <div className="max-w-sm mx-auto w-full flex flex-col h-full pt-2">
                                <h3 className="text-lg font-semibold mb-4 text-center md:text-left">Select Meeting Type</h3>
                                <div className="space-y-2 overflow-y-auto pr-1">
                                    {bookingConfig.meetingTypes?.map((type) => (
                                        <div
                                            key={type.id}
                                            onClick={() => handleMeetingTypeSelect(type)}
                                            className="group p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-primary/50 transition-all cursor-pointer flex flex-col gap-1"
                                        >
                                            <div className="flex justify-between items-center">
                                                <h4 className="font-semibold text-sm group-hover:text-primary transition-colors">{type.title}</h4>
                                                <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full text-muted-foreground">{type.duration}</span>
                                            </div>
                                            <p className="text-xs text-muted-foreground line-clamp-2">{type.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* View 1: Date & Time (Split on Mobile, Combined on Desktop) */}
                        <div className={cn(
                            "absolute inset-0 flex flex-col md:flex-row transition-transform duration-500 ease-in-out",
                            (view === "date" || view === "time") ? "translate-x-0" : (view === "types" ? "translate-x-full bg-black/20" : "-translate-x-full")
                        )}>

                            {/* Calendar Section (Hidden on Mobile when in Time view) */}
                            <div className={cn(
                                "flex-1 p-4 flex-col items-center justify-center transition-all duration-300",
                                view === "time" ? "hidden md:flex" : "flex"
                            )}>
                                <div className="mb-6 w-full px-4 flex flex-row md:flex-col items-center justify-between md:justify-start gap-4 pt-1 md:pt-0">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="rounded-full h-8 w-8 hover:bg-white/10 md:hidden -ml-2"
                                        onClick={handleBack}
                                    >
                                        <ArrowLeft className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="rounded-full h-8 text-xs hover:bg-white/10 hover:text-primary hidden md:flex mr-auto"
                                        onClick={handleBack}
                                    >
                                        <ArrowLeft className="h-3 w-3 mr-1" /> Back
                                    </Button>
                                    <p className="text-sm text-muted-foreground text-center md:text-left w-full flex-1 md:flex-none">Select a date to continue</p>
                                    
                                </div>
                                <div className="mb-2 w-full px-4">
                                    <h3 className="text-sm font-semibold text-center md:text-left">
                                        {date ? format(date, "MMMM yyyy") : "Month"}
                                    </h3>
                                </div>
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={handleDateSelect}
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

                            {/* Time Slots Section (Hidden on Mobile when in Date view) */}
                            <div className={cn(
                                "w-full md:w-40 border-t md:border-t-0 md:border-l border-white/10 p-4 bg-white/5 flex-col gap-3 transition-all duration-300",
                                view === "date" ? "hidden md:flex" : "flex h-full"
                            )}>
                                <div className="flex items-center justify-between mb-1 pt-1 md:pt-0">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="rounded-full h-8 w-8 hover:bg-white/10 md:hidden -ml-2"
                                        onClick={handleBack}
                                    >
                                        <ArrowLeft className="h-4 w-4" />
                                    </Button>
                                    <span className="text-xs font-medium text-muted-foreground mr-auto md:mr-0 pl-2 md:pl-0">{date ? format(date, "EEE d") : "Select date"}</span>
                                    {/* Mobile helper to clear date/go back */}
                                    <span className="text-[10px] text-primary md:hidden">Select time</span>
                                </div>
                                <ScrollArea className="flex-1 pr-2">
                                    <div className="flex md:flex-col gap-2 flex-col">
                                        {bookingConfig.availableSlots.map((time) => (
                                            <Button
                                                key={time}
                                                variant={selectedTime === time ? "default" : "outline"}
                                                className={cn(
                                                    "w-full justify-center rounded-lg border-white/10 hover:border-primary/50 hover:text-primary transition-all duration-200 h-10 md:h-8 text-sm md:text-xs bg-transparent hover:bg-white/5",
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
                                            className={cn(
                                                "rounded-lg border-white/10 bg-white/5 focus:bg-white/10 focus:border-primary/50 h-9 text-sm",
                                                errors.name && "border-red-500/50 focus:border-red-500"
                                            )}
                                        />
                                        {errors.name && <span className="text-[10px] text-red-500">{errors.name}</span>}
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label htmlFor="email" className="text-xs">Email address *</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="john@example.com"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className={cn(
                                                "rounded-lg border-white/10 bg-white/5 focus:bg-white/10 focus:border-primary/50 h-9 text-sm",
                                                errors.email && "border-red-500/50 focus:border-red-500"
                                            )}
                                        />
                                        {errors.email && <span className="text-[10px] text-red-500">{errors.email}</span>}
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
                                    <Button variant="ghost" onClick={handleBack} className="rounded-full h-8 text-sm hover:bg-white/5 hover:text-primary">Back</Button>
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
