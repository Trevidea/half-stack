import { Component, OnInit } from '@angular/core';
import Stepper from 'bs-stepper';
import { ModelServiceService } from 'src/app/model-service/model-service.service';
import { MetaTypeView } from './views/meta-type';
import { Views } from 'src/app/model-service/payroll-interface';
import { ActivatedRoute, Router } from '@angular/router';
import { PresenterActions } from 'src/app/blocks/actions';
import { MetaTypeBuilder } from './builder/meta-type';
import { Transformer } from 'src/app/blocks/transformer';
import { TypeBuilder } from './builder/type';
@Component({
    selector: 'app-meta-type-presenter',
    template: `<app-meta-type [datasource]="ds" (save)="actions.onSave()" (cancel)="actions.onCancel()" ></app-meta-type>`,
    styleUrls: ['./meta-type.component.scss']
})
export class MetaTypePresenter implements OnInit {

    ds!: MetaTypeView
    actions!: Views.FormActions
    constructor(public dataFactory: ModelServiceService, private router: Router, private route: ActivatedRoute) {
        this.ds = new MetaTypeView();
        console.log(route.snapshot.params['id'])
        this.ds.id = route.snapshot.params['id'];

        // Special scenario - to be embedded in framework
        if ((this.ds.id as unknown) === 'null') { this.ds.id = null }
        ////////////////////////////////////////////////
        this.actions = new PresenterActions("meta-type/:id", this.ds, dataFactory.MetaType, MetaTypeBuilder, router);
    }

    ngOnInit(): void {
        console.log(this.ds.id)
        Transformer.ComposeCollectionAsync(this.dataFactory.ALLMetaTypeJson(), this.ds.values, TypeBuilder)
    }
   
}