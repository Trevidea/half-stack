import { AfterViewInit, Injectable } from "@angular/core";
import { NgForm } from "@angular/forms";
import { DeepDiffService } from "./deep-diff.service";
import { ModelServiceService } from "app/sport-pip-capture/models/model-service.service";
@Injectable({ providedIn: "root" })
export class FormChangeDetector implements AfterViewInit {
  form: NgForm;
  changesDetected = false;
  changedFields: { [key: string]: { oldValue: any; newValue: any } };
  initialFormValues: any;

  constructor(
    public deepDiffService: DeepDiffService,
    public modelServiceService: ModelServiceService
  ) {}

  ngAfterViewInit() {
    if (this.form) {
      this.form.valueChanges.subscribe((formValues) => {
        this.detectChanges(formValues);
      });
    }
  }

  detectChanges(formValues: any) {
    this.changedFields = this.deepDiffService.deepDiff(
      this.initialFormValues,
      formValues
    );
    this.changesDetected = Object.keys(this.changedFields).length > 0;
    if (this.changesDetected) {
      // console.log("this.changedFields::::", this.changedFields);
      // this.modelServiceService.handleChangedFields(this.changedFields);
      return this.changedFields;
    }
  }

  initializeForm(form: NgForm, initialValues: any, eventId?: number) {
    this.form = form;
    const timestamp = new Date()
      .toISOString()
      .replace("T", " ")
      .replace("Z", "");
    if (eventId !== undefined) {
      this.initialFormValues = { ...initialValues, eventId };
    } else {
      this.initialFormValues = JSON.parse(JSON.stringify(initialValues));
    }

    form.setValue(this.initialFormValues);
  }
}
