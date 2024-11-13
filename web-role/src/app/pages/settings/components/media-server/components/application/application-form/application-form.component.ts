import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApplicationView } from '../view/application';
import { ModelService } from 'src/app/services/model-services/model-service.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-application-form',
  standalone: true,
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.scss'],
  imports: [MaterialModule, CommonModule, ReactiveFormsModule, FormsModule, TablerIconsModule]
})
export class ApplicationFormComponent implements OnInit {
  datasource: ApplicationView;
  constructor(private modelService: ModelService, public dialogRef: MatDialogRef<ApplicationFormComponent>) {
    this.datasource = new ApplicationView()
  }
  ngOnInit(): void {

  }

  onSave() {
    console.log(this.datasource.appName)
    this.modelService.createApp({ 'app-name': this.datasource.appName }).subscribe(
      (data) => {
        console.log(data);
        this.close()
      },
      (error) => {
        console.log(error)
      }
    )
  }

  close(): void {
    this.dialogRef.close();
  }
}
