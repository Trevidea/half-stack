import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MaterialModule } from 'src/app/material.module';
import { OnDemandEventFormComponent } from "./on-demand-event-form.component";
import { ArrayBuilder } from 'src/app/blocks/array.builder';
import { MetaTypeBuilder } from 'src/app/blocks/meta-type-builder';
import { Transformer } from 'src/app/blocks/transformer';
import { ModelService } from 'src/app/services/model-services/model-service.service';
import { OnDemandEventFormView } from '../views/onDemand';
import { Views } from 'src/app/services/models-interfaces/half-stack-interface';
import { Router, ActivatedRoute } from '@angular/router';
import { PresenterAction } from 'src/app/blocks/actions';
import { EventBuilder } from '../builders/event';

@Component({
  selector: 'app-on-demand-event-form-presenter',
  standalone: true,
  imports: [OnDemandEventFormComponent],
  providers: [provideNativeDateAdapter()],
  template: `<app-on-demand-event-form [datasource]="ds"  (save)="actions.onSave()"
  ><app-on-demand-event-form>`,
  styleUrl: './on-demand-event-form.component.scss'
})
export class OnDemandEventFormPresenter implements OnInit {
  ds!: OnDemandEventFormView;
  actions!: Views.FormActions;
  constructor(private modelService: ModelService, private router: Router,
    private route: ActivatedRoute,) {
    this.ds = new OnDemandEventFormView();
    this.route.params.subscribe(params => {
      this.ds.id = params['id'];
    });
    this.route.queryParams.subscribe(params => {
      const type = params['type'];
      this.ds.formType = type;
      console.log('Type:', type);
    });
    this.actions = new PresenterAction("events/events-list", this.ds, this.modelService.saveEvent, EventBuilder, router);
  }


  ngOnInit(): void {
    if (this.ds.id) {
      Transformer.ComposeObjectAsync(
        this.modelService.eventJson(this.ds.id),
        this.ds,
        EventBuilder
      )
    }
    Transformer.ComposeObjectAsync(
      this.modelService.MetaTypeByKey("PROGRAM"),
      this.ds.programs,
      MetaTypeBuilder
    );

    Transformer.ComposeObjectAsync(
      this.modelService.MetaTypeByKey("SPORT"),
      this.ds.sports,
      MetaTypeBuilder
    );

    Transformer.ComposeObjectAsync(
      this.modelService.MetaTypeByKey("LEVEL"),
      this.ds.levels,
      MetaTypeBuilder
    );

    Transformer.ComposeObject(
      this.modelService.EventYear(),
      this.ds.years,
      ArrayBuilder
    );
  }

}
