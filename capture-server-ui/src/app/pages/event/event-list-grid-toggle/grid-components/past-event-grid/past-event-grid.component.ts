import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TablerIconsModule } from 'angular-tabler-icons';
import { DateTimeFormatPipe } from 'src/app/pipe/date-time-format';
import { OffCanvasComponent } from 'src/app/pages/blocks/off-canvas/off-canvas.component';
import { OffCanvasService } from 'src/app/pages/blocks/off-canvas/off-canvas.service';
import { UI } from 'src/app/pages/blocks/ui-interface';
import { ActionMenuComponent } from "../../../../blocks/action-menu/action-menu.component";

@Component({
  selector: 'app-past-event-grid',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, OffCanvasComponent, TablerIconsModule, MatMenuModule, MatIconModule, DateTimeFormatPipe, ActionMenuComponent],
  templateUrl: './past-event-grid.component.html',
  styleUrl: './past-event-grid.component.scss'
})
export class PastEventGridComponent {
  @Output() onDelete = new EventEmitter();
  @ViewChild(OffCanvasComponent) offCanvas: OffCanvasComponent;
  @Input() datasource: any
  selectedEventId: number
  IsOpenDetail: boolean = false;

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
