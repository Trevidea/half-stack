import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MaterialModule } from 'src/app/material.module';
import { ValidationAlertComponent } from "../../../blocks/validation-alert/validation-alert.component";

@Component({
  selector: 'app-on-demand-event-form',
  standalone: true,
  imports: [MaterialModule, CommonModule, FormsModule, ReactiveFormsModule, ValidationAlertComponent],
  providers: [provideNativeDateAdapter()],
  templateUrl: './on-demand-event-form.component.html',
  styleUrl: './on-demand-event-form.component.scss'
})
export class OnDemandEventFormComponent {
  @Input() datasource: any;
  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter();
  thumbnailUrl: string | ArrayBuffer | null = null; 

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.thumbnailUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
