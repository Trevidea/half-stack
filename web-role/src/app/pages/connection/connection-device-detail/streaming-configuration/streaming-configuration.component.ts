import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { TablerIconsModule } from 'angular-tabler-icons';

@Component({
  selector: 'app-streaming-configuration',
  standalone: true,
  imports: [MatCardModule, MatDividerModule, MatButtonModule,  MatIconModule,  TablerIconsModule],
  templateUrl: './streaming-configuration.component.html',
  styleUrl: './streaming-configuration.component.scss'
})
export class StreamingConfigurationComponent {

}
