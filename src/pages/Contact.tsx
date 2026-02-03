
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { motion } from "framer-motion";
import { ArrowRight, Instagram, Linkedin, Twitter } from "lucide-react";

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
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import FooterTunnel from "@/components/FooterTunnel";
import { toast } from "sonner";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

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
            <div className="min-h-screen bg-black text-white flex flex-col font-sans selection:bg-accent selection:text-black">
                <Navbar />

                <main className="flex-grow pt-24 pb-12 px-4 lg:px-12 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start max-w-6xl mx-auto">

                        {/* Left Column: Info */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                            className="flex flex-col space-y-8"
                        >
                            <div className="space-y-2">
                                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.85] tracking-tighter mix-blend-difference">
                                    Let's<br />Talk
                                </h1>
                            </div>

                            <p className="text-muted-foreground text-base md:text-lg max-w-sm leading-relaxed">
                                Let's discuss how we can transform your digital presence.
                            </p>

                            <div className="space-y-6 pt-4">
                                <div className="space-y-1">
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

                                <div className="flex gap-4 pt-2">
                                    <a href="#" className="text-muted-foreground hover:text-white transition-colors uppercase text-xs tracking-widest">LinkedIn</a>
                                    <a href="#" className="text-muted-foreground hover:text-white transition-colors uppercase text-xs tracking-widest">Twitter</a>
                                    <a href="#" className="text-muted-foreground hover:text-white transition-colors uppercase text-xs tracking-widest">Instagram</a>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Column: Form */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                            className="bg-zinc-900/30 backdrop-blur-sm border border-white/5 p-6 md:p-8 rounded-2xl"
                        >
                            <div className="mb-6">
                                <h3 className="text-lg font-medium text-muted-foreground">Fill out the form below and we'll be in touch soon.</h3>
                            </div>

                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-[10px] uppercase tracking-widest text-muted-foreground">Name *</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Your name" {...field} className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 py-4 text-sm focus-visible:ring-0 focus-visible:border-white transition-colors placeholder:text-zinc-700" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-[10px] uppercase tracking-widest text-muted-foreground">Email *</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="your@email.com" {...field} className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 py-4 text-sm focus-visible:ring-0 focus-visible:border-white transition-colors placeholder:text-zinc-700" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <FormField
                                        control={form.control}
                                        name="projectType"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-[10px] uppercase tracking-widest text-muted-foreground">Project Type</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 py-4 text-sm focus:ring-0 focus:ring-offset-0">
                                                            <SelectValue placeholder="Select a project type" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                                                        <SelectItem value="web-development">Web Development</SelectItem>
                                                        <SelectItem value="digital-marketing">Digital Marketing</SelectItem>
                                                        <SelectItem value="branding">Branding</SelectItem>
                                                        <SelectItem value="other">Other</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="message"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-[10px] uppercase tracking-widest text-muted-foreground">Message *</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Tell us about your project..."
                                                        className="resize-none bg-transparent border-0 border-b border-white/20 rounded-none px-0 py-2 min-h-[80px] text-sm focus-visible:ring-0 focus-visible:border-white transition-colors placeholder:text-zinc-700"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="budget"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="flex justify-between items-center mb-2">
                                                    <FormLabel className="text-[10px] uppercase tracking-widest text-muted-foreground">Budget (USD)</FormLabel>
                                                    <span className="text-xs font-medium text-accent">${field.value[0].toLocaleString()}+</span>
                                                </div>
                                                <FormControl>
                                                    <Slider
                                                        min={500}
                                                        max={10000}
                                                        step={500}
                                                        value={field.value}
                                                        onValueChange={field.onChange}
                                                        className="py-2 cursor-pointer"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="pt-2 flex justify-end">
                                        <Button
                                            type="submit"
                                            size="lg"
                                            disabled={isSubmitting}
                                            className="bg-white text-black hover:bg-white/90 rounded-none h-12 px-6 text-sm font-medium transition-all duration-300 relative overflow-hidden group"
                                        >
                                            <span className="relative z-10 flex items-center gap-2">
                                                {isSubmitting ? "Sending..." : "Send Message"}
                                                {!isSubmitting && <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
                                            </span>
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </motion.div>
                    </div>
                </main>
            </div>
        </PageTransition>
    );
};

export default Contact;
