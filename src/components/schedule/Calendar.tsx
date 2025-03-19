import { useState } from "react";
import { format, startOfWeek, addDays, isSameDay } from "date-fns";
import { ChevronLeft, ChevronRight, UserPlus, Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShiftCard, ShiftType } from "./ShiftCard";
import { cn } from "@/lib/utils";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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
  onEditShift?: (shift: Shift) => void;
  onDeleteShift?: (shiftId: number) => void;
  onChangeEmployee?: (shiftId: number, newEmployeeId: number) => void;
}

const EMPLOYEES = [
  { id: 1, name: "Matti Virtanen", initials: "MV", role: "Sairaanhoitaja" },
  { id: 2, name: "Liisa Korhonen", initials: "LK", role: "Lääkäri" },
  { id: 3, name: "Antti Mäkinen", initials: "AM", role: "Vastaanottovirkailija" },
  { id: 4, name: "Johanna Nieminen", initials: "JN", role: "Vartija" },
  { id: 5, name: "Mikko Järvinen", initials: "MJ", role: "Sairaanhoitaja" },
  { id: 6, name: "Laura Lahtinen", initials: "LL", role: "Lääkäri" },
];

export function Calendar({ shifts = [], onEditShift, onDeleteShift, onChangeEmployee }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedShift, setSelectedShift] = useState<Shift | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showChangeEmployeeDialog, setShowChangeEmployeeDialog] = useState(false);
  
  const startOfCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startOfCurrentWeek, i));
  
  const goToPreviousWeek = () => {
    setCurrentDate(addDays(currentDate, -7));
  };
  
  const goToNextWeek = () => {
    setCurrentDate(addDays(currentDate, 7));
  };
  
  const goToToday = () => {
    setCurrentDate(new Date());
  };
  
  const getShiftsForDay = (date: Date) => {
    return shifts.filter(shift => {
      const shiftDate = new Date(shift.date);
      return isSameDay(shiftDate, date);
    });
  };

  const handleEditShift = (shift: Shift) => {
    if (onEditShift) {
      onEditShift(shift);
    }
  };

  const handleDeleteShift = () => {
    if (selectedShift && onDeleteShift) {
      onDeleteShift(selectedShift.id);
      setShowDeleteDialog(false);
      setSelectedShift(null);
    }
  };

  const handleChangeEmployee = (employeeId: number) => {
    if (selectedShift && onChangeEmployee) {
      onChangeEmployee(selectedShift.id, employeeId);
      setShowChangeEmployeeDialog(false);
      setSelectedShift(null);
    }
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
                        <ContextMenu key={shift.id}>
                          <ContextMenuTrigger>
                            <div className="group relative">
                              <ShiftCard
                                employeeName={shift.employeeName}
                                employeeInitials={shift.employeeInitials}
                                role={shift.role}
                                time={shift.time}
                                type={shift.type}
                                onEdit={() => {
                                  setSelectedShift(shift);
                                  handleEditShift(shift);
                                }}
                              />
                            </div>
                          </ContextMenuTrigger>
                          <ContextMenuContent>
                            <ContextMenuItem 
                              onClick={() => {
                                setSelectedShift(shift);
                                handleEditShift(shift);
                              }}
                            >
                              <Pencil className="mr-2 h-4 w-4" />
                              <span>Muokkaa vuoroa</span>
                            </ContextMenuItem>
                            <ContextMenuItem
                              onClick={() => {
                                setSelectedShift(shift);
                                setShowChangeEmployeeDialog(true);
                              }}
                            >
                              <UserPlus className="mr-2 h-4 w-4" />
                              <span>Vaihda työntekijää</span>
                            </ContextMenuItem>
                            <ContextMenuSeparator />
                            <ContextMenuItem
                              className="text-destructive"
                              onClick={() => {
                                setSelectedShift(shift);
                                setShowDeleteDialog(true);
                              }}
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              <span>Poista vuoro</span>
                            </ContextMenuItem>
                          </ContextMenuContent>
                        </ContextMenu>
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

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Poista työvuoro</AlertDialogTitle>
            <AlertDialogDescription>
              Haluatko varmasti poistaa tämän työvuoron? Tätä toimintoa ei voi kumota.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Peruuta</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteShift} className="bg-destructive text-destructive-foreground">
              Poista
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={showChangeEmployeeDialog} onOpenChange={setShowChangeEmployeeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Vaihda työntekijää</DialogTitle>
            <DialogDescription>
              Valitse uusi työntekijä tälle työvuorolle.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2 py-4">
            {EMPLOYEES.map((employee) => (
              <div 
                key={employee.id} 
                className="flex items-center p-2 rounded-md hover:bg-muted cursor-pointer"
                onClick={() => handleChangeEmployee(employee.id)}
              >
                <div className="bg-primary/10 text-primary rounded-full h-8 w-8 flex items-center justify-center mr-3">
                  {employee.initials}
                </div>
                <div>
                  <p className="font-medium">{employee.name}</p>
                  <p className="text-sm text-muted-foreground">{employee.role}</p>
                </div>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowChangeEmployeeDialog(false)}>
              Peruuta
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
