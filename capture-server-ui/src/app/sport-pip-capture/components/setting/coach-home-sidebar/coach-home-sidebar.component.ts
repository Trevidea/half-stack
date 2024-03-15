import { AfterViewInit, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-coach-home-sidebar',
  templateUrl: './coach-home-sidebar.component.html',
  styleUrls: ['./coach-home-sidebar.component.scss']
})
export class CoachHomeSidebarComponent implements OnInit  {
@Input() data:any
  constructor() { }
 

  ngOnInit(): void {
    console.log('fdgh', this.data)
  }
  
  

}
