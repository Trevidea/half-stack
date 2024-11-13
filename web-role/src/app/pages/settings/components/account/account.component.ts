import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { ValidationAlertComponent } from 'src/app/pages/blocks/validation-alert/validation-alert.component';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [MaterialModule, CommonModule, ReactiveFormsModule, FormsModule, TablerIconsModule, ValidationAlertComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent implements OnInit {
  
  @Input() datasource: any;

  public avatarImage: string;
  ngOnInit(): void {
    this.avatarImage = './assets/images/profile/default-avtar.png';
  }

}
