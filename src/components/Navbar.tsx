import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom"; // Import Link and useLocation
import skybridgeLogo from "@/assets/skybridge-logo-black-bg.png";

import { Button } from "./ui/button";
import { BookingModal } from "./BookingModal";
import { LiquidDistortion } from "./LiquidDistortion";
import { Magnetic } from "./Magnetic";
import { StaggeredText } from "./StaggeredText";

const navLinks = [
  { name: "Services", href: "/#services" },
  { name: "Work", href: "/case-studies" },
  { name: "Process", href: "/#process" },
  { name: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Determine visibility state (hide on scroll down, show on scroll up)
      if (currentScrollY > lastScrollY && currentScrollY > 100 && !mobileMenuOpen) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, mobileMenuOpen]);

  // Handle hash scrolling if on same page or navigating to it
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#")) {
      const hash = href.replace("/", "");
      if (location.pathname === "/") {
        e.preventDefault();
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${!isVisible ? "-translate-y-[200%]" : "translate-y-0"
          }`}
      >
        <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-full px-2 py-2 flex items-center gap-4 sm:gap-8 shadow-2xl shadow-black/50 transition-all duration-500 ease-out will-change-transform">

          {/* Left: Menu Toggle */}
          <Magnetic>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="group flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-full transition-all duration-300"
              aria-label="Toggle menu"
            >
              <div className="w-8 h-8 flex items-center justify-center bg-foreground text-background rounded-full group-hover:scale-90 transition-transform">
                {mobileMenuOpen ? (
                  <X className="w-4 h-4 transition-transform group-hover:rotate-90 duration-300" />
                ) : (
                  <Menu className="w-4 h-4 transition-transform group-hover:rotate-180 duration-300" />
                )}
              </div>
              <span className="text-xs font-medium uppercase tracking-wider hidden sm:block pr-1">Menu</span>
            </button>
          </Magnetic>

          {/* Center: Logo */}
          <div className="flex items-center justify-center group min-w-[120px]">
            <Link to="/" className="block hover:opacity-80 transition-opacity">
              <img
                src={skybridgeLogo}
                alt="Skybridge Systems"
                className="h-10 group-hover:h-16 w-auto object-contain brightness-0 invert transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
              />
            </Link>
          </div>

          {/* Right: Contact CTA */}
          <LiquidDistortion>
            <Button
              asChild
              size="sm"
              className="rounded-full px-2 sm:px-5 h-10 text-xs font-bold uppercase tracking-widest bg-accent text-accent-foreground hover:bg-accent/90 shadow-[0_0_15px_-3px_hsl(var(--accent))]"
            >
              <Link to="/contact">
                Contact Us
              </Link>
            </Button>
          </LiquidDistortion>

        </div>
      </nav>

      {/* Mobile Menu - Full Screen Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-3xl supports-[backdrop-filter]:bg-black/40 transition-all duration-500 ${mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
      >
        <div className="flex flex-col justify-center h-full px-6 pt-20 w-full text-center">
          {/* Logo in Menu for context */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 opacity-50 grayscale">
            <img
              src={skybridgeLogo}
              alt="Skybridge Digital"
              className="h-8 w-auto object-contain brightness-0 invert"
            />
          </div>

          {navLinks.map((link, index) => {
            const isHash = link.href.startsWith("/#");

            if (isHash) {
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`group block w-full overflow-hidden py-3 transition-all duration-300 ${mobileMenuOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                    }`}
                  style={{ transitionDelay: `${index * 75}ms` }}
                >
                  <div className="text-4xl md:text-6xl font-display font-extrabold text-foreground uppercase tracking-tight">
                    <StaggeredText text={link.name} />
                  </div>
                </a>
              );
            }

            return (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`group block w-full overflow-hidden py-3 transition-all duration-300 ${mobileMenuOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
                  }`}
                style={{ transitionDelay: `${index * 75}ms` }}
              >
                <div className="text-4xl md:text-6xl font-display font-extrabold text-foreground uppercase tracking-tight">
                  <StaggeredText text={link.name} />
                </div>
              </Link>
            );
          })}

          {/* Booking CTA in Menu for Mobile */}
          <LiquidDistortion>
            <div className={`mt-12 transition-all duration-500 delay-300 ${mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <BookingModal>
                <Button size="lg" className="rounded-full text-lg h-14 px-8 hover:bg-accent hover:text-accent-foreground">Book a Strategy Call</Button>
              </BookingModal>
            </div>
          </LiquidDistortion>

        </div>
      </div>
    </>
  );
};

export default Navbar;
