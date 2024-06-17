import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChangePasswordPresenter } from './components/change-password/change-password.presenter';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AccountComponent implements OnInit {
  @Input() datasource: any;
  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter();
  public avatarImage: string;

  constructor(private ngbModle: NgbModal) {
  }

  ngOnInit(): void {
    this.avatarImage = 'assets/images/portrait/small/avatar-s-11.jpg';
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

  openChangePwdModle() {
    this.ngbModle.open(ChangePasswordPresenter, {
      centered: true
    })
  }
}
