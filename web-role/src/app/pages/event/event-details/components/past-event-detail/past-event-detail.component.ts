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
  viewCounter;

  constructor(private location: Location) {

  }

  ngOnInit(): void {

    setTimeout(() => {
      console.log(this.datasource);
      const defaultdevice = this.datasource?.connectionDetailsView[0]
      this.url = `${environment.hlsUrl}/${defaultdevice?.streamName}/llhls.m3u8`
      console.log(defaultdevice)
    }, 1000)
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
  viewCounterMap = new Map<number, number>();

  getViewNumber(index: number): number {
    if (!this.viewCounterMap.has(index)) {
      // Calculate view number based on existing items with direction === 1
      let viewCount = 1;
      for (let i = 0; i < index; i++) {
        if (this.datasource.connectionDetailsView[i].direction === 1) {
          viewCount++;
        }
      }
      this.viewCounterMap.set(index, viewCount);
    }
    return this.viewCounterMap.get(index);
  }

}
