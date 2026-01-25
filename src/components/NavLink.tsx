import { NavLink as RouterNavLink, NavLinkProps } from "react-router-dom";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { LiquidDistortion } from "./LiquidDistortion";

interface NavLinkCompatProps extends Omit<NavLinkProps, "className" | "children"> {
  className?: string;
  activeClassName?: string;
  pendingClassName?: string;
  children?: React.ReactNode;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className, activeClassName, pendingClassName, to, children, ...props }, ref) => {
    return (
      <RouterNavLink
        ref={ref}
        to={to}
        className={({ isActive, isPending }) =>
          cn(
            "group relative inline-flex items-center justify-center overflow-hidden px-1 py-2 text-sm font-medium transition-colors duration-300",
            isActive ? "text-foreground" : "text-foreground/70 hover:text-foreground",
            className,
            isActive && activeClassName,
            isPending && pendingClassName
          )
        }
        {...props}
      >
        <LiquidDistortion className="relative z-10 transition-transform duration-300 group-hover:-translate-y-[2px]">
          {children}
        </LiquidDistortion>
        <span className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-primary transition-transform duration-300 ease-out group-hover:scale-x-100" />
      </RouterNavLink>
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };
