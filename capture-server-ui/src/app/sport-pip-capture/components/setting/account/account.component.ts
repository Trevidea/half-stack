import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AccountComponent implements OnInit {
  @Input() datasource:any;
  @Output()   save = new EventEmitter();
  @Output()   cancel = new EventEmitter();
  public avatarImage: string;
  constructor() {
  }

  ngOnInit(): void {
    this.avatarImage = '../.././../../../assets/images/avatars/1.png';
  }
  uploadImage(event: any) {

    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();

      reader.onload = (event: any) => {
        this.avatarImage = event.target.result;
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }


}
