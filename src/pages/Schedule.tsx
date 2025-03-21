
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Calendar } from "@/components/schedule/Calendar";
import { Button } from "@/components/ui/button";
import { 
  Calendar as CalendarIcon, 
  ChevronDown, 
  UserPlus, 
  Filter,
  List
} from "lucide-react";
import { AddShiftDialog } from "@/components/schedule/AddShiftDialog";
import { EmployeeShiftList } from "@/components/schedule/EmployeeShiftList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShiftType } from "@/components/schedule/ShiftCard";
import { toast } from "sonner";

// Define the shift interface
interface Shift {
  id: number;
  employeeName: string;
  employeeInitials: string;
  role: string;
  time: string;
  type: ShiftType;
  date: Date;
}

const Schedule = () => {
  const [shifts, setShifts] = useState<Shift[]>([
    {
      id: 1,
      employeeName: "Matti Virtanen",
      employeeInitials: "MV",
      role: "Sairaanhoitaja",
      time: "6:00 - 14:00",
      type: "morning",
      date: new Date(2023, 5, 12)
    },
    {
      id: 2,
      employeeName: "Liisa Korhonen",
      employeeInitials: "LK",
      role: "Lääkäri",
      time: "9:00 - 17:00",
      type: "day",
      date: new Date(2023, 5, 12)
    },
    {
      id: 3,
      employeeName: "Antti Mäkinen",
      employeeInitials: "AM",
      role: "Vastaanottovirkailija",
      time: "14:00 - 22:00",
      type: "evening",
      date: new Date(2023, 5, 13)
    },
    {
      id: 4,
      employeeName: "Johanna Nieminen",
      employeeInitials: "JN",
      role: "Vartija",
      time: "22:00 - 6:00",
      type: "night",
      date: new Date(2023, 5, 14)
    },
    {
      id: 5,
      employeeName: "Mikko Järvinen",
      employeeInitials: "MJ",
      role: "Sairaanhoitaja",
      time: "9:00 - 17:00",
      type: "day",
      date: new Date(2023, 5, 14)
    },
    {
      id: 6,
      employeeName: "Laura Lahtinen",
      employeeInitials: "LL",
      role: "Lääkäri",
      time: "14:00 - 22:00",
      type: "evening",
      date: new Date(2023, 5, 15)
    }
  ]);
  
  const [isAddShiftOpen, setIsAddShiftOpen] = useState(false);
  const [currentEditingShift, setCurrentEditingShift] = useState<Shift | null>(null);
  const [viewMode, setViewMode] = useState<"calendar" | "list">("calendar");
  
  const handleAddShift = (newShift: Shift) => {
    setShifts((prevShifts) => [...prevShifts, newShift]);
  };

  const handleEditShift = (shift: Shift) => {
    setCurrentEditingShift(shift);
    setIsAddShiftOpen(true);
    toast.info("Muokataan vuoroa", {
      description: `${shift.employeeName}: ${shift.time}`
    });
  };

  const handleDeleteShift = (shiftId: number) => {
    setShifts(prevShifts => prevShifts.filter(shift => shift.id !== shiftId));
    toast.success("Vuoro poistettu", {
      description: "Työvuoro on poistettu onnistuneesti."
    });
  };

  const handleChangeEmployee = (shiftId: number, newEmployeeId: number) => {
    // Find the employee from a predefined list
    const EMPLOYEES = [
      { id: 1, name: "Matti Virtanen", initials: "MV", role: "Sairaanhoitaja" },
      { id: 2, name: "Liisa Korhonen", initials: "LK", role: "Lääkäri" },
      { id: 3, name: "Antti Mäkinen", initials: "AM", role: "Vastaanottovirkailija" },
      { id: 4, name: "Johanna Nieminen", initials: "JN", role: "Vartija" },
      { id: 5, name: "Mikko Järvinen", initials: "MJ", role: "Sairaanhoitaja" },
      { id: 6, name: "Laura Lahtinen", initials: "LL", role: "Lääkäri" },
    ];
    
    const newEmployee = EMPLOYEES.find(emp => emp.id === newEmployeeId);
    if (!newEmployee) return;
    
    setShifts(prevShifts => 
      prevShifts.map(shift => 
        shift.id === shiftId 
          ? {
              ...shift,
              employeeName: newEmployee.name,
              employeeInitials: newEmployee.initials,
              role: newEmployee.role
            }
          : shift
      )
    );
    
    toast.success("Työntekijä vaihdettu", {
      description: `Uusi työntekijä: ${newEmployee.name}`
    });
  };

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Työvuorot</h1>
            <p className="text-muted-foreground">
              Hallinnoi ja järjestä työntekijöiden vuoroja
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="animate-button-click">
              <Filter className="h-4 w-4 mr-2" />
              Suodata
            </Button>
            <Tabs 
              value={viewMode} 
              onValueChange={(value) => setViewMode(value as "calendar" | "list")}
              className="inline-flex"
            >
              <TabsList className="h-10">
                <TabsTrigger value="calendar" className="px-3">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  Kalenteri
                </TabsTrigger>
                <TabsTrigger value="list" className="px-3">
                  <List className="h-4 w-4 mr-2" />
                  Lista
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <Button 
              className="ml-auto animate-button-click"
              onClick={() => {
                setCurrentEditingShift(null);
                setIsAddShiftOpen(true);
              }}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Lisää vuoro
            </Button>
          </div>
        </div>

        <Tabs value={viewMode} className="space-y-6">
          <TabsContent value="calendar" className="mt-0 space-y-6">
            <Calendar 
              shifts={shifts} 
              onEditShift={handleEditShift}
              onDeleteShift={handleDeleteShift}
              onChangeEmployee={handleChangeEmployee}
            />
          </TabsContent>
          <TabsContent value="list" className="mt-0 space-y-6">
            <EmployeeShiftList shifts={shifts} />
          </TabsContent>
        </Tabs>

        <div className="bg-muted/50 rounded-lg p-4 border border-border">
          <p className="text-sm">
            <span className="font-medium">Pro-vinkki:</span> Vedä ja pudota vuoroja siirtääksesi niitä nopeasti. Klikkaa mitä tahansa vuoroa nähdäksesi yksityiskohdat ja tehdäksesi muutoksia.
          </p>
        </div>
      </div>

      <AddShiftDialog 
        open={isAddShiftOpen} 
        onOpenChange={setIsAddShiftOpen}
        onAddShift={handleAddShift}
        editingShift={currentEditingShift}
      />
    </Layout>
  );
};

export default Schedule;
