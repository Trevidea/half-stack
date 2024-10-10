import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { OffCanvasService } from 'src/app/pages/blocks/off-canvas/off-canvas.service';
import { DateTimeFormatPipe } from 'src/app/pipe/date-time-format';

@Component({
  selector: 'app-past-event-detail',
  standalone: true,
  imports: [MaterialModule, DateTimeFormatPipe, TablerIconsModule],
  templateUrl: './past-event-detail.component.html',
  styleUrl: './past-event-detail.component.scss'
})
export class PastEventDetailComponent {
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
