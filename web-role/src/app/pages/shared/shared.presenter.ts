import { Component, OnInit } from '@angular/core';
import { SharedComponent } from "./shared.component";

@Component({
  selector: 'app-shared-presenter',
  standalone: true,
  imports: [SharedComponent],
  template: `<app-shared></app-shared>`,
  styleUrl: './shared.component.scss'
})
export class SharedPresenter implements OnInit {
  
  ngOnInit(): void {
    
  }


}
