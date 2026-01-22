import { useState } from "react";
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
import { ArrowRight, Linkedin, Twitter, Instagram } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import skybridgeLogo from "@/assets/skybridge-logo.png";

const projectTypes = [
  "Web Development",
  "Brand Strategy",
  "Digital Marketing",
  "Product Design",
  "E-Commerce",
  "Other",
];

const socialLinks = [
  { name: "LinkedIn", icon: Linkedin, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
];

const ContactFooter = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Message sent!",
      description: "We'll get back to you within 24 hours.",
    });

    setFormData({ name: "", email: "", projectType: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="relative">
      {/* Main Contact Section */}
      <div className="min-h-screen py-32 lg:py-48 relative">
        <div className="w-full px-6 lg:px-12 xl:px-20">
          <div className="grid lg:grid-cols-2 gap-24 lg:gap-32 items-start">
            {/* Left Column - Header */}
            <div className="lg:sticky lg:top-32 space-y-12">
              <div className="space-y-8">
                <span className="text-accent text-sm font-medium tracking-widest uppercase">
                  Contact
                </span>
                <h2 className="font-display text-5xl sm:text-6xl lg:text-[8vw] font-extrabold text-foreground leading-[0.9] tracking-tighter uppercase">
                  Let's
                  <br />
                  Talk
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
                  Let's discuss how we can transform your digital presence.
                  Every great partnership starts with a conversation.
                </p>
              </div>

              {/* Contact Info - Minimal */}
              <div className="space-y-4">
                <a href="mailto:hello@skybridge.digital" className="block text-foreground hover:text-accent transition-colors text-lg">
                  hello@skybridge.digital
                </a>
                <a href="tel:+15551234567" className="block text-foreground hover:text-accent transition-colors text-lg">
                  +1 (555) 123-4567
                </a>
                <p className="text-muted-foreground">
                  San Francisco, CA
                </p>
              </div>

              {/* Social Links - Minimal */}
              <div className="flex gap-8">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm uppercase tracking-widest"
                    aria-label={social.name}
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Right Column - Form - No card styling */}
            <div className="space-y-8">
              <div>
                <h3 className="font-display text-2xl font-extrabold text-foreground uppercase tracking-tight mb-2">
                  Start a project
                </h3>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll be in touch soon.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid sm:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label htmlFor="name" className="text-sm text-muted-foreground uppercase tracking-widest">
                      Name *
                    </label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      maxLength={100}
                      className="h-14 bg-transparent border-0 border-b border-border rounded-none px-0 text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:border-accent"
                    />
                  </div>

                  <div className="space-y-3">
                    <label htmlFor="email" className="text-sm text-muted-foreground uppercase tracking-widest">
                      Email *
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      maxLength={255}
                      className="h-14 bg-transparent border-0 border-b border-border rounded-none px-0 text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:border-accent"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label htmlFor="projectType" className="text-sm text-muted-foreground uppercase tracking-widest">
                    Project Type
                  </label>
                  <Select
                    value={formData.projectType}
                    onValueChange={(value) => setFormData({ ...formData, projectType: value })}
                  >
                    <SelectTrigger className="h-14 bg-transparent border-0 border-b border-border rounded-none px-0 text-foreground focus:ring-0 [&>span]:text-left">
                      <SelectValue placeholder="Select a project type" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-border z-50">
                      {projectTypes.map((type) => (
                        <SelectItem key={type} value={type} className="text-foreground">
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <label htmlFor="message" className="text-sm text-muted-foreground uppercase tracking-widest">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your project..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    maxLength={1000}
                    rows={4}
                    className="bg-transparent border-0 border-b border-border rounded-none px-0 text-foreground placeholder:text-muted-foreground resize-none focus-visible:ring-0 focus-visible:border-accent"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="group h-14 px-8 text-base bg-foreground text-background hover:bg-accent hover:text-accent-foreground rounded-none"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-2" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer - Minimal */}
      <div className="border-t border-border py-12 relative">
        <div className="w-full px-6 lg:px-12 xl:px-20">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src={skybridgeLogo}
                alt="Skybridge Digital"
                className="h-8 w-auto object-contain brightness-0 invert"
              />
            </div>
            <div className="flex flex-wrap items-center gap-8 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <span>© 2025 Skybridge Digital</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactFooter;