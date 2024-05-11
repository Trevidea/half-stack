import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from "@angular/core";
import {
  NgbDateAdapter,
  NgbDateParserFormatter,
  NgbDateStruct,
  NgbModal,
} from "@ng-bootstrap/ng-bootstrap";
import {
  CustomAdapter,
  CustomDateParserFormatter,
} from "app/blocks/ngb-date-converter";
import Swal from "sweetalert2";
import { ConnectionAlertComponent } from "../../connection/connection-alert/connection-alert.component";
import { Router } from "@angular/router";
@Component({
  selector: "app-create-on-demand-event",
  templateUrl: "./create-on-demand-event.component.html",
  styleUrls: ["./create-on-demand-event.component.scss"],
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
  ],
})
export class CreateOnDemandEventComponent implements OnInit {
  @Input() datasource: any;

  model: NgbDateStruct;
  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter();
  constructor(private modelService: NgbModal, private router: Router) { }

  ngOnInit(): void {
    console.log(this.datasource.time);

  }
  onCancelClick() {
    Swal.close();
  }

  onYesClick() {
    this.cancel.emit();
  }

 
  onSave(id: number) {
    if (id) {
      console.log("id of event ", id)
    }
    console.log("clicked save");
    this.save.emit();
  }

  formatTime(time: any): number {
    if (!time) return 0;
    const [hours, minutes] = time.split(':');
    let formattedTime = hours + minutes;
    return parseInt(formattedTime);
  }

  modalOpenSM(modalblock) {
    const modeldata = this.modelService.open(ConnectionAlertComponent, {
      centered: true,
      windowClass: "delete-event",
      size: "sm",
    });

    modeldata.componentInstance.undoEvent = false;
    modeldata.componentInstance.title = "Delete Event";
    modeldata.componentInstance.description =
      "Are you sure you <strong> doesn’t want</strong> to <br> create this event?";

    modeldata.componentInstance.passEntry.subscribe((receivedEntry) => {
      if (receivedEntry) {
        this.router.navigate(["event"]);
      }
    });
  }

  _formatTime(time: number): string {
    const hours = Math.floor(time / 100);
    const minutes = time % 100;
    const formattedHours = hours < 10 ? '0' + hours : hours.toString();
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes.toString();
    return formattedHours + ':' + formattedMinutes;
  }
}
