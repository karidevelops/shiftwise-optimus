
import { useEffect, useState } from "react";
import { StatCard } from "@/components/ui/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, Users, ClipboardList, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShiftCard } from "@/components/schedule/ShiftCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";

// Esimerkkidata kaavioille
const weeklyData = [
  { name: "Ma", value: 12 },
  { name: "Ti", value: 19 },
  { name: "Ke", value: 15 },
  { name: "To", value: 22 },
  { name: "Pe", value: 26 },
  { name: "La", value: 18 },
  { name: "Su", value: 10 },
];

const monthlyData = [
  { name: "Viikko 1", planned: 88, actual: 85 },
  { name: "Viikko 2", planned: 92, actual: 90 },
  { name: "Viikko 3", planned: 95, actual: 97 },
  { name: "Viikko 4", planned: 90, actual: 86 },
];

// Esimerkkidata tuleville vuoroille
const upcomingShifts = [
  {
    id: 1,
    employeeName: "Johanna Koskinen",
    employeeInitials: "JK",
    role: "Sairaanhoitaja",
    time: "6:00 - 14:00",
    type: "morning" as const,
  },
  {
    id: 2,
    employeeName: "Mikko Saarinen",
    employeeInitials: "MS",
    role: "Lääkäri",
    time: "9:00 - 17:00",
    type: "day" as const,
  },
  {
    id: 3,
    employeeName: "Sanna Heikkinen",
    employeeInitials: "SH",
    role: "Vastaanottovirkailija",
    time: "14:00 - 22:00",
    type: "evening" as const,
  },
];

export function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Päivitä aika joka minuutti
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Kojelauta</h1>
          <p className="text-muted-foreground">
            {currentTime.toLocaleDateString('fi-FI', {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <div className="flex gap-2">
          <Button>
            <ClipboardList className="h-4 w-4 mr-2" />
            Luo raportti
          </Button>
        </div>
      </div>

      {/* Yleiskatsaus-kortit */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Työntekijät yhteensä"
          value="36"
          icon={<Users className="h-5 w-5" />}
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Aikataulutetut tunnit"
          value="1 285"
          icon={<Clock className="h-5 w-5" />}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Avoimet vuorot"
          value="7"
          icon={<Calendar className="h-5 w-5" />}
          trend={{ value: 3, isPositive: false }}
        />
        <StatCard
          title="Työntekijätyytyväisyys"
          value="92%"
          icon={<BarChart3 className="h-5 w-5" />}
          trend={{ value: 5, isPositive: true }}
        />
      </div>

      {/* Kaaviot */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1 animate-fade-in">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Viikon henkilöstökattavuus</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={weeklyData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="hsl(var(--primary))" 
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-1 animate-fade-in">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Kuukauden tuntien analyysi</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }} 
                />
                <Legend />
                <Bar dataKey="planned" name="Suunnitellut tunnit" fill="hsl(var(--primary))" />
                <Bar dataKey="actual" name="Toteutuneet tunnit" fill="hsl(var(--accent))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Alarivi */}
      <div className="grid gap-4 md:grid-cols-7">
        {/* Päivän vuorot */}
        <Card className="col-span-7 md:col-span-3 animate-fade-in">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Tämän päivän vuorot</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="upcoming">
              <TabsList className="mb-4">
                <TabsTrigger value="upcoming">Tulevat</TabsTrigger>
                <TabsTrigger value="ongoing">Käynnissä</TabsTrigger>
                <TabsTrigger value="completed">Valmis</TabsTrigger>
              </TabsList>
              <TabsContent value="upcoming" className="space-y-3">
                {upcomingShifts.map((shift) => (
                  <ShiftCard
                    key={shift.id}
                    employeeName={shift.employeeName}
                    employeeInitials={shift.employeeInitials}
                    role={shift.role}
                    time={shift.time}
                    type={shift.type}
                  />
                ))}
                <div className="mt-3 flex justify-center">
                  <Button variant="outline" size="sm">Näytä kaikki</Button>
                </div>
              </TabsContent>
              <TabsContent value="ongoing">
                <div className="py-8 text-center text-muted-foreground">
                  <Clock className="mx-auto h-8 w-8 mb-2" />
                  <p>Ei käynnissä olevia vuoroja</p>
                </div>
              </TabsContent>
              <TabsContent value="completed">
                <div className="py-8 text-center text-muted-foreground">
                  <ClipboardList className="mx-auto h-8 w-8 mb-2" />
                  <p>Ei valmiita vuoroja tänään</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Ilmoitukset ja tehtävät */}
        <Card className="col-span-7 md:col-span-4 animate-fade-in">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Viimeisimmät tapahtumat</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex">
                <div className="mr-4 flex flex-col items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div className="h-full w-px bg-border"></div>
                </div>
                <div className="space-y-1 pt-1">
                  <p className="text-sm font-medium">Työvuorojen jako valmis</p>
                  <p className="text-sm text-muted-foreground">
                    Viikkoaikataulu 36 työntekijälle on luotu
                  </p>
                  <p className="text-xs text-muted-foreground">35 minuuttia sitten</p>
                </div>
              </div>
              <div className="flex">
                <div className="mr-4 flex flex-col items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
                    <Calendar className="h-5 w-5 text-accent" />
                  </div>
                  <div className="h-full w-px bg-border"></div>
                </div>
                <div className="space-y-1 pt-1">
                  <p className="text-sm font-medium">Uusi vuoropyyntö</p>
                  <p className="text-sm text-muted-foreground">
                    Johanna Koskinen pyysi vaihtaa vuoroa Mikko Saarisen kanssa
                  </p>
                  <p className="text-xs text-muted-foreground">2 tuntia sitten</p>
                </div>
              </div>
              <div className="flex">
                <div className="mr-4 flex flex-col items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
                    <Clock className="h-5 w-5 text-destructive" />
                  </div>
                </div>
                <div className="space-y-1 pt-1">
                  <p className="text-sm font-medium">Aikatauluristiriita havaittu</p>
                  <p className="text-sm text-muted-foreground">
                    Päällekkäisyys havaittu Sanna Heikkisen aikataulussa
                  </p>
                  <p className="text-xs text-muted-foreground">4 tuntia sitten</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
