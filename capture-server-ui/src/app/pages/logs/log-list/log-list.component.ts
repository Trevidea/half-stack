import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LogFilterComponent } from "./log-filter/log-filter.component";
import { LogListViewComponent } from "./log-list-view/log-list-view.component";
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-log-list',
  standalone: true,
  imports: [MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule, LogFilterComponent, LogListViewComponent,
    MatPaginatorModule],
  templateUrl: './log-list.component.html',
  styleUrl: './log-list.component.scss'
})
export class LogListComponent {

}
