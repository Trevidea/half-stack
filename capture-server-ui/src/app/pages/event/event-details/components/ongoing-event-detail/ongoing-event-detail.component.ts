import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, input, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TablerIconsModule } from 'angular-tabler-icons';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MaterialModule } from 'src/app/material.module';
import { OffCanvasService } from 'src/app/pages/blocks/off-canvas/off-canvas.service';
import { DateTimeFormatPipe } from 'src/app/pipe/date-time-format';

@Component({
  selector: 'app-ongoing-event-detail',
  standalone: true,
  imports: [NgScrollbarModule, DateTimeFormatPipe, TablerIconsModule, MatIconModule, MaterialModule, CommonModule],
  templateUrl: './ongoing-event-detail.component.html',
  styleUrl: './ongoing-event-detail.component.scss'
})
export class OngoingEventDetailComponent implements OnInit {
  @Input() datasource: any;
  @Input() startIndex: number = 0;
  @Input() endIndex: number = 0;

  @Output() page = new EventEmitter();
  constructor(public offCanvasService: OffCanvasService) { }

  ngOnInit(): void {
  }

  close() {
    this.offCanvasService.closeOverlay();
  }


}
