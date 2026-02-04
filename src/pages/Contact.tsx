import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";

import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import { BookingModal } from "@/components/BookingModal";
import { Magnetic } from "@/components/Magnetic";
import { Sparkles } from "@/components/Sparkles";

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    projectType: z.string({
        required_error: "Please select a project type.",
    }),
    message: z.string().min(10, {
        message: "Message must be at least 10 characters.",
    }),
    budget: z.array(z.number()).default([2500]),
});

const Contact = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isBtnHovered, setIsBtnHovered] = useState(false);

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            message: "",
            budget: [2500],
        },
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            console.log(values);
            toast.success("Message sent successfully! We'll be in touch soon.");
            setIsSubmitting(false);
            form.reset();
        }, 2000);
    }

    return (
        <PageTransition>
            <div className="min-h-screen bg-black text-white flex flex-col font-sans selection:bg-accent selection:text-black overflow-hidden relative">
                <Navbar />

                <main className="flex-grow flex items-center justify-center relative z-10 w-full px-4 md:px-6 lg:px-8 pt-32 pb-12 lg:py-0 min-h-screen">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start lg:items-center w-full max-w-6xl 2xl:max-w-[80%] mx-auto">

                        {/* Left Column: Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                            className="flex flex-col space-y-10 lg:pr-10"
                        >
                            <div className="space-y-4">
                                <h1 className="font-display text-6xl md:text-7xl lg:text-[7vw] xl:text-[8vw] text-center sm:text-left font-black uppercase leading-[0.85] tracking-tighter text-white">
                                    Lets<br /><span className="text-gradient">Talk</span>
                                </h1>
                                <p className="text-muted-foreground text-lg md:text-xl max-w-sm leading-relaxed ml-1">
                                    Transform your digital presence with us.
                                </p>
                            </div>

                            <div className="flex flex-col-reverse sm:flex-row-reverse items-center sm:justify-end gap-10 sm:gap-16 pt-2 ml-1">
                                <BookingModal>
                                    <Magnetic>
                                        <div
                                            className="relative inline-block"
                                            onMouseEnter={() => setIsBtnHovered(true)}
                                            onMouseLeave={() => setIsBtnHovered(false)}
                                        >
                                            <Button
                                                size="lg"
                                                className="bg-white text-black hover:bg-white/90 rounded-full h-14 px-10 text-base font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] relative z-10"
                                            >
                                                Book a Call
                                            </Button>
                                            <Sparkles isActive={isBtnHovered} />
                                        </div>
                                    </Magnetic>
                                </BookingModal>
                                <div className="text-center sm:text-left space-y-4">
                                    <div>
                                        <a href="mailto:hello@skybridge.digital" className="block text-lg md:text-xl font-medium hover:text-accent transition-colors">
                                            hello@skybridge.digital
                                        </a>
                                        <a href="tel:+15551234567" className="block text-lg md:text-xl font-medium hover:text-accent transition-colors">
                                            +1 (555) 123-4567
                                        </a>
                                    </div>
                                    <div className="text-muted-foreground text-sm">
                                        <p>San Francisco, CA</p>
                                    </div>
                                    <div className="flex gap-4 pt-1">
                                        <a href="#" className="text-muted-foreground hover:text-white transition-colors uppercase text-xs tracking-widest">LinkedIn</a>
                                        <a href="#" className="text-muted-foreground hover:text-white transition-colors uppercase text-xs tracking-widest">Twitter</a>
                                        <a href="#" className="text-muted-foreground hover:text-white transition-colors uppercase text-xs tracking-widest">Instagram</a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Column: Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                            className="w-full"
                        >
                            <div className="bg-zinc-900/20 backdrop-blur-md p-6 md:p-8 rounded-2xl">
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <FormField
                                                control={form.control}
                                                name="name"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Input placeholder="Name *" {...field} className="bg-white/5 border-0 rounded-lg px-4 py-6 text-sm focus-visible:ring-1 focus-visible:ring-white/20 transition-all placeholder:text-zinc-500" />
                                                        </FormControl>
                                                        <FormMessage className="text-xs" />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="email"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Input placeholder="Email *" {...field} className="bg-white/5 border-0 rounded-lg px-4 py-6 text-sm focus-visible:ring-1 focus-visible:ring-white/20 transition-all placeholder:text-zinc-500" />
                                                        </FormControl>
                                                        <FormMessage className="text-xs" />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <FormField
                                            control={form.control}
                                            name="projectType"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger className="bg-white/5 border-0 rounded-lg px-4 py-6 text-sm focus:ring-1 focus:ring-white/20 focus:ring-offset-0 text-zinc-500 data-[state=checked]:text-white">
                                                                <SelectValue placeholder="Project Type" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                                                            <SelectItem value="web-development">Web Development</SelectItem>
                                                            <SelectItem value="digital-marketing">Digital Marketing</SelectItem>
                                                            <SelectItem value="branding">Branding</SelectItem>
                                                            <SelectItem value="other">Other</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage className="text-xs" />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="message"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="Tell us about your project *"
                                                            className="resize-none bg-white/5 border-0 rounded-lg px-4 py-4 min-h-[120px] text-sm focus-visible:ring-1 focus-visible:ring-white/20 transition-all placeholder:text-zinc-500"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="text-xs" />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="budget"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <div className="flex justify-between items-center mb-3">
                                                        <span className="text-xs text-muted-foreground uppercase tracking-wider">Budget Estimate</span>
                                                        <span className="text-xs font-bold text-white">${field.value[0].toLocaleString()}+</span>
                                                    </div>
                                                    <FormControl>
                                                        <Slider
                                                            min={500}
                                                            max={10000}
                                                            step={500}
                                                            value={field.value}
                                                            onValueChange={field.onChange}
                                                            className="py-1 cursor-pointer"
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="text-xs" />
                                                </FormItem>
                                            )}
                                        />

                                        <div className="pt-2">
                                            <Button
                                                type="submit"
                                                size="lg"
                                                disabled={isSubmitting}
                                                className="w-full bg-white text-black hover:bg-zinc-200 rounded-lg h-12 text-sm font-bold uppercase tracking-wider transition-all duration-300 relative overflow-hidden group"
                                            >
                                                <span className="relative z-10 flex items-center justify-center gap-2">
                                                    {isSubmitting ? "Sending..." : "Send Message"}
                                                    {!isSubmitting && <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
                                                </span>
                                            </Button>
                                        </div>
                                    </form>
                                </Form>
                            </div>
                        </motion.div>
                    </div>
                </main>
            </div>
        </PageTransition>
    );
};

export default Contact;
