import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { setTimeout } from 'timers';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EventComponent implements OnInit {
@Input() datasource: any
  constructor(private router: Router) { }

  ngOnInit(): void {
 
  }
  CreateOnDemandEvent() {
    this.router.navigate(['on-demand-event'])
  }

  onTabChange(event: any): void {
     console.log(event)
  }
}
