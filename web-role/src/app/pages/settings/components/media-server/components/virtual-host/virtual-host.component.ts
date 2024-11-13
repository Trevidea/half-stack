
import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-virtual-host',
  standalone: true,
  imports: [TablerIconsModule, MaterialModule, CommonModule],
  templateUrl: './virtual-host.component.html',
  styleUrl: './virtual-host.component.scss',
  encapsulation:ViewEncapsulation.None
})
export class VirtualHostComponent {

}
