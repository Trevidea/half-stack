import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipListbox, MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-live-gid-list-header',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatChipsModule, MatChipListbox, CommonModule, MatTabsModule, MatSelectModule],
  templateUrl: './live-gid-list-header.component.html',
  styleUrl: './live-gid-list-header.component.scss'
})
export class LiveGidListHeaderComponent implements OnInit {
  @Output() messageListOrGrid = new EventEmitter<string>();
  @Output() pubSubAll = new EventEmitter<string>();
  @Input() eventId: number = 34;
  listOrGrid: string = "list";
  activeTabIndex: number = 0;
  selectedIndex: number = 0;
  tabs = [
    { id: 'roster', label: 'Rosters' },
    { id: 'schedule', label: 'Schedules' },
    { id: 'statistic', label: 'Statistics' }
  ];
  activeTab: string = 'roster';

  constructor( private route: ActivatedRoute) { }

  ngOnInit(): void {
    const param = this.route.snapshot.queryParamMap;
    if (param.get("listOrGrid")) {
      const listOrGrid = param.get("listOrGrid");
      this.listOrGrid = listOrGrid;
      this.listGrid(listOrGrid);
    }
  }

  onTabChange(tabId: string) {
    this.activeTab = tabId;
  }
  
  listGrid(e: string) {
    this.messageListOrGrid.emit(e);
    this.listOrGrid = e;
  }
  getAllPubOrSub(e) {
    this.pubSubAll.emit(e);
  }

}
