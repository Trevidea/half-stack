import { AbstractBuilder } from "src/app/blocks/strategies";
import { Data } from "src/app/model-service/payroll-interface";
import { EmployeeView } from "../views/employee";

// export class EmployeePayrollBuilder implements AbstractBuilder<Data.PayrollEmployee, EmployeeView>
// {
//     compose(m: Data.PayrollEmployee, v: EmployeeView) {
//         v.bank.SelectedItem = m.bank
//         v.bankAccountNumber = m.bankaccountnumber
//         v.basicRate = m.basicrate
//         v.conveyanceAllowance = m.conveyanceallowance
//         v.ctc = m.ctc
//         v.epfRate = m.epfrate
//         v.hraRate = m.hrarate
//         v.medicalAllowance = m.medicalallowance
//         v.pan = m.pan
//     }
//     decompose(v: EmployeeView): Data.PayrollEmployee {
//         return
//     }
//     view(): EmployeeView {
//         throw new Error("Method not implemented.");
//     }

// }