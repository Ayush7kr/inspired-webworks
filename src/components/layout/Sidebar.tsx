import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Home,
  Calendar,
  MapPin,
  Users,
  Briefcase,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Calendar", href: "/calendar", icon: Calendar },
  { name: "Map", href: "/map", icon: MapPin },
  { name: "Clients", href: "/clients", icon: Users },
  { name: "Jobs", href: "/jobs", icon: Briefcase },
  { name: "Quotes", href: "/quotes", icon: FileText },
  { name: "My Services", href: "/services", icon: Settings },
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div className={cn(
      "relative flex flex-col h-screen bg-white border-r border-border/50 transition-all duration-300 shadow-soft",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border/50">
        {!isCollapsed && (
          <div className="flex items-center space-x-3 animate-fade-in">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-soft">
              <span className="text-white font-bold text-lg font-display">V</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gradient-primary font-display">VirShik</h1>
              <p className="text-xs text-muted-foreground font-medium">Professional Services</p>
            </div>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-muted transition-all duration-200 hover:scale-105"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden",
                isActive
                  ? "bg-gradient-primary text-white shadow-glow"
                  : "text-foreground hover:bg-muted/50 hover:shadow-soft hover:-translate-y-0.5"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 transition-colors",
                isActive ? "text-white" : "text-muted-foreground group-hover:text-foreground"
              )} />
              {!isCollapsed && (
                <span className={cn(
                  "font-medium transition-colors",
                  isActive ? "text-white" : "text-foreground"
                )}>
                  {item.name}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      {!isCollapsed && (
        <div className="p-4 border-t border-border/50">
          <div className="flex items-center space-x-3 p-4 rounded-xl bg-gradient-card border border-border/30 hover:shadow-soft transition-all duration-200 hover:scale-105">
            <div className="w-10 h-10 rounded-full bg-gradient-secondary flex items-center justify-center shadow-soft">
              <span className="text-white font-semibold text-sm">J</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">Julie Anderson</p>
              <p className="text-xs text-muted-foreground truncate">Administrator</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}