import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { OffCanvasComponent } from 'src/app/pages/blocks/off-canvas/off-canvas.component';
import { OffCanvasService } from 'src/app/pages/blocks/off-canvas/off-canvas.service';
import { Router } from '@angular/router';
import { UI } from 'src/app/pages/blocks/ui-interface';
import { ActionMenuComponent } from 'src/app/pages/blocks/action-menu/action-menu.component';
import { CapitalizeFirstPipe } from "../../../../../pipe/capitalize-first-letter";
import { UpcomingEventDetailPresenter } from "../../../event-details/components/upcoming-event-detail/upcoming-event-detail.presenter";

@Component({
  selector: 'app-upcoming-event-list',
  standalone: true,
  templateUrl: './upcoming-event-list.component.html',
  styleUrl: './upcoming-event-list.component.scss',
  imports: [MatIconModule, OffCanvasComponent, ActionMenuComponent, MatToolbarModule, MatButtonModule, CommonModule, MatMenuModule, MatTableModule, CapitalizeFirstPipe, UpcomingEventDetailPresenter]
})
export class UpcomingEventListComponent {
  @Input() datasource: any;
  displayedColumns: string[] = ['event-type', 'date', 'time', 'event-name', 'location', 'sport', "teams involved", "action"];
  @Output() onDelete = new EventEmitter();
  @ViewChild(OffCanvasComponent) offCanvas!: OffCanvasComponent;
  seletctedItem: any;
  constructor(public offCanvasService: OffCanvasService, private router: Router) { }

  IsOpenDetail: boolean = false;

  viewDetial(item: any) {
    this.IsOpenDetail = true
    this.seletctedItem = item;
    this.offCanvas.openOffCanvas();
    // this.offCanvasService.onOpenOffCanvas();
    this.offCanvasService.onClose().subscribe(() => {
      this.IsOpenDetail = false;
      console.log('Overlay closed from service');
    });
  }
  edit(id: number) {
    this.router.navigate([`events/edit-event/${id}`]);
  }

  dropdownItems(item: any): UI.DropDownMenuItem[] {
    return [
      {
        label: "Edit event",
        icon: "edit",
        action: () => this.edit(item.id),
      },
      {
        label: "Print summary",
        icon: "print",
        action: () => { },
      },
      {
        label: "Task list",
        icon: "list",
        action: () => { },
      },
      { label: "Share Event", icon: "share", action: () => { } },
      {
        label: "Delete event",
        icon: "delete",
        color: "#de2e21",
        action: () => this.onDelete.emit(item),
      },
    ];
  }
  formatTime(timeNumber) {
    if (
      (isNaN(timeNumber) || timeNumber === null || timeNumber === undefined,
        timeNumber === 0)
    ) {
      return "00:00";
    }
    const hours = Math.floor(timeNumber / 100);
    const minutes = timeNumber % 100;
    const period = hours >= 12 ? "pm" : "am";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedTime = `${formattedHours}:${minutes
      .toString()
      .padStart(2, "0")}${period}`;
    return formattedTime;
  }
}