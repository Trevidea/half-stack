import { AbstractBuilder } from "src/app/blocks/strategies";
import { Data } from "src/app/model-service/payroll-interface";
import { SickLeaveView } from "../views/sick-leave-view";
import { SelectItemView } from "src/app/blocks/collection-item";

export class SickLeaveBuilder  implements AbstractBuilder<Data.SickLeave, SickLeaveView>
{
    compose(m: Data.SickLeave, v: SickLeaveView) {
        v.count = m.count;
        v.dateFrom = m.dt_from;
        v.dateOfApplication = m.dt_application;
        v.medicalDoc = m.medical_doc;
        v.employeeCode.Select((item: SelectItemView) => { return item.key == m.employee_id })
        v.id = m.id
        v.description = m.description;
    }
    decompose(v: SickLeaveView): Data.SickLeave {
        return {
            
            count: v.count,
            description: v.description,
            employee_id: v.employeeCode.SelectedItem.key,
            dt_application: v.dateOfApplication,
            dt_from: v.dateFrom,
            id: v.id,
            medical_doc: v.medicalDoc
        }
    }
    view(): SickLeaveView {
        throw new Error("Method not implemented.");
    }

}