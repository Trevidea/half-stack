import { AbstractBuilder } from "src/app/blocks/strategies";
import { Data } from "src/app/model-service/payroll-interface";
import { SalarytRateViews } from "../views/salary-rate";

// dtjoining: string,
// weeklyoff: string,
// lastname: string,
// designation: string,
// department: string,
// holidaycat: string,
// code: string,
// firstname: string
export class EmployeeBuilder implements AbstractBuilder<Data.Employee, SalarytRateViews>
{
    compose(m: Data.Employee, v: SalarytRateViews) {
        v.designation.SelectedItem=m.designation;
    }
    decompose(v: SalarytRateViews): Data.Employee {
        throw new Error("Method not implemented.");
    }
    view(): SalarytRateViews {
        return new SalarytRateViews();
    }


}