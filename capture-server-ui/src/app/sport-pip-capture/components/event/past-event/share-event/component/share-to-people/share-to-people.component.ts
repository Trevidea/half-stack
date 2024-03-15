import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-share-to-people',
  templateUrl: './share-to-people.component.html',
  styleUrls: ['./share-to-people.component.scss']
})
export class ShareToPeopleComponent implements OnInit {
  selectedPeople = [];
  selectMulti = [
    { name: 'Kane', email: 'kane@gmail.com' },
    { name: 'John', email: 'John@gmail.com' },
    { name: 'joh', email: 'joh@gmail.com' },

  ];
  
  constructor() { }

  ngOnInit(): void {
  }
  removeItem(itemToRemove) {
    this.selectedPeople = this.selectedPeople.filter(item => item.email !== itemToRemove.email);
  }
  
  removeALLItem(){
    this.selectedPeople = []
  }
 
}
