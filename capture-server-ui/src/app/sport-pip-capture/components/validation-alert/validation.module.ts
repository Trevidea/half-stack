import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationAlertComponent } from './validation-alert.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreCommonModule } from '@core/common.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ValidationAlertComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    CoreCommonModule,
    FormsModule,
  ],
  exports: [ValidationAlertComponent],
})
export class ValidationModule { }
