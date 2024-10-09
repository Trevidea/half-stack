import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TablerIconsModule } from 'angular-tabler-icons';
import { DateTimeFormatPipe } from 'src/app/pipe/date-time-format';
import { OffCanvasComponent } from 'src/app/pages/blocks/off-canvas/off-canvas.component';
import { OffCanvasService } from 'src/app/pages/blocks/off-canvas/off-canvas.service';

@Component({
  selector: 'app-past-event-grid',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, OffCanvasComponent, TablerIconsModule, MatMenuModule, MatIconModule, DateTimeFormatPipe],
  templateUrl: './past-event-grid.component.html',
  styleUrl: './past-event-grid.component.scss'
})
export class PastEventGridComponent {
  @Output() onDelete: EventEmitter<number> = new EventEmitter<number>();
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

}
