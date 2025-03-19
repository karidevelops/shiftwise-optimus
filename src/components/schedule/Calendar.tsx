
import { useState } from "react";
import { format, startOfWeek, addDays, isSameDay } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShiftCard, ShiftType } from "./ShiftCard";
import { cn } from "@/lib/utils";

interface Shift {
  id: number;
  employeeName: string;
  employeeInitials: string;
  role: string;
  time: string;
  type: ShiftType;
  date: Date;
}

interface CalendarProps {
  shifts?: Shift[];
}

export function Calendar({ shifts = [] }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Generate dates for the current week
  const startOfCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startOfCurrentWeek, i));
  
  // Navigate between weeks
  const goToPreviousWeek = () => {
    setCurrentDate(addDays(currentDate, -7));
  };
  
  const goToNextWeek = () => {
    setCurrentDate(addDays(currentDate, 7));
  };
  
  const goToToday = () => {
    setCurrentDate(new Date());
  };
  
  // Filter shifts for a specific day
  const getShiftsForDay = (date: Date) => {
    return shifts.filter(shift => {
      const shiftDate = new Date(shift.date);
      return isSameDay(shiftDate, date);
    });
  };
  
  return (
    <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
      <div className="p-4 border-b flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">
            {format(startOfCurrentWeek, "MMMM yyyy")}
          </h2>
          <p className="text-sm text-muted-foreground">
            Viikko {format(startOfCurrentWeek, "w")}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={goToToday}>
            Tänään
          </Button>
          <Button variant="outline" size="icon" onClick={goToPreviousWeek}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={goToNextWeek}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <ScrollArea className="h-[600px]">
        <div className="divide-y">
          {weekDays.map((day, dayIndex) => {
            const shiftsForDay = getShiftsForDay(day);
            const isToday = isSameDay(day, new Date());
            
            return (
              <div 
                key={dayIndex}
                className={cn(
                  "p-4",
                  isToday && "bg-primary/5"
                )}
              >
                <div className={cn(
                  "flex items-center mb-3",
                  isToday && "text-primary font-medium"
                )}>
                  <div className="w-12 text-center mr-3">
                    <p className="text-xs text-muted-foreground uppercase">
                      {format(day, "EEE")}
                    </p>
                    <p className="text-xl font-semibold">{format(day, "d")}</p>
                  </div>
                  <div className="flex-1 h-px bg-border"></div>
                </div>
                
                <div className="pl-14">
                  {shiftsForDay.length > 0 ? (
                    <div className="space-y-2">
                      {shiftsForDay.map((shift) => (
                        <ShiftCard
                          key={shift.id}
                          employeeName={shift.employeeName}
                          employeeInitials={shift.employeeInitials}
                          role={shift.role}
                          time={shift.time}
                          type={shift.type}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="py-4 text-center text-sm text-muted-foreground">
                      Ei työvuoroja
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
