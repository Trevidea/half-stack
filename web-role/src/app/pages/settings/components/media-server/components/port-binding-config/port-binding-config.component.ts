import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-port-binding-config',
  standalone: true,
  imports: [TablerIconsModule, MaterialModule, CommonModule],
  templateUrl: './port-binding-config.component.html',
  styleUrl: './port-binding-config.component.scss'
})
export class PortBindingConfigComponent {

}
