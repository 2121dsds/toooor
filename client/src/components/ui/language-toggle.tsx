import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/hooks/use-language";

export function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all duration-300 border border-white/20 dark:bg-gray-800/20 dark:border-gray-700/20 dark:hover:bg-gray-800/30"
        >
          <Languages className="h-4 w-4 text-muted-foreground dark:text-gray-200" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="glass-card border-0 bg-white/90 backdrop-blur-xl dark:bg-gray-800/90">
        <DropdownMenuItem
          onClick={() => setLanguage("ar")}
          className={`cursor-pointer transition-colors text-muted-foreground dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 ${
            language === "ar" ? "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200" : ""
          }`}
        >
          🇸🇦 {t("arabic")}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLanguage("en")}
          className={`cursor-pointer transition-colors text-muted-foreground dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 ${
            language === "en" ? "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200" : ""
          }`}
        >
          🇺🇸 {t("english")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}