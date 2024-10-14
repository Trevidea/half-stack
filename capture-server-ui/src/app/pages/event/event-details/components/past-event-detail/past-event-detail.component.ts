import { CommonModule, Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { HlsPlayerComponent } from 'src/app/pages/blocks/hls-player/hls-player.component';
import { OffCanvasService } from 'src/app/pages/blocks/off-canvas/off-canvas.service';
import { DateTimeFormatPipe } from 'src/app/pipe/date-time-format';
import { environment } from 'src/environments/environment';
import { CapitalizeFirstPipe } from "../../../../../pipe/capitalize-first-letter";

@Component({
  selector: 'app-past-event-detail',
  standalone: true,
  imports: [MaterialModule, CommonModule, RouterModule, DateTimeFormatPipe, TablerIconsModule, HlsPlayerComponent, CapitalizeFirstPipe],
  templateUrl: './past-event-detail.component.html',
  styleUrl: './past-event-detail.component.scss'
})
export class PastEventDetailComponent implements OnInit {
  @Input() datasource: any;
  @Output() onUpload = new EventEmitter();
  activeIndex: number = 0;
  streamName: string | null = null;
  url: string;
  minIoUrl: string;


  constructor(private location: Location) {
    console.log(this.datasource)
    setTimeout(() => {
      const defaultdevice = this.datasource?.connectionDetailsView[0]
      this.url = `${environment.hlsUrl}/${defaultdevice.streamName}/llhls.m3u8`
      console.log(defaultdevice)
    }, 90)
  }

  ngOnInit(): void {
    console.log(this.datasource);

  }

  setStreamName(streamName: string, index: number) {
    this.url = ''
    setTimeout(() => {
      this.streamName = streamName;
      this.activeIndex = index;
      this.url = `${environment.hlsUrl}/${this.streamName}/llhls.m3u8`
      console.log(this.url)
    }, 30)
  }

  goBack() {
    this.location.back()
  }

}
