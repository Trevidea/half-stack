import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { ApplicationFormComponent } from './application-form/application-form.component';

@Component({
  selector: 'app-application',
  standalone: true,
  imports: [TablerIconsModule, MaterialModule, CommonModule],
  templateUrl: './application.component.html',
  styleUrl: './application.component.scss',
  encapsulation:ViewEncapsulation.None
})
export class ApplicationComponent implements OnInit {

  @Input() datasource: any;
  @Output() onAddApp = new EventEmitter();

  constructor(private dialog: MatDialog) {

  }

  ngOnInit(): void {
    console.log(this.datasource);
  }

  addApplication() {
    const dialogRef = this.dialog.open(ApplicationFormComponent, {
      maxWidth: '700px',
      width: '100%',

    });
    dialogRef.afterClosed().subscribe(result => {
      this.onAddApp.emit();
    });
  }
}
