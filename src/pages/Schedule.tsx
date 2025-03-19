
import Layout from "@/components/layout/Layout";
import { Calendar } from "@/components/schedule/Calendar";
import { Button } from "@/components/ui/button";
import { 
  Calendar as CalendarIcon, 
  ChevronDown, 
  UserPlus, 
  Filter 
} from "lucide-react";

const Schedule = () => {
  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Schedule</h1>
            <p className="text-muted-foreground">
              Manage and organize employee shifts
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="animate-button-click">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" className="animate-button-click">
              <CalendarIcon className="h-4 w-4 mr-2" />
              View
              <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
            <Button className="ml-auto animate-button-click">
              <UserPlus className="h-4 w-4 mr-2" />
              Add Shift
            </Button>
          </div>
        </div>

        <Calendar />

        <div className="bg-muted/50 rounded-lg p-4 border border-border">
          <p className="text-sm">
            <span className="font-medium">Pro Tip:</span> Drag and drop shifts to quickly reschedule employees. Click on any shift to see details and make adjustments.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Schedule;
