import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SharedComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
