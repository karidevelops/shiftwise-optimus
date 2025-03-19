
import React from "react";
import { Globe } from "lucide-react";
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
}

const languages: LanguageOption[] = [
  { value: "fi", label: "Suomi", flag: "🇫🇮" },
  { value: "en", label: "English", flag: "🇬🇧" },
  { value: "sv", label: "Svenska", flag: "🇸🇪" },
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
          <span className="text-lg">{current.flag}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-popover">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.value}
            onClick={() => handleLanguageChange(language.value)}
            className={cn(
              "cursor-pointer",
              currentLanguage === language.value && "bg-muted font-medium"
            )}
          >
            <span className="text-lg">{language.flag}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
