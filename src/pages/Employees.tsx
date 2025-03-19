
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { EmployeeList } from "@/components/employees/EmployeeList";
import { toast } from "@/components/ui/use-toast";

const Employees = () => {
  // Handle employee actions (these would typically interact with an API)
  const handleEditEmployee = (employeeId: number) => {
    toast({
      title: "Muokkaus aloitettu",
      description: `Työntekijän ID: ${employeeId} muokkaus aloitettu`,
    });
  };

  const handleDeleteEmployee = (employeeId: number) => {
    toast({
      title: "Työntekijä poistettu",
      description: `Työntekijä ID: ${employeeId} poistettu järjestelmästä`,
      variant: "destructive",
    });
  };

  const handleChangeRole = (employeeId: number, newRole: string) => {
    toast({
      title: "Rooli vaihdettu",
      description: `Työntekijän ID: ${employeeId} rooli vaihdettu: ${newRole}`,
    });
  };

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Työntekijät</h1>
          <p className="text-muted-foreground">
            Hallinnoi henkilökuntaa ja heidän tietojaan
          </p>
        </div>

        <EmployeeList 
          onEditEmployee={handleEditEmployee}
          onDeleteEmployee={handleDeleteEmployee}
          onChangeRole={handleChangeRole}
        />
      </div>
    </Layout>
  );
};

export default Employees;
