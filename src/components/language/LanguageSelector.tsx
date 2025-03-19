
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
  flag: React.ReactNode;
}

const languages: LanguageOption[] = [
  { 
    value: "fi", 
    label: "Suomi", 
    flag: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1800 1100"
        className="h-5 w-7"
      >
        <rect width="1800" height="1100" fill="#fff" />
        <rect width="1800" height="300" y="400" fill="#003580" />
        <rect width="300" height="1100" x="500" fill="#003580" />
      </svg>
    )
  },
  { 
    value: "en", 
    label: "English", 
    flag: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 60 30"
        className="h-5 w-7"
      >
        <clipPath id="s">
          <path d="M0,0 v30 h60 v-30 z" />
        </clipPath>
        <clipPath id="t">
          <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
        </clipPath>
        <g clipPath="url(#s)">
          <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
          <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4" />
          <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
          <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
        </g>
      </svg>
    )
  },
  { 
    value: "sv", 
    label: "Svenska", 
    flag: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 10"
        className="h-5 w-7"
      >
        <rect width="16" height="10" fill="#006AA7" />
        <rect width="2" height="10" x="5" fill="#FECC00" />
        <rect width="16" height="2" y="4" fill="#FECC00" />
      </svg>
    )
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
          {current.flag}
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
            {language.flag}
            <span className="text-sm">{language.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
