import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { TablerIconsModule } from 'angular-tabler-icons';

@Component({
  selector: 'app-previous-events-connection',
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatDividerModule,
    MatPaginatorModule, MatIconModule,MatButtonModule ,TablerIconsModule,
    FormsModule, ReactiveFormsModule, MatSelectModule],
  templateUrl: './previous-events-connection.component.html',
  styleUrl: './previous-events-connection.component.scss'
})
export class PreviousEventsConnectionComponent {
  @Output() start = new EventEmitter();
  @Input() datasource: any;

}
