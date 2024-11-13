import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TablerIconsModule } from 'angular-tabler-icons';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MaterialModule } from 'src/app/material.module';
import { ActionMenuComponent } from 'src/app/pages/blocks/action-menu/action-menu.component';
import { OffCanvasService } from 'src/app/pages/blocks/off-canvas/off-canvas.service';
import { UI } from 'src/app/pages/blocks/ui-interface';
import { CapitalizeFirstPipe } from 'src/app/pipe/capitalize-first-letter';
import { DateTimeFormatPipe } from 'src/app/pipe/date-time-format';

@Component({
  selector: 'app-upcoming-event-detail',
  standalone: true,
  imports: [NgScrollbarModule, CapitalizeFirstPipe, TablerIconsModule, MatIconModule, MaterialModule, DateTimeFormatPipe, ActionMenuComponent],
  templateUrl: './upcoming-event-detail.component.html',
  styleUrl: './upcoming-event-detail.component.scss'
})
export class UpcomingEventDetailComponent {
  @Input() dropdownItems: UI.DropDownMenuItem[] = [];
  @Input() datasource: any;
  @Input() startIndex: number = 0;
  @Input() endIndex: number = 0;
  @Output() page = new EventEmitter();

  constructor(public offCanvasService: OffCanvasService) { }

  get pagedItems() {
    return this.datasource.eventViewCollection.slice(this.startIndex, this.startIndex + 1);
  }

  close() {
    this.offCanvasService.closeOverlay();
  }

}
