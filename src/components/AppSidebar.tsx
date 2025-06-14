
import { NavLink, useLocation } from "react-router-dom";
import { Home, FileText, Rss, ChartBar, ChevronsLeft, ChevronsRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/cv", label: "CV", icon: FileText },
  { href: "/substack", label: "Substack", icon: Rss },
  { href: "/dashboard", label: "Dashboard", icon: ChartBar },
];

export function AppSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const getNavCls = (path: string) => {
    return cn(
      "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
      location.pathname === path
        ? "bg-primary/10 text-primary"
        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
    );
  };

  return (
    <div
      className={cn(
        "hidden md:flex flex-col h-screen bg-card border-r transition-all duration-300 ease-in-out",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <div className={cn("px-4", isCollapsed ? "text-center" : "flex items-center")}>
          {!isCollapsed && <h1 className="text-xl font-bold font-display text-primary">Portfolio</h1>}
        </div>
        <nav className="mt-5 flex-1 px-2 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.href}
              className={getNavCls(item.href)}
              end
            >
              <item.icon className={cn("h-6 w-6", !isCollapsed && "mr-3")} />
              {!isCollapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="flex-shrink-0 flex border-t p-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full"
        >
          {isCollapsed ? <ChevronsRight className="h-5 w-5" /> : <ChevronsLeft className="h-5 w-5" />}
        </Button>
      </div>
    </div>
  );
}
