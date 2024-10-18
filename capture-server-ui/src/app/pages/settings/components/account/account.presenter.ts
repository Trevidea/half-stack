import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { ValidationAlertComponent } from 'src/app/pages/blocks/validation-alert/validation-alert.component';
import { AccountComponent } from "./account.component";
import { AccountView, AccountViewRange } from './views/account-view';
import { Views } from 'src/app/services/models-interfaces/half-stack-interface';
import { Transformer } from 'src/app/blocks/transformer';
import { ModelService } from 'src/app/services/model-services/model-service.service';
import { Router } from '@angular/router';
import { AccountBuilder } from './builder/account';

@Component({
  selector: 'app-account-presenter',
  standalone: true,
  imports: [AccountComponent],
  template: `<app-account [datasource]="userObject"></app-account>`,
  styleUrl: './account.component.scss'
})
export class AccountPresenter implements OnInit {
  ds!: AccountViewRange;
  userObject: AccountView;
  actions!: Views.FormActions;

  constructor(private modelService: ModelService, router: Router) {
    this.ds = new AccountViewRange();
    this.userObject = new AccountView();
    this.ds.id = 1;
  }

  public avatarImage: string;
  ngOnInit(): void {
    Transformer.ComposeCollectionAsync(this.modelService.LoggedInUserDetails('johndoe'), this.ds.account, AccountBuilder).then(
      () => {
        this.userObject = this.ds.account[0];
      }
    )
  }

}
