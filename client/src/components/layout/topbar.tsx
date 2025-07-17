import { Search, Bell, Moon, Sun, LogOut, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/hooks/use-theme";
import { useLanguage } from "@/hooks/use-language";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LanguageToggle } from "@/components/ui/language-toggle";

interface TopBarProps {
  onLogout?: () => void;
}

export function TopBar({ onLogout }: TopBarProps) {
  const { theme, setTheme } = useTheme();
  const { t } = useLanguage();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="glass-card rounded-2xl p-6 mb-6 flex justify-between items-center animate-fade-in m-4 ml-0">
      {/* Left side - Search */}
      <div className="flex items-center space-x-6">
        {/* Search Bar */}
        <div className="relative">
          <Input 
            placeholder="Search..." 
            className="w-96 bg-white/60 backdrop-blur-sm border-white/50 rounded-xl pl-10 pr-4 py-3 text-foreground placeholder-muted-foreground focus:bg-white/80 focus:border-white/70 transition-all duration-300 dark:bg-gray-800/30 dark:border-gray-700/30 dark:text-gray-200 dark:placeholder-gray-400 dark:focus:bg-gray-800/40 dark:focus:border-gray-600/50 shadow-lg"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground" />
        </div>
      </div>
      
      {/* Right side - Actions */}
      <div className="flex items-center space-x-4">
        {/* Language Toggle */}
        <LanguageToggle />
        
        {/* Theme Toggle */}
        <Button 
          variant="ghost" 
          size="icon"
          onClick={toggleTheme}
          className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all duration-300 border border-white/20 dark:bg-gray-800/20 dark:border-gray-700/20 dark:hover:bg-gray-800/30"
        >
          {theme === "light" ? (
            <Moon className="h-4 w-4 text-foreground dark:text-gray-200" />
          ) : (
            <Sun className="h-4 w-4 text-foreground dark:text-gray-200" />
          )}
        </Button>
        
        {/* User Profile */}
        <div className="flex items-center space-x-3">
          <Button 
            variant="ghost" 
            size="icon"
            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all duration-300 border border-white/20 dark:bg-gray-800/20 dark:border-gray-700/20 dark:hover:bg-gray-800/30"
          >
            <User className="h-4 w-4 text-foreground dark:text-gray-200" />
          </Button>
        </div>
        
        {/* Logout Button */}
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onLogout}
          className="w-10 h-10 bg-red-500/20 backdrop-blur-sm rounded-xl hover:bg-red-500/30 transition-all duration-300 border border-red-500/20 dark:bg-red-500/20 dark:border-red-500/20 dark:hover:bg-red-500/30"
          title="Logout"
        >
          <LogOut className="h-4 w-4 text-red-600 dark:text-red-400" />
        </Button>
      </div>
    </div>
  );
}
