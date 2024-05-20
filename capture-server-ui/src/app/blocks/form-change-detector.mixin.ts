import {
  AfterViewInit,
  ViewChild,
  ElementRef,
  Injectable,
} from "@angular/core";
import { NgForm } from "@angular/forms";
import { DeepDiffService } from "./deep-diff.service";
@Injectable({
  providedIn: "root",
})
export class FormChangeDetector implements AfterViewInit {
  form: NgForm;
  changesDetected = false;
  changedFields: { [key: string]: { oldValue: any; newValue: any } } = {};
  initialFormValues: any;

  constructor(private deepDiffService: DeepDiffService) {}

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
      console.log("Changes detected in form:", this.changedFields);
    }
  }

  initializeForm(form: NgForm, initialValues: any, id?: number) {
    this.form = form;
    if (id !== undefined) {
      // Merge the id into initial values if provided
      this.initialFormValues = { ...initialValues, id };
    } else {
      this.initialFormValues = JSON.parse(JSON.stringify(initialValues));
    }
    // Set the form values
    form.setValue(this.initialFormValues);
  }
}
