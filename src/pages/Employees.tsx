
import Layout from "@/components/layout/Layout";
import { EmployeeList } from "@/components/employees/EmployeeList";

const Employees = () => {
  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Työntekijät</h1>
          <p className="text-muted-foreground">
            Hallinnoi henkilökuntaa ja heidän tietojaan
          </p>
        </div>

        <EmployeeList />
      </div>
    </Layout>
  );
};

export default Employees;
