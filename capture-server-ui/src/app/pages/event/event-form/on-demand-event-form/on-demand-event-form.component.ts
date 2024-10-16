import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MaterialModule } from 'src/app/material.module';
import { ValidationAlertComponent } from "../../../blocks/validation-alert/validation-alert.component";
import { OnDemandEventFormView } from '../views/onDemand';
import { CancelDialogComponent } from 'src/app/pages/blocks/cancel-dialog/cancel-dialog.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

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

  constructor(private router: Router){}

  readonly dialog= inject(MatDialog);

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

  openCancelDialog(): void {
    const dialogRef = this.dialog.open(CancelDialogComponent, {
      data: { title: "Event" },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if(result.event === 'cancel') {
        this.router.navigate(['/events']);
      }
    });
  }

}
