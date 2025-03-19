
import React from "react";
import { FlagTriangleRight } from "lucide-react";
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
  flagFill: string;
}

const languages: LanguageOption[] = [
  { 
    value: "fi", 
    label: "Suomi", 
    flag: "🇫🇮", 
    iconColor: "#003580", 
    flagFill: "#FFFFFF" 
  },
  { 
    value: "en", 
    label: "English", 
    flag: "🇬🇧", 
    iconColor: "#012169", 
    flagFill: "#FFFFFF" 
  },
  { 
    value: "sv", 
    label: "Svenska", 
    flag: "🇸🇪", 
    iconColor: "#006AA7", 
    flagFill: "#FFCD00" 
  },
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
          <FlagTriangleRight 
            className="h-5 w-5" 
            color={current.iconColor} 
            fill={current.flagFill} 
          />
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
            <FlagTriangleRight 
              className="h-5 w-5" 
              color={language.iconColor}
              fill={language.flagFill}
            />
            <span className="text-sm">{language.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
