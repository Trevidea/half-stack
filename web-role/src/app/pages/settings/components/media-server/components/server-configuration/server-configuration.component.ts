import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-server-configuration',
  standalone: true,
  imports: [TablerIconsModule, MaterialModule, CommonModule],
  templateUrl: './server-configuration.component.html',
  styleUrl: './server-configuration.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ServerConfigurationComponent {

}
