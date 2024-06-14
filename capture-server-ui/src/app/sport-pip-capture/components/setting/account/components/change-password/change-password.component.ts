import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChangePasswordComponent implements OnInit {
  public passwordVar;
  public newPassward;
  public confirmNewPassward;
  public mergedPwdVrShow = false;
  public mergedNewPwdVrShow = false;
  public mergedConPwdShow = false
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
