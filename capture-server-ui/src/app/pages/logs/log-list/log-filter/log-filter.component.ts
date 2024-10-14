import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { NgSelectComponent, NgSelectModule } from '@ng-select/ng-select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';


@Component({
  selector: 'app-log-filter',
  standalone: true,
  imports: [ NgSelectComponent,
    NgSelectModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    TablerIconsModule,
    MatDatepickerModule,],
    providers: [provideNativeDateAdapter()],
  templateUrl: './log-filter.component.html',
  styleUrl: './log-filter.component.scss'
})
export class LogFilterComponent {

}
