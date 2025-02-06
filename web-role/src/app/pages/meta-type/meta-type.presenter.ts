import { Component, OnInit } from '@angular/core';
import { MetaTypeComponent } from './meta-type.component';
import { Transformer } from 'src/app/blocks/transformer';
import { ModelService } from 'src/app/services/model-services/model-service.service';
import { PresenterAction } from 'src/app/blocks/actions';
import { Router } from '@angular/router';
import { MetaTypeBuilder } from './builders/meta-types';
import { MetaTypeView } from './views/meta-types';
import { TypeBuilder } from './builders/type';
import { Views } from 'src/app/services/models-interfaces/half-stack-interface';

@Component({
  selector: 'app-meta-type-presenter',
  standalone: true,
  imports: [MetaTypeComponent],
  template: `<app-meta-type [datasource]="ds" (save)="actions.onSave()"></app-meta-type>`,
  styleUrl: './meta-type.component.scss'
})
export class MetaTypePresenter implements OnInit {
  ds!: MetaTypeView
  actions!: Views.FormActions;

  constructor(private modelService: ModelService, private route: Router) {
    this.ds = new MetaTypeView();
    this.actions = new PresenterAction(null, this.ds, modelService.MetaType, MetaTypeBuilder, route);
    this.actions.onComplete.subscribe(
      (result) => {
        if (result) {
          this.loadAllMetaTypes();
        }
      }
    )
  }

  ngOnInit(): void {
    this.loadAllMetaTypes();
  }

  loadAllMetaTypes() {
    Transformer.ComposeCollectionAsync(this.modelService.ALLMetaTypeJson(), this.ds.values, TypeBuilder)
  }
}
