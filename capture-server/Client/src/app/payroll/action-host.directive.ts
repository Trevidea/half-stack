import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[actionHost]'
})
export class ActionHostDirective {
  _data:any;
  @Input() set actionHost(data: any) {
    this._data = data;
  }
  
  public get data() : any {
    return this._data;
  }
  
  constructor(
    public templateRef: TemplateRef<any>,
    public viewContainerRef: ViewContainerRef) { }

}
