import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TablerIconsModule } from 'angular-tabler-icons';

@Component({
  selector: 'app-shared',
  standalone: true,
  imports: [MatCardModule, TablerIconsModule, MatPaginatorModule],
  templateUrl: './shared.component.html',
  styleUrl: './shared.component.scss'
})
export class SharedComponent {

}
