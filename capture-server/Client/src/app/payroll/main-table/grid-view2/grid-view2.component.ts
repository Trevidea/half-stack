import { Component, Input, OnInit } from '@angular/core';
import { MainTableComponent } from '../main-table.component';

@Component({
  selector: 'app-grid-view2',
  templateUrl: './grid-view2.component.html',
  styleUrls: ['./grid-view2.component.scss']
})
export class GridView2Component implements OnInit {
@Input() rows : any
@Input() columns : any
  constructor() { }

  ngOnInit(): void {
    console.log(this.rows)
    console.log(this.columns)

  }

}
