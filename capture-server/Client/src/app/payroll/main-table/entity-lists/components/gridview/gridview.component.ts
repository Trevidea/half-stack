import { Component, Input, OnInit } from '@angular/core';
import { Data } from '@angular/router';
import { ModelServiceService } from 'src/app/model-service/model-service.service';
import { MainTableComponent } from '../../../main-table.component';
import { ListDataBase } from '../../list-data-base';

@Component({
  selector: 'app-gridview',
  templateUrl: './gridview.component.html',
  styleUrls: ['./gridview.component.scss']
})
export class GridviewComponent implements OnInit {
  items: any;
  searchText:any;
  @Input() search: string
  // @Input() rows : any
  // @Input() columns : any
  constructor(private _backend: ModelServiceService) { }

  ngOnInit(): void {
    console.log(this.search)
    this._backend.EmployeesJson().subscribe(
      (data: any) => {

        this.items = data

      }
    )
    

  }

}
