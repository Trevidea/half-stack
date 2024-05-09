import { NgModule } from "@angular/core";
import { FormHostDirective } from "./form-host.directive";
import { InlineModalComponent } from "./inline-modal.component";
import { FormHostComponent } from "./form-host/form-host.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { CoreCommonModule } from "@core/common.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";

@NgModule({
  declarations: [FormHostDirective, InlineModalComponent, FormHostComponent],
  imports: [
    CommonModule,
    NgbModule,
    CoreCommonModule,
    FormsModule,
    NgSelectModule,
  ],
  exports: [InlineModalComponent],
})
export class InlineFormeModule {}
