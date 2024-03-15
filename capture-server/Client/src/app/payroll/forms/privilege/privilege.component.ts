import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-privilege',
  templateUrl: './privilege.component.html',
  styleUrls: ['./privilege.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class PrivilegeComponent implements OnInit {
  @Input() datasource: any;
  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  cancelBtn(){
    this.router.navigate(['privilege'])
  }

}
