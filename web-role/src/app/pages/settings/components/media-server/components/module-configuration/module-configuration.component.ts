import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-module-configuration',
  standalone: true,
  imports: [TablerIconsModule, MaterialModule, CommonModule],
  templateUrl: './module-configuration.component.html',
  styleUrl: './module-configuration.component.scss',
  encapsulation:ViewEncapsulation.None
})
export class ModuleConfigurationComponent {

}
