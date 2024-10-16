import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { HlsPlayerComponent } from '../../blocks/hls-player/hls-player.component';

@Component({
  selector: 'app-connection-device-detail',
  standalone: true,
  imports: [MaterialModule, CommonModule, TablerIconsModule, HlsPlayerComponent],
  templateUrl: './connection-device-detail.component.html',
  styleUrl: './connection-device-detail.component.scss'
})
export class ConnectionDeviceDetailComponent {
  url: string;

}
