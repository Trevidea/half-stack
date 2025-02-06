import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TablerIconsModule } from 'angular-tabler-icons';
import { DateTimeFormatPipe } from 'src/app/pipe/date-time-format';
import { OffCanvasComponent } from 'src/app/pages/blocks/off-canvas/off-canvas.component';
import { UI } from 'src/app/pages/blocks/ui-interface';
import { ActionMenuComponent } from "../../../../blocks/action-menu/action-menu.component";
import { Router } from '@angular/router';
import { CapitalizeFirstPipe } from "../../../../../pipe/capitalize-first-letter";

@Component({
  selector: 'app-past-event-grid',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, TablerIconsModule, MatMenuModule, MatIconModule, DateTimeFormatPipe, ActionMenuComponent, CapitalizeFirstPipe],
  templateUrl: './past-event-grid.component.html',
  styleUrl: './past-event-grid.component.scss'
})
export class PastEventGridComponent {
  @Output() onDelete = new EventEmitter();
  @Input() datasource: any


  constructor(private router: Router) { }

  viewDetial(id: number) {
    this.router.navigate([`events/past-event-details/${id}`])
  }

  dropdownItems(item: any): UI.DropDownMenuItem[] {
    return [
      { label: "Repeat event", icon: "event_repeat", action: () => this.repeatOnDemandEvent(item.id) },
      { label: "Share Event", icon: "share", action: () => { } },
      {
        label: "Upload to server",
        icon: "cloud_download",
        action: () => { },
      },
      { label: "Remove Event", icon: "delete", color: "#de2e21", action: () => this.onDelete.emit(item) },
    ];
  }

  repeatOnDemandEvent(id: number) {
    this.router.navigate([`events/repeat-previous-event/${id}`,], {
      queryParams: { type: 'repeat' }
    });
  }
}
