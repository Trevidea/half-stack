import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataFactoryService } from 'app/sport-pip-capture/models/data-factory.service';
import { Transformer } from 'app/blocks/transformer';
import { OnDemandEventFormView } from './views/onDemand';
import { ArrayBuilder } from 'app/sport-pip-capture/blocks/array.builder';
import { Views } from 'app/sport-pip-capture/models/capture-interface';
import { PresenterAction } from 'app/blocks/actions';
import { ActivatedRoute, Router } from '@angular/router';
import { OnDemandFormBuilder } from './buliders/onDemand';
import { MetaTypeBuilder } from 'app/sport-pip-capture/blocks/meta-type.builder';
import { TypesPresenter } from 'app/sport-pip/components/types/types.presenter';
import { ModelServiceService } from 'app/sport-pip-capture/models/model-service.service';
import { stringify } from 'querystring';
@Component({
  selector: 'app-create-on-demand-event-presenter',
  template: `<app-create-on-demand-event [datasource]="ds" (save)="actions.onSave()" (cancel)="actions.onCancel()"></app-create-on-demand-event>`,
  styleUrls: ['./create-on-demand-event.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateOnDemandEventPresenter implements OnInit {
  ds!: OnDemandEventFormView
  actions!: Views.FormActions;
  public selectBasic: any[] = [];
  public selectBasicLoading = false;
  constructor(private dataFactory: DataFactoryService, router: Router, route: ActivatedRoute, private modelServiceService: ModelServiceService) {
    this.ds = new OnDemandEventFormView();
    if (Object.is(route.snapshot.component, this.constructor))
      this.ds.id = route.snapshot.params['id']
       
    this.actions = new PresenterAction("event", this.ds, this.modelServiceService.saveEvent, OnDemandFormBuilder, router);

  }

  ngOnInit(): void {
    Transformer.ComposeObject(this.dataFactory.EventSports(), this.ds.sports, ArrayBuilder)
    Transformer.ComposeObject(this.dataFactory.EventLevel(), this.ds.levels, ArrayBuilder)
    Transformer.ComposeObject(this.dataFactory.EventProgram(), this.ds.programs, ArrayBuilder)
    Transformer.ComposeObject(this.dataFactory.EventYear(), this.ds.years, ArrayBuilder)
    if (this.ds.id) {

      // Transformer.ComposeObjectAsync(this.dataFactory.EventJson(123), this.ds, OnDemandFormBuilder)
    }
    this.ds.sports.onAddingNewItem(async (e: { modal: Views.ModalHost }) => {
      e.modal.component = TypesPresenter;
      e.modal.properties["key"] = "SPORTS";
      try {
        const data = await e.modal.open();
        if (data) {
          Transformer.ComposeAndSelect(this.ds.sports, data.newItem);
        }
      } catch (err) {
        console.log(err)
      }
    });
  }



  formatTime(time: any): number {
    if (!time) return 0;
    const [hours, minutes] = time.split(':');
    let formattedTime = hours + minutes;
    return parseInt(formattedTime);
  }
}
