
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

export type ShiftType = "morning" | "day" | "evening" | "night";

interface ShiftCardProps {
  employeeName: string;
  employeeAvatar?: string;
  employeeInitials: string;
  role: string;
  time: string;
  type: ShiftType;
  isDragging?: boolean;
  onClick?: () => void;
  onEdit?: () => void;
}

export function ShiftCard({
  employeeName,
  employeeAvatar,
  employeeInitials,
  role,
  time,
  type,
  isDragging = false,
  onClick,
  onEdit
}: ShiftCardProps) {
  const getTypeStyles = () => {
    switch (type) {
      case "morning":
        return "border-shift-morning/50 bg-shift-morning/5";
      case "day":
        return "border-shift-day/50 bg-shift-day/5";
      case "evening":
        return "border-shift-evening/50 bg-shift-evening/5";
      case "night":
        return "border-shift-night/50 bg-shift-night/5";
      default:
        return "border-border bg-background";
    }
  };

  const getTimeColor = () => {
    switch (type) {
      case "morning":
        return "text-shift-morning";
      case "day":
        return "text-shift-day";
      case "evening":
        return "text-shift-evening";
      case "night":
        return "text-shift-night";
      default:
        return "text-foreground";
    }
  };

  return (
    <Card
      onClick={onClick}
      className={cn(
        "animate-shift-hover cursor-pointer border-2 transition-all duration-150 overflow-hidden",
        getTypeStyles(),
        isDragging && "opacity-75 shadow-lg scale-105",
        "hover:shadow-md"
      )}
    >
      <CardContent className="p-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8 border-2 border-white">
            <AvatarImage src={employeeAvatar} alt={employeeName} />
            <AvatarFallback>{employeeInitials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">{employeeName}</p>
            <p className="text-xs text-muted-foreground">{role}</p>
          </div>
          <div className={cn("text-sm font-medium whitespace-nowrap", getTimeColor())}>
            {time}
          </div>
          {onEdit && (
            <Button 
              variant="ghost" 
              size="icon"
              className="h-8 w-8 p-0 ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
            >
              <Pencil className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
