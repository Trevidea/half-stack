import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { OffCanvasComponent } from 'src/app/pages/blocks/off-canvas/off-canvas.component';
import { OffCanvasService } from 'src/app/pages/blocks/off-canvas/off-canvas.service';
import { CapitalizeFirstPipe } from "../../../../../pipe/capitalize-first-letter";
import { DateTimeFormatPipe } from "../../../../../pipe/date-time-format";
import { ActionMenuComponent } from "../../../../blocks/action-menu/action-menu.component";
import { UI } from 'src/app/pages/blocks/ui-interface';

@Component({
  selector: 'app-ongoing-event-grid',
  standalone: true,
  imports: [MaterialModule, TablerIconsModule, CapitalizeFirstPipe, DateTimeFormatPipe, ActionMenuComponent],
  templateUrl: './ongoing-event-grid.component.html',
  styleUrl: './ongoing-event-grid.component.scss'
})
export class OngoingEventGridComponent {
  @ViewChild(OffCanvasComponent) offCanvas: OffCanvasComponent;
  @Input() datasource: any
  selectedEventId: number
  IsOpenDetail: boolean = false;
  @Output() onDelete = new EventEmitter();
  constructor(public offCanvasService: OffCanvasService) { }

  viewDetial(id: number) {
    this.selectedEventId = id
    this.offCanvas.openOffCanvas();
    this.IsOpenDetail = true
    this.offCanvasService.onClose().subscribe(() => {
      this.IsOpenDetail = false;
      console.log('Overlay closed from service');
    });
  }

  dropdownItems(item: any): UI.DropDownMenuItem[] {
    return [
      {
        label: "Delete event",
        icon: "delete",
        color: "#de2e21",
        action: () => this.onDelete.emit(item),
      },
    ];
  }

}
