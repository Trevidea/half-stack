import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { HlsPlayerComponent } from 'src/app/pages/blocks/hls-player/hls-player.component';
import { OffCanvasService } from 'src/app/pages/blocks/off-canvas/off-canvas.service';
import { DateTimeFormatPipe } from 'src/app/pipe/date-time-format';

@Component({
  selector: 'app-past-event-detail',
  standalone: true,
  imports: [MaterialModule, DateTimeFormatPipe, TablerIconsModule,HlsPlayerComponent],
  templateUrl: './past-event-detail.component.html',
  styleUrl: './past-event-detail.component.scss'
})
export class PastEventDetailComponent implements OnInit {
  @Input() datasource: any;

  ngOnInit(): void {
    console.log(this.datasource);

  }


}
