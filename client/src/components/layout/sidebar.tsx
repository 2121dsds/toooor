import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/hooks/use-language";
import { useEffect, useState } from "react";
import { 
  Bot, 
  BarChart3, 
  Store, 
  CreditCard, 
  MessageSquare, 
  Brain, 
  TrendingUp,
  BookOpen,
  Ticket,
  Bell,
  MessageCircle,
  Palette,
  UserCog,
  Settings,
  Home,
  Gift,
  Video
} from "lucide-react";

// Sidebar items with translation keys
const sidebarItems = [
  {
    titleKey: "dashboard",
    href: "/",
    icon: Home
  },
  {
    titleKey: "stores",
    href: "/stores",
    icon: Store
  },
  {
    titleKey: "subscriptions",
    href: "/subscriptions",
    icon: CreditCard
  },
  {
    titleKey: "messages",
    href: "/messages",
    icon: MessageSquare
  },
  {
    titleKey: "ai_replies",
    href: "/ai-replies",
    icon: Brain
  },
  {
    titleKey: "analytics",
    href: "/analytics",
    icon: TrendingUp
  },
  {
    titleKey: "notifications",
    href: "/notifications",
    icon: Bell
  },
  {
    titleKey: "admins",
    href: "/admins",
    icon: UserCog
  },
  {
    titleKey: "tickets",
    href: "/tickets",
    icon: Ticket
  },
  {
    titleKey: "knowledge_base",
    href: "/knowledge-base",
    icon: BookOpen
  },
  {
    titleKey: "tutorials",
    href: "/tutorials",
    icon: Video
  },
  {
    titleKey: "feedback",
    href: "/feedback",
    icon: MessageCircle
  },
  {
    titleKey: "invites_offers",
    href: "/invites-offers",
    icon: Gift
  },
  {
    titleKey: "settings",
    href: "/system-settings",
    icon: Settings
  }
];

export function Sidebar() {
  const { t } = useLanguage();
  const [isCentralNotificationsEnabled, setIsCentralNotificationsEnabled] = useState(() => typeof window !== 'undefined' && localStorage.getItem('centralNotifications') === 'true');
  const [glow, setGlow] = useState(false);

  useEffect(() => {
    const handler = () => {
      setIsCentralNotificationsEnabled(localStorage.getItem('centralNotifications') === 'true');
    };
    window.addEventListener('storage', handler);
    // دعم التحديث الفوري عند تغيير نفس الصفحة
    window.addEventListener('centralNotificationsChanged', handler);
    return () => {
      window.removeEventListener('storage', handler);
      window.removeEventListener('centralNotificationsChanged', handler);
    };
  }, []);

  useEffect(() => {
    if (isCentralNotificationsEnabled) {
      setGlow(true);
      const timeout = setTimeout(() => setGlow(false), 1500);
      return () => clearTimeout(timeout);
    } else {
      setGlow(false);
    }
  }, [isCentralNotificationsEnabled]);

  return (
    <div className="w-20 glass-card rounded-r-3xl m-4 mr-0 p-4 flex flex-col items-center h-[96vh] max-h-[96vh] overflow-y-auto scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-transparent select-none">
      {/* Sara Logo */}
      <div className="flex flex-col items-center space-y-4 mb-8 animate-fade-in">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-float shadow-lg">
          <Bot className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="space-y-2 flex flex-col items-center w-full">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isNotifications = item.titleKey === 'notifications';
          const isHome = item.titleKey === 'dashboard';
          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  'sidebar-nav-btn flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 relative group',
                  isActive 
                    ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg scale-110' 
                    : 'hover:bg-white/20 text-foreground hover:scale-105',
                  isNotifications && glow ? 'scale-110 z-10' : '',
                  isHome && isActive ? 'ring-2 ring-purple-300 ring-offset-2' : ''
                )
              }
              end
            >
              <Icon className={cn(
                "w-5 h-5 transition-all", 
                isNotifications && glow ? "[text-shadow:0_0_12px_rgba(168,85,247,0.9),0_0_4px_rgba(168,85,247,0.7)] scale-110" : ""
              )} />
              
              {/* Tooltip */}
              <div className="absolute left-full ml-2 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-sm font-medium text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-lg">
                {t(item.titleKey)}
              </div>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}
