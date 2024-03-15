import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, Output, Type, ViewChild } from '@angular/core';

import { FormHostDirective } from '../form-host.directive';
import { Views } from 'app/sport-pip-capture/models/sport-pip-capture-interface';


@Component({
  selector: 'app-form-host',
  templateUrl: './form-host.component.html',
  styleUrls: ['./form-host.component.scss']
})
export class FormHostComponent implements AfterViewInit {

  @Input() component: Type<Views.FormModal>;
  @Input() data: { [key: string]: any; } = {};
  @Output() close: EventEmitter<any> = new EventEmitter;
  @ViewChild(FormHostDirective, { static: true }) formHost!: FormHostDirective;
 

  constructor(private cdr: ChangeDetectorRef) { }

  ngAfterViewInit() : void {
    const viewRef = this.formHost.viewRef;
    viewRef.clear();
    const compRef = viewRef.createComponent<Views.FormModal>(this.component);
    compRef.instance.setModalActions(this.close);
    console.log(this.data)
    Object.keys(this.data).forEach((key: string) =>  compRef.instance[key] = this.data[key]);
    this.cdr.detectChanges();
   
    
  }

}
