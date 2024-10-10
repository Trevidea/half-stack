import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TablerIconsModule } from 'angular-tabler-icons';

@Component({
  selector: 'app-app-ongoning',
  standalone: true,
  imports: [MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    TablerIconsModule],
  templateUrl: './app-ongoning.component.html',
  styleUrl: './app-ongoning.component.scss'
})
export class AppOngoningComponent {

}
