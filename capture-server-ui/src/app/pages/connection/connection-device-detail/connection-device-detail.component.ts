import { CommonModule } from '@angular/common';
import { Component, Input, input } from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { HlsPlayerComponent } from '../../blocks/hls-player/hls-player.component';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-connection-device-detail',
  standalone: true,
  imports: [MaterialModule, CommonModule, TablerIconsModule, HlsPlayerComponent],
  templateUrl: './connection-device-detail.component.html',
  styleUrl: './connection-device-detail.component.scss'
})
export class ConnectionDeviceDetailComponent {
  @Input() url: string;
  constructor(private router: Router, private location: Location,){}

  // open(){
  //   this.router.navigate(['configuration'])
  // }
  goBack() {
    this.location.back();
  }
}
