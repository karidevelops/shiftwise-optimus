
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ShiftCard } from "./ShiftCard";
import { format } from "date-fns";

interface EmployeeShift {
  id: number;
  employeeName: string;
  employeeInitials: string;
  role: string;
  time: string;
  type: "morning" | "day" | "evening" | "night";
  date: Date;
}

interface EmployeeShiftListProps {
  shifts: EmployeeShift[];
}

export function EmployeeShiftList({ shifts }: EmployeeShiftListProps) {
  // Group shifts by employee
  const shiftsByEmployee = shifts.reduce<Record<string, EmployeeShift[]>>(
    (acc, shift) => {
      if (!acc[shift.employeeName]) {
        acc[shift.employeeName] = [];
      }
      acc[shift.employeeName].push(shift);
      return acc;
    },
    {}
  );

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Työntekijä</TableHead>
            <TableHead>Rooli</TableHead>
            <TableHead>Työvuorot</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(shiftsByEmployee).map(([employeeName, employeeShifts]) => (
            <TableRow key={employeeName}>
              <TableCell className="font-medium">{employeeName}</TableCell>
              <TableCell>{employeeShifts[0].role}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-2">
                  {employeeShifts.map((shift) => (
                    <div key={shift.id} className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {format(new Date(shift.date), "dd.MM.yyyy")}:
                      </span>
                      <ShiftCard
                        employeeName={shift.employeeName}
                        employeeInitials={shift.employeeInitials}
                        role={shift.role}
                        time={shift.time}
                        type={shift.type}
                      />
                    </div>
                  ))}
                </div>
              </TableCell>
            </TableRow>
          ))}
          {Object.keys(shiftsByEmployee).length === 0 && (
            <TableRow>
              <TableCell colSpan={3} className="h-24 text-center">
                Ei määritettyjä työvuoroja.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
