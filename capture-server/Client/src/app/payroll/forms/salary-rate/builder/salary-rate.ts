
import { SelectItemView } from "src/app/blocks/collection-item";
import { AbstractBuilder } from "src/app/blocks/strategies";
import { Data } from "src/app/model-service/payroll-interface";
import { SalarytRateViews } from "../views/salary-rate";

export class SalarytRateBuilder implements AbstractBuilder<Data.SalaryRate, SalarytRateViews>{

    compose(m: Data.SalaryRate, v: SalarytRateViews) {
        v.dtwef = m.dt_wef;
        v.employees.Select((item: SelectItemView) => m.employee_id == item.key);
        v.designation.SelectedItem = m.designation;
        v.bank.SelectedItem = m.bank;
        v.bankAccountNumber = m.bank_acc_number;
        v.pan = m.pan;
        v.ctc = m.ctc;
        v.basicRate = m.basic_rate;
        v.hraRate = + m.hra_rate;
        v.conveyanceAllowance = m.conveyance_all
        v.medicalAllowance = m.medical_all;
        v.epfRate = m.epf_rate
    }

    decompose(v: SalarytRateViews): Data.SalaryRate {
        console.log(v)
        const salaryRateData = {
            id: v.id,
            dt_wef: v.dtwef,
            employee_id: v.employees.SelectedItem.key,
            hra_rate: v.hraRate,
            conveyance_all: v.conveyanceAllowance,
            medical_all: v.medicalAllowance,
            epf_rate: v.epfRate,
            ctc: v.ctc,
            basic_rate: v.basicRate,
            designation: v.designation.SelectedItem,
            bank: v.bank.SelectedItem,
            bank_acc_number: v.bankAccountNumber,
            pan: v.pan,

        }
        return salaryRateData

    }



    view(): SalarytRateViews {
        return new SalarytRateViews()
    }

}