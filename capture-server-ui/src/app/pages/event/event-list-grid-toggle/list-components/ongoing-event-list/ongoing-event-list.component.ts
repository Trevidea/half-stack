import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-ongoing-event-list',
  standalone: true,
  imports: [MatIconModule, MatToolbarModule, CommonModule, MatMenuModule, MatTableModule],
  templateUrl: './ongoing-event-list.component.html',
  styleUrl: './ongoing-event-list.component.scss'
})
export class OngoingEventListComponent implements OnInit {
  ngOnInit(): void {
    console.log(this.datasource);
  }
  @Input() datasource: any;
  displayedColumns: string[] = ['in-progress', 'event-name', 'event-type', 'date', 'location', "sport", "teams-involved"];
}
