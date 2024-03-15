import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-form-footer',
  templateUrl: './form-footer.component.html',
  styleUrls: ['./form-footer.component.scss']
})
export class FormFooterComponent implements OnInit {
  @Output("save") save = new EventEmitter();
  @Output("close") close = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  onSave()
  {
    this.save.emit();
  }
  onClose()
  {
    this.close.emit();
  }
}
