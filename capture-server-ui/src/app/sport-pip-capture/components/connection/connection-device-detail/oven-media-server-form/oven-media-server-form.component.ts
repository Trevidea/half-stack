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
    console.log(form);
    Object.keys(form.controls).forEach((key) => {
      const control = form.controls[key];
      if (control.invalid) {
        const inputElement = document.getElementsByName(key)[0] as HTMLElement;
        inputElement.style.borderColor = "red";
      } else {
        const inputElement = document.getElementsByName(key)[0] as HTMLElement;
        inputElement.style.borderColor = "";
      }
    });
  }
  onConfirm() {
    const formControls = document.querySelectorAll(".form-control");
    formControls.forEach((control) => {
      (control as HTMLElement).style.borderColor = "";
    });
  }
}
