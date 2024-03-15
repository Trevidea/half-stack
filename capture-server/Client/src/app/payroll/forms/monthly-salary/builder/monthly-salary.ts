import { AbstractBuilder } from "src/app/blocks/strategies";
import { Data } from "src/app/model-service/payroll-interface";
import { MonthlySalaryView } from "../views/monthly-salary";
import { SelectItemView } from "src/app/blocks/collection-item";

export class MonthlySalaryBuilder implements AbstractBuilder<Data.MonthlySalary, MonthlySalaryView>{


    compose(m: Data.MonthlySalary, v: MonthlySalaryView) {
        console.log(m,v)
        v.id = m.id;
        v.employees.Select((item:SelectItemView)=> m.employee_id == item.key);
        v.employeeId=m.employee_id
        v.payRoll.Select((item:SelectItemView)=> m.payroll_id == item.key);
        v.basic=m.basic;
        v.hra=m.hra;
        v.actconveyance =m.act_conveyance;
        v.actMedicalall =m.act_medical_all;
        v.actSpecialall= m.act_special_all;
        v.epf=m.epf;
        v.tds=m.tds;
        v.advances=m.advances;
        v.income=m.income;
        v.deduction=m.deduction;
        v.netSalary=m.net_salary;
       
        
    }

//  actconveyance: v.actualConveyanceAllowance,
    decompose(v: MonthlySalaryView): Data.MonthlySalary {
       return{
        id:v.id,                         
        employee_id:v.employees.SelectedItem.key,
        payroll_id: v.payRoll.SelectedItem.key,
        basic:v.basic,
        hra: v.hra,
        act_conveyance: v.actconveyance,
        act_medical_all: v.actMedicalall,
        act_special_all: v.actSpecialall,
        epf: v.epf,
        tds: v.tds,
        advances: v.advances,
        income: v.income,
        deduction: v.deduction,
        net_salary:v.netSalary
             }
    }


    view(): MonthlySalaryView {
        return new MonthlySalaryView();
    }



    
}