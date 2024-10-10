import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-past-event-list',
  standalone: true,
  imports: [MatIconModule, MatToolbarModule, MatButtonModule, CommonModule, MatMenuModule, MatTableModule],
  templateUrl: './past-event-list.component.html',
  styleUrl: './past-event-list.component.scss'
})
export class PastEventListComponent {
  @Input() datasource: any;
  @Output() onDelete = new EventEmitter();
  displayedColumns: string[] = ['event-type', 'date', 'event-name', 'file-type', 'file-size', 'sport', "teams-involved", "shared-with", "action"];
}
