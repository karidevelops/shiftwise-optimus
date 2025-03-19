
import React, { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Calendar, BarChart3, Users, Settings, 
  Menu, X, BellRing, Search
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface LayoutProps {
  children: ReactNode;
}

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  to: string;
  active?: boolean;
}

const NavItem = ({ icon: Icon, label, to, active }: NavItemProps) => {
  return (
    <Link to={to} className="w-full">
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start mb-1 gap-3 font-normal h-12 px-4",
          active
            ? "bg-primary/10 text-primary hover:bg-primary/15"
            : "hover:bg-secondary"
        )}
      >
        <Icon className={cn("h-5 w-5", active ? "text-primary" : "opacity-70")} />
        <span>{label}</span>
        {active && (
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full" />
        )}
      </Button>
    </Link>
  );
};

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  // Path-based navigation
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-sidebar transform transition-transform duration-300 ease-in-out",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
          "lg:relative lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full py-6">
          {/* Logo */}
          <div className="px-6 mb-8">
            <h1 className="text-2xl font-semibold tracking-tight">
              <span className="text-primary">Shift</span>Wise
            </h1>
          </div>

          {/* Main navigation */}
          <div className="px-3 flex-1">
            <nav className="space-y-1">
              <NavItem
                icon={BarChart3}
                label="Dashboard"
                to="/"
                active={isActive("/")}
              />
              <NavItem
                icon={Calendar}
                label="Schedule"
                to="/schedule"
                active={isActive("/schedule")}
              />
              <NavItem
                icon={Users}
                label="Employees"
                to="/employees"
                active={isActive("/employees")}
              />
              <NavItem
                icon={Settings}
                label="Settings"
                to="/settings"
                active={isActive("/settings")}
              />
            </nav>
          </div>

          {/* User profile */}
          <div className="px-4 mt-auto">
            <Separator className="my-4" />
            <div className="flex items-center gap-3 py-2">
              <Avatar className="h-9 w-9">
                <AvatarImage src="/placeholder.svg" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">John Doe</span>
                <span className="text-xs text-muted-foreground">Administrator</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm border-b h-16">
          <div className="flex items-center justify-between px-4 h-full lg:px-8">
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
              <span className="sr-only">Toggle menu</span>
            </Button>

            {/* Search bar */}
            <div className="hidden md:flex max-w-md w-full relative ml-8">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="pl-10 bg-muted/50 border-none focus-visible:ring-1"
              />
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="text-muted-foreground">
                <BellRing className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-4 lg:p-8 animate-fade-in">
          {children}
        </main>
      </div>

      {/* Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
