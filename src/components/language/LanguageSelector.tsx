
import React from "react";
import { Flag } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Tuetut kielet
type Language = "fi" | "en" | "sv";

interface LanguageOption {
  value: Language;
  label: string;
  flag: string;
  iconColor: string;
}

const languages: LanguageOption[] = [
  { value: "fi", label: "Suomi", flag: "🇫🇮", iconColor: "#003580" }, // Finnish blue
  { value: "en", label: "English", flag: "🇬🇧", iconColor: "#012169" }, // UK blue
  { value: "sv", label: "Svenska", flag: "🇸🇪", iconColor: "#006AA7" }, // Swedish blue
];

interface LanguageSelectorProps {
  className?: string;
}

const LanguageSelector = ({ className }: LanguageSelectorProps) => {
  const [currentLanguage, setCurrentLanguage] = React.useState<Language>("fi");

  const handleLanguageChange = (language: Language) => {
    setCurrentLanguage(language);
    // Tässä voitaisiin jatkossa toteuttaa kielenvaihto esim. i18n-kirjaston avulla
    console.log(`Kieli vaihdettu: ${language}`);
  };

  // Haetaan nykyisen kielen tiedot
  const current = languages.find((lang) => lang.value === currentLanguage) || languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className={cn("flex items-center gap-2 h-9 px-2", className)}
        >
          <Flag className="h-4 w-4" color={current.iconColor} />
          <span className="text-lg">{current.flag}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-popover">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.value}
            onClick={() => handleLanguageChange(language.value)}
            className={cn(
              "cursor-pointer flex items-center gap-2",
              currentLanguage === language.value && "bg-muted font-medium"
            )}
          >
            <Flag className="h-4 w-4" color={language.iconColor} />
            <span className="text-lg">{language.flag}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
