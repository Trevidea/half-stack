import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges, ViewChild } from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { OffCanvasComponent } from 'src/app/pages/blocks/off-canvas/off-canvas.component';
import { OffCanvasService } from 'src/app/pages/blocks/off-canvas/off-canvas.service';
import { CapitalizeFirstPipe } from "../../../../../pipe/capitalize-first-letter";
import { DateTimeFormatPipe } from "../../../../../pipe/date-time-format";
import { ActionMenuComponent } from "../../../../blocks/action-menu/action-menu.component";
import { UI } from 'src/app/pages/blocks/ui-interface';
import { OngoingEventDetailPresenter } from "../../../event-details/components/ongoing-event-detail/ongoing-event-detail.presenter";
import { UpcomingEventDetailPresenter } from "../../../event-details/components/upcoming-event-detail/upcoming-event-detail.presenter";
import { DateTimeService } from 'src/app/pages/blocks/date-time.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ongoing-event-grid',
  standalone: true,
  imports: [MaterialModule,CommonModule,RouterModule, TablerIconsModule, CapitalizeFirstPipe, DateTimeFormatPipe, ActionMenuComponent, OngoingEventDetailPresenter, OffCanvasComponent, UpcomingEventDetailPresenter],
  templateUrl: './ongoing-event-grid.component.html',
  styleUrl: './ongoing-event-grid.component.scss'
})
export class OngoingEventGridComponent implements OnChanges, OnDestroy {
  @ViewChild(OffCanvasComponent) offCanvas: OffCanvasComponent;
  @Input() datasource: any
  selectedEventId: number
  IsOpenDetail: boolean = false;
  @Output() onDelete = new EventEmitter();
  seletctedItem: any;
  private countdownInterval: any;
  constructor(public offCanvasService: OffCanvasService, private dateTimeservice: DateTimeService,private router:Router) { }


  ngOnChanges(changes: SimpleChanges): void {

    this.dateTimeservice.updateCountdownForOngoingEvents(this.datasource);
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
    this.countdownInterval = setInterval(() => {
      this.dateTimeservice.updateCountdownForOngoingEvents(this.datasource);
    }, 50);

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

  dropdownItems(item: any): UI.DropDownMenuItem[] {
    return [
      { label: "Edit {t}", icon: "edit", action: () => this.editOnDemandEvent(item.id) },

      {
        label: "Delete event",
        icon: "delete",
        color: "#de2e21",
        action: () => this.onDelete.emit(item),
      },
    ];
  }
  ngOnDestroy(): void {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }
  editOnDemandEvent(id: number) {
    this.router.navigate([`events/edit/on-demand-event/${id}`]);
  }
}
