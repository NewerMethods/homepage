
import { NavLink } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Menu, RectangleHorizontal } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/cv", label: "CV" },
  { href: "/substack", label: "Substack" },
  { href: "/dashboard", label: "Dashboard" },
];

export function AppHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <NavLink to="/" className="mr-6 flex items-center space-x-2">
             <RectangleHorizontal className="h-8 w-auto text-primary transition-opacity hover:opacity-80" />
          </NavLink>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="hidden md:flex">
            <NavigationMenu>
              <NavigationMenuList>
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.label}>
                    <NavLink to={item.href} end>
                      {({ isActive }) => (
                        <NavigationMenuLink active={isActive} className={navigationMenuTriggerStyle()}>
                          {item.label}
                        </NavigationMenuLink>
                      )}
                    </NavLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
          <div className="md:hidden">
            <Drawer open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <DrawerTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Toggle Menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="p-4 pt-8">
                  <nav className="grid gap-4">
                    {navItems.map((item) => (
                      <NavLink
                        key={item.label}
                        to={item.href}
                        end
                        onClick={() => setMobileMenuOpen(false)}
                        className={({ isActive }) =>
                          `text-lg font-medium transition-colors hover:text-primary ${isActive ? "text-primary" : "text-foreground"}`
                        }
                      >
                        {item.label}
                      </NavLink>
                    ))}
                  </nav>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
    </header>
  );
}
