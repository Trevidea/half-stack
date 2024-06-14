import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditProfileComponent implements OnInit {
  @Input() datasource: any;
  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter();
  public avatarImage: string;

  constructor(private ngbModal: NgbModal) {
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
