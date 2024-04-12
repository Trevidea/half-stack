import { Component, ViewEncapsulation, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-pip-conformation-modal",
  templateUrl: "./pip-conformation-modal.component.html",
  styleUrls: ["./pip-conformation-modal.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class PipConformationModalComponent implements OnInit {
  //   @Input()
  @Input()
  header = { isHeader: false };
  @Input() icon = {
    backgroundColor: "",
    iconType: "!",
    color: "rgba(245, 163, 10, 1)",
  };
  @Input() title: string = "Delete Event";
  @Input() description: string =
    "Are you sure you doesn’t want to <br> create this event? ";
  @Input() buttonOne = { lable: "No", backgroundColor: "" };
  @Input() buttonTwo = {
    lable: "Yes Sure",
    backgroundColor: "rgba(33, 96, 147, 1)",
  };
  ngOnInit(): void {}
}
// rgba(195, 195, 195, 1)
