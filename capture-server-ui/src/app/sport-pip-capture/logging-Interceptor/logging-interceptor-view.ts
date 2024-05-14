import { DatePipe } from "@angular/common";
import { NgbDate } from "@ng-bootstrap/ng-bootstrap";
import { Collection, Range } from "app/blocks/collection";
import { UI } from "app/blocks/ui-utils";
import { Views } from "app/sport-pip-capture/models/capture-interface";

export class LogInterceptorView implements Views.Datasource {
  id: number;
}
