import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PresenterActions } from 'src/app/blocks/actions';
import { Transformer } from 'src/app/blocks/transformer';
import { ModelServiceService } from 'src/app/model-service/model-service.service';
import { Views } from 'src/app/model-service/payroll-interface';
import { CategoriesBuilder, HolidayBuilder } from './builders/holiday';
import { HolidaysViews } from './views/holidays';

@Component({
  selector: 'app-holidays-presenter',
  template: '<app-holidays [datasource]="ds" (cancel)="actions.onCancel()" (save)="actions.onSave()"></app-holidays>',
  styleUrls: ['./holidays.component.scss']
})
export class HolidaysPresenter implements OnInit {
    ds:HolidaysViews

  actions!: Views.FormActions
  constructor(public dataFactory: ModelServiceService, private router: Router, private route: ActivatedRoute) { 
    this.ds = new HolidaysViews();
    this.ds.id = route.snapshot.params['id'];

    //Special scenario - to be embedded in framework
    if ((this.ds.id as unknown) === 'null') { this.ds.id = null }
    ////////////////////////////////////////////////

    this.actions = new PresenterActions("holidays", this.ds, dataFactory.SaveHoliday, HolidayBuilder, router);
  }

  ngOnInit(): void {

   this.ds.categories =  this.dataFactory.HolidayCategories() as any
   if(this.ds.id){

     Transformer.ComposeObjectAsync(this.dataFactory.HolidayJson(this.ds.id), this.ds, HolidayBuilder);
   }
  }

  cancelBtn() {
    this.router.navigate(['holidays'])
  }

}
