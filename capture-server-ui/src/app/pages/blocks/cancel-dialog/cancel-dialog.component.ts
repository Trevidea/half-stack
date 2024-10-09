import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TablerIconsModule } from 'angular-tabler-icons';

@Component({
  selector: 'app-cancel-dialog',
  standalone: true,
  imports: [TablerIconsModule, MatDialogModule, MatButtonModule],
  templateUrl: './cancel-dialog.component.html',
})
export class CancelDialogComponent {
  title: string;
  constructor(
    public dialogRef: MatDialogRef<CancelDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string }
  ) {
    this.title = data.title;
  }

  doAction(action: string): void {
    this.dialogRef.close({ event: action });
  }
}
