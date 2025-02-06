import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UI } from 'src/app/pages/blocks/ui-interface';
import { ActionMenuComponent } from "../../../../blocks/action-menu/action-menu.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-past-event-list',
  standalone: true,
  imports: [MatIconModule, MatToolbarModule, MatButtonModule, CommonModule, MatMenuModule, MatTableModule, ActionMenuComponent],
  templateUrl: './past-event-list.component.html',
  styleUrl: './past-event-list.component.scss'
})
export class PastEventListComponent {
  @Input() datasource: any;
  @Output() onDelete = new EventEmitter();
  displayedColumns: string[] = ['event-name', 'event-type', 'date', "time", 'sport', "shared-with", "action"];

  constructor(private router: Router) { }

  dropdownItems(item: any): UI.DropDownMenuItem[] {
    return [
      { label: "Edit {t}", icon: "edit", action: () => this.editOnDemandEvent(item.id) },
      { label: "Share Event", icon: "share", action: () => { } },
      {
        label: "Upload to server",
        icon: "cloud_download",
        action: () => { },
      },
      { label: "Remove Event", icon: "delete", color: "#de2e21", action: () => this.onDelete.emit(item) },
    ];
  }

  editOnDemandEvent(id: number) {
    this.router.navigate([`events/edit/on-demand-event/${id}`]);
  }

  viewDetails(id: number) {
    this.router.navigate([`events/past-event-details/${id}`]);
  }
}