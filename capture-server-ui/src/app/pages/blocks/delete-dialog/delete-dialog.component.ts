import { Component, Inject, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TablerIconsModule } from 'angular-tabler-icons';

@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [TablerIconsModule, MatDialogModule, MatButtonModule],
  templateUrl: './delete-dialog.component.html',
})
export class DeleteDialogComponent {
  entityName: string;
  title: string;
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { entityName: string, title: string }
  ) {
    this.entityName = data.entityName;
    this.title = data.title;
  }

  doAction(action: string): void {
    this.dialogRef.close({ event: action });
  }
}
