import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TablerIconsModule } from 'angular-tabler-icons';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MaterialModule } from 'src/app/material.module';
import { UpcomingEventDetailComponent } from './upcoming-event-detail.component';
import { EventDetailView } from '../views/event-detail';
import { ModelService } from 'src/app/services/model-services/model-service.service';
import { Transformer } from 'src/app/blocks/transformer';
import { EventDetailsBuilder } from '../builders/event-detail';
import { UI } from 'src/app/pages/blocks/ui-interface';
import { SelectItemView } from 'src/app/blocks/collection-item';

@Component({
  selector: 'app-upcoming-event-detail-presenter',
  standalone: true,
  imports: [NgScrollbarModule, TablerIconsModule, MatIconModule, MaterialModule, UpcomingEventDetailComponent],
  template: `<app-upcoming-event-detail 
  [dropdownItems]="dropdownItems"
  [datasource]='ds' 
  [startIndex]="currentIndex"
   [endIndex]="endIndex"
 
  ></app-upcoming-event-detail>`,
  styleUrl: './upcoming-event-detail.component.scss'
})
export class UpcomingEventDetailPresenter {
  @Input() dropdownItems: UI.DropDownMenuItem[] = [];
  ds!: EventDetailView;
  @Input() eventId: number = 0;
  currentIndex: number;
  endIndex: number;

  constructor(private modelService: ModelService) {
    this.ds = new EventDetailView();
  }

  ngOnInit(): void {
    if (this.eventId) {
      Transformer.ComposeObjectAsync(this.modelService.eventJson(this.eventId), this.ds, EventDetailsBuilder)
    }
  }

}