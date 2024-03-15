import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { PresenterActions } from "src/app/blocks/actions";
import { Transformer } from "src/app/blocks/transformer";
import { ModelServiceService } from "src/app/model-service/model-service.service";
import { Views } from "src/app/model-service/payroll-interface";
import { AttendanceBuilder } from "./builders/attendance";
import { AttendanceView } from "./views/attendance";

@Component({
    selector: 'app-attendance-presenter',
    template: `<app-attendance [datasource]="ds" (save)="actions.onSave()" (cancel)="actions.onCancel()"></app-attendance>`,
    styleUrls: ['./attendance.component.scss'],
    encapsulation: ViewEncapsulation.None

})


export class AttendancePresenter implements OnInit {
    ds!: AttendanceView
    actions!: Views.FormActions

    constructor(public dataFactory: ModelServiceService, private router: Router, private route: ActivatedRoute) {

        this.ds = new AttendanceView();
        this.ds.id = route.snapshot.params['id'];

        // Special scenario - to be embedded in framework
        if ((this.ds.id as unknown) === 'null') { this.ds.id = null }
        ////////////////////////////////////////////////
        this.actions = new PresenterActions("attendances", this.ds, dataFactory.SaveAttendance, AttendanceBuilder, router);

    }

    ngOnInit(): void {
        if (this.ds.id) {
            Transformer.ComposeObjectAsync(this.dataFactory.AttendanceJson(this.ds.id), this.ds, AttendanceBuilder);
        }
    }
}