import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TablerIconsModule } from 'angular-tabler-icons';
import { DateTimeFormatPipe } from 'src/app/pipe/date-time-format';
import { OffCanvasComponent } from 'src/app/pages/blocks/off-canvas/off-canvas.component';
import { OffCanvasService } from 'src/app/pages/blocks/off-canvas/off-canvas.service';
import { Router } from '@angular/router';
import { UI } from 'src/app/pages/blocks/ui-interface';
import { ActionMenuComponent } from 'src/app/pages/blocks/action-menu/action-menu.component';
import { CapitalizeFirstPipe } from "../../../../../pipe/capitalize-first-letter";
import { CommonModule } from '@angular/common';
import { UpcomingEventDetailPresenter } from "../../../event-details/components/upcoming-event-detail/upcoming-event-detail.presenter";
import { DateTimeService } from 'src/app/pages/blocks/date-time.service';

@Component({
  selector: 'app-upcoming-event-grid',
  standalone: true,
  templateUrl: './upcoming-event-grid.component.html',
  styleUrl: './upcoming-event-grid.component.scss',
  imports: [MatCardModule, CommonModule, OffCanvasComponent, MatButtonModule, TablerIconsModule, ActionMenuComponent, MatIconModule, MatTooltipModule, DateTimeFormatPipe, CapitalizeFirstPipe, UpcomingEventDetailPresenter]
})
export class UpcomingEventGridComponent implements OnDestroy, OnChanges {
  @Input() datasource: any;
  @Output() onDelete = new EventEmitter();
  @ViewChild(OffCanvasComponent) offCanvas: OffCanvasComponent;
  seletctedItem: any;
  private countdownInterval: any;
  IsOpenDetail: boolean = false;
  constructor(public offCanvasService: OffCanvasService, private router: Router, private dateTimeservice: DateTimeService,) { }

  ngOnChanges(changes: SimpleChanges): void {
    // if (changes.datasource && changes.datasource.currentValue) {
    this.dateTimeservice.calculateUpcomingCountdown(this.datasource);
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
    this.countdownInterval = setInterval(() => {
      this.dateTimeservice.calculateUpcomingCountdown(this.datasource);
    }, 50);
    // }
  }

  viewDetial(item: any) {
    this.IsOpenDetail = true
    this.seletctedItem = item;
    this.offCanvas.openOffCanvas();
    this.offCanvasService.onClose().subscribe(() => {
      this.IsOpenDetail = false;
      console.log('Overlay closed from service');
    });
  }


  edit(id: number) {
    this.router.navigate([`events/edit/on-demand-event/${id}`]);
  }

  dropdownItems(item: any): UI.DropDownMenuItem[] {
    return [
      {
        label: "Edit event",
        icon: "edit",
        action: () => this.edit(item.id),
      },
      { label: "Share Event", icon: "share", action: () => { } },
      {
        label: "Remove Event",
        icon: "delete",
        color: "#de2e21",
        action: () => this.onDelete.emit(item),
      },
    ];
  }

  onClickPreview(eventId: number) {
    this.router.navigate([`/events/preview/${eventId}`]);
  }

  ngOnDestroy(): void {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }

}
