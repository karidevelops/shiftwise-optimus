
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { CalendarIcon, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ShiftType } from "./ShiftCard";
import { Input } from "../ui/input";

// Sample employee data
const EMPLOYEES = [
  { id: 1, name: "Matti Virtanen", initials: "MV", role: "Sairaanhoitaja" },
  { id: 2, name: "Liisa Korhonen", initials: "LK", role: "Lääkäri" },
  { id: 3, name: "Antti Mäkinen", initials: "AM", role: "Vastaanottovirkailija" },
  { id: 4, name: "Johanna Nieminen", initials: "JN", role: "Vartija" },
  { id: 5, name: "Mikko Järvinen", initials: "MJ", role: "Sairaanhoitaja" },
  { id: 6, name: "Laura Lahtinen", initials: "LL", role: "Lääkäri" },
];

// Sample shift types
const SHIFT_TYPES = [
  { id: "morning", name: "Aamuvuoro", time: "6:00 - 14:00" },
  { id: "day", name: "Päivävuoro", time: "9:00 - 17:00" },
  { id: "evening", name: "Iltavuoro", time: "14:00 - 22:00" },
  { id: "night", name: "Yövuoro", time: "22:00 - 6:00" },
];

const formSchema = z.object({
  employeeId: z.number({ required_error: "Valitse työntekijä" }),
  shiftType: z.string({ required_error: "Valitse vuorotyyppi" }),
  date: z.date({ required_error: "Valitse päivämäärä" }),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface Shift {
  id: number;
  employeeName: string;
  employeeInitials: string;
  role: string;
  time: string;
  type: ShiftType;
  date: Date;
}

interface AddShiftDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddShift: (shiftData: any) => void;
  editingShift?: Shift | null;
}

export function AddShiftDialog({ open, onOpenChange, onAddShift, editingShift }: AddShiftDialogProps) {
  const isEditing = !!editingShift;
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startTime: "",
      endTime: "",
    },
  });

  // Update form values when editing an existing shift
  useEffect(() => {
    if (editingShift) {
      // Extract employee ID
      const employeeId = EMPLOYEES.find(emp => emp.name === editingShift.employeeName)?.id || 1;
      
      // Extract time values if possible
      let startTime = "";
      let endTime = "";
      const timeParts = editingShift.time.split(" - ");
      if (timeParts.length === 2) {
        startTime = timeParts[0];
        endTime = timeParts[1];
      }
      
      form.reset({
        employeeId,
        shiftType: editingShift.type,
        date: new Date(editingShift.date),
        startTime,
        endTime
      });
    } else {
      form.reset({
        startTime: "",
        endTime: "",
      });
    }
  }, [editingShift, form]);

  const handleAddShift = (data: FormValues) => {
    const employee = EMPLOYEES.find((emp) => emp.id === data.employeeId);
    const shiftType = SHIFT_TYPES.find((type) => type.id === data.shiftType);
    
    if (!employee || !shiftType) return;
    
    const shiftData = {
      id: editingShift ? editingShift.id : Math.floor(Math.random() * 1000),
      employeeName: employee.name,
      employeeInitials: employee.initials,
      role: employee.role,
      time: data.startTime && data.endTime 
        ? `${data.startTime} - ${data.endTime}` 
        : shiftType.time,
      type: data.shiftType as ShiftType,
      date: data.date,
    };
    
    onAddShift(shiftData);
    form.reset();
    onOpenChange(false);
    
    toast.success(isEditing ? "Vuoro päivitetty onnistuneesti" : "Vuoro lisätty onnistuneesti", {
      description: `${employee.name}: ${format(data.date, "dd.MM.yyyy")} ${shiftData.time}`,
    });
  };

  const onSubmit = form.handleSubmit(handleAddShift);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Muokkaa työvuoroa" : "Lisää uusi työvuoro"}</DialogTitle>
          <DialogDescription>
            {isEditing 
              ? "Muokkaa työntekijän työvuoroa. Täytä kaikki pakolliset kentät." 
              : "Määritä työntekijän työvuoro. Täytä kaikki pakolliset kentät."}
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-4">
            <FormField
              control={form.control}
              name="employeeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Työntekijä</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(parseInt(value))}
                    defaultValue={field.value?.toString()}
                    value={field.value?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Valitse työntekijä" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {EMPLOYEES.map((employee) => (
                        <SelectItem key={employee.id} value={employee.id.toString()}>
                          {employee.name} ({employee.role})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="shiftType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vuorotyyppi</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Valitse vuorotyyppi" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {SHIFT_TYPES.map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.name} ({type.time})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Päivämäärä</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "dd.MM.yyyy")
                          ) : (
                            <span>Valitse päivämäärä</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alkamisaika (valinnainen)</FormLabel>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                      <Input type="time" {...field} />
                    </div>
                    <FormDescription>
                      Jätä tyhjäksi käyttääksesi oletusaikaa
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="endTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Päättymisaika (valinnainen)</FormLabel>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                      <Input type="time" {...field} />
                    </div>
                    <FormDescription>
                      Jätä tyhjäksi käyttääksesi oletusaikaa
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
                Peruuta
              </Button>
              <Button type="submit">{isEditing ? "Tallenna muutokset" : "Lisää vuoro"}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
