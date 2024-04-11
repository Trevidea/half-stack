import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-event-undo-notification",
  templateUrl: "./event-undo-notification.component.html",
  styleUrls: ["./event-undo-notification.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class EventUndoNotificationComponent implements OnInit {
  @Input() title: string;
  @Input() description: string;
  @Input() undoEvent: boolean;
  @Output() selectedItems = new EventEmitter<any>();
  constructor(
    private modalService: NgbModal,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {}

  close() {
    this.undoEvent = true;
    this.activeModal.close(this.undoEvent);
  }
  undo() {
    this.undoEvent = false;
    this.activeModal.close(this.undoEvent);
  }
}
