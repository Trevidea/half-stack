import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { SwalComponent } from "@sweetalert2/ngx-sweetalert2";
@Component({
  selector: "app-oven-media-server-form",
  templateUrl: "./oven-media-server-form.component.html",
  styleUrls: ["./oven-media-server-form.component.scss"],
})
export class OvenMediaServerFormComponent implements OnInit {
  @ViewChild("SweetAlertError") SweetAlertError: SwalComponent;
  @Input() datasource: any;
  constructor(
    public activeModal: NgbActiveModal,
    public modalService: NgbModal
  ) {}
  ngOnInit(): void {}

  formValidation(form: NgForm) {
    Object.keys(form.controls).forEach((key) => {
      const control = form.controls[key];
      if (control.invalid) {
        const inputElement = document.getElementsByName(key)[0] as HTMLElement;
        inputElement.style.border = "1px solid red";
      } else {
        const inputElement = document.getElementsByName(key)[0] as HTMLElement;
        inputElement.style.border = "1px solid #d8d6de";
      }
    });
  }
  onConfirm() {
    const formControls = document.querySelectorAll(".form-control");
    formControls.forEach((control) => {
      (control as HTMLElement).style.border = "1px solid #d8d6de";
    });
  }
}

/*

  formValidation(form: NgForm) {
    Object.keys(form.controls).forEach((key) => {
      const control = form.controls[key];
      const inputElement = document.getElementsByName(key)[0] as HTMLElement;
      if (control.invalid) {
        inputElement.style.border = "1px solid red";
        // Check if the warning icon already exists, if not, create and append it
        if (!inputElement.querySelector(".warning-icon")) {
          const warningIcon = document.createElement("i");
          warningIcon.classList.add(
            "fas",
            "fa-exclamation-triangle",
            "warning-icon"
          );
          inputElement.parentNode.insertBefore(
            warningIcon,
            inputElement.nextSibling
          );
        }
      } else {
        inputElement.style.border = "1px solid #d8d6de";
        const warningIcon = inputElement.querySelector(".warning-icon");
        if (warningIcon) {
          warningIcon.remove();
        }
      }
    });
  }
*/
