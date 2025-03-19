
import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MoreHorizontal,
  Edit2,
  Trash2,
  UserPlus
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface Employee {
  id: number;
  name: string;
  avatar?: string;
  initials: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  status: "active" | "inactive" | "on-leave";
}

const EMPLOYEES_DATA: Employee[] = [
  {
    id: 1,
    name: "Matti Virtanen",
    initials: "MV",
    email: "matti.virtanen@esimerkki.fi",
    phone: "+358 50 123 4567",
    role: "Sairaanhoitaja",
    department: "Päivystys",
    status: "active"
  },
  {
    id: 2,
    name: "Liisa Korhonen",
    initials: "LK",
    email: "liisa.korhonen@esimerkki.fi",
    phone: "+358 40 123 4567",
    role: "Lääkäri",
    department: "Kirurgia",
    status: "active"
  },
  {
    id: 3,
    name: "Antti Mäkinen",
    initials: "AM",
    email: "antti.makinen@esimerkki.fi",
    phone: "+358 45 123 4567",
    role: "Sairaanhoitaja",
    department: "Lastentaudit",
    status: "on-leave"
  },
  {
    id: 4,
    name: "Leena Nieminen",
    initials: "LN",
    email: "leena.nieminen@esimerkki.fi",
    phone: "+358 50 987 6543",
    role: "Lääkäri",
    department: "Kardiologia",
    status: "active"
  },
  {
    id: 5,
    name: "Ville Järvinen",
    initials: "VJ",
    email: "ville.jarvinen@esimerkki.fi",
    phone: "+358 40 987 6543",
    role: "Vastaanottovirkailija",
    department: "Hallinto",
    status: "inactive"
  }
];

export function EmployeeList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [employees] = useState<Employee[]>(EMPLOYEES_DATA);

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: Employee["status"]) => {
    switch (status) {
      case "active":
        return "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20";
      case "inactive":
        return "bg-slate-500/10 text-slate-600 hover:bg-slate-500/20";
      case "on-leave":
        return "bg-amber-500/10 text-amber-600 hover:bg-amber-500/20";
      default:
        return "";
    }
  };

  return (
    <div className="bg-card rounded-xl border shadow-sm overflow-hidden animate-fade-in">
      <div className="p-4 border-b flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">Työntekijät</h2>
          <p className="text-sm text-muted-foreground">
            Hallinnoi henkilöstöä ja heidän tietojaan
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-full md:w-64">
            <Input
              placeholder="Etsi työntekijöitä..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          <Button className="whitespace-nowrap animate-button-click">
            <UserPlus className="h-4 w-4 mr-2" />
            Lisää työntekijä
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Työntekijä</TableHead>
              <TableHead>Yhteystiedot</TableHead>
              <TableHead>Tehtävä</TableHead>
              <TableHead>Osasto</TableHead>
              <TableHead>Tila</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee) => (
                <TableRow key={employee.id} className="animate-fade-in">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={employee.avatar} alt={employee.name} />
                        <AvatarFallback>{employee.initials}</AvatarFallback>
                      </Avatar>
                      <div className="font-medium">{employee.name}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <div className="flex items-center text-sm">
                        <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                        {employee.email}
                      </div>
                      <div className="flex items-center text-sm mt-1">
                        <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                        {employee.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{employee.role}</TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(employee.status)}>
                      {employee.status === "on-leave" ? "Lomalla" : 
                        employee.status === "active" ? "Aktiivinen" : "Poissa"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Avaa valikko</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="cursor-pointer">
                          <Edit2 className="h-4 w-4 mr-2" />
                          Muokkaa
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Poista
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center h-24">
                  <User className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    Hakuehdolla ei löytynyt työntekijöitä
                  </p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
