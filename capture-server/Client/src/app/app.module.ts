import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './payroll/header/header.component';
import { SidenavComponent } from './payroll/sidenav/sidenav.component';
import { HomeComponent } from './payroll/home/home.component';
import { DashboardComponent } from './payroll/dashboard/dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
 import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { HttpClientModule } from '@angular/common/http';
import { EmployeesComponent } from './payroll/forms/employees/employees.component';
import { HolidaysComponent } from './payroll/forms/holidays/holidays.component';
import { AttendanceComponent } from './payroll/forms/attendance/attendance.component';
import { PayrollAttendanceComponent } from './payroll/forms/payroll-attendance/payroll-attendance.component';
import { PayrollCalculatedComponent } from './payroll/forms/payroll-calculated/payroll-calculated.component';
import { PayrollEmployeeComponent } from './payroll/forms/payroll-employee/payroll-employee.component';
import { LeaveComponent } from './payroll/forms/leave/leave.component';
import { PayrollComponent } from './payroll/forms/payroll/payroll.component';
import { ConfigurationComponent } from './payroll/forms/configuration/configuration.component';
import { SalarySlipComponent } from './payroll/forms/salary-slip/salary-slip.component';
import { MainTableComponent } from './payroll/main-table/main-table.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HolidaysPresenter } from './payroll/forms/holidays/holidays.presenter';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTablePagerComponent } from './payroll/main-table/pager.component';
import { EmployeesPresenter } from './payroll/forms/employees/employees.presenter';
import { WeeklyOffComponent } from './payroll/forms/employees/components/weekly-off/weekly-off.component';
import { PayrollPresenter } from './payroll/forms/payroll/payroll.presenter';
import { AttendancePresenter } from './payroll/forms/attendance/attendance.presenter';
import { PayrollAttendancePresenter } from './payroll/forms/payroll-attendance/payroll-attendance.presenter';
import { PayrollEmployeePresenter } from './payroll/forms/payroll-employee/payroll-employee.presenter';
import { PrivilegePresenter } from './payroll/forms/privilege/privilege.presenter';
import { PrivilegeComponent } from './payroll/forms/privilege/privilege.component';
import { LeavePresenter } from './payroll/forms/leave/leave.presenter';
import { ConfigurationPresenter } from './payroll/forms/configuration/configuration.presenter';
import { SalarySlipPresenter } from './payroll/forms/salary-slip/salary-slip.presenter';
import { PayrollCalculatedPresenter } from './payroll/forms/payroll-calculated/payroll-calculated.presenter';
import { FilterComponent } from './payroll/home/componenets/filter/filter.component';
import { FormFooterComponent } from './payroll/forms/form-footer/form-footer.component';
import { DeleteButtonComponent } from './payroll/main-table/entity-lists/components/delete-button/delete-button.component';
import { ActionHostDirective } from './payroll/action-host.directive';
import { PayrollActionsComponent } from './payroll/main-table/entity-lists/components/payroll-actions/payroll-actions.component';
// import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { SearchPipe } from './payroll/home/pipes/filterPipe';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DatefilterComponent } from './payroll/main-table/entity-lists/components/datefilter/datefilter.component';

import { NgbDatepickerModule ,  } from '@ng-bootstrap/ng-bootstrap';

import {MatGridListModule} from '@angular/material/grid-list';
import { GridviewComponent } from './payroll/main-table/entity-lists/components/gridview/gridview.component';
import { DepartmentFilterPipe } from './payroll/main-table/filters/department-filter.pipe';
import { GridView2Component } from './payroll/main-table/grid-view2/grid-view2.component';
import { EmpDetailsPersonalComponent } from './payroll/main-table/entity-lists/components/emp-details-personal/emp-details-personal.component';
import { MetaTypeComponent } from './payroll/meta-type/meta-type.component';
import { MonthlyAttendanceComponent } from './payroll/forms/monthly-attendance/monthly-attendance.component';
import { SalaryRateComponent } from './payroll/forms/salary-rate/salary-rate.component';
import { MonthlyAttendancePresenter } from './payroll/forms/monthly-attendance/monthly-attendance.presenter';
import { MonthlySalaryComponent } from './payroll/forms/monthly-salary/monthly-salary.component';
import { MonthlySalaryPresenter } from './payroll/forms/monthly-salary/monthly-salary.presenter';
import { SalaryRatePresenter } from './payroll/forms/salary-rate/salary-rate.presenter';
import { SalarySlipActionComponent } from './payroll/main-table/entity-lists/components/salary-slip-action/salary-slip-action.component';
import { MetaTypePresenter } from './payroll/meta-type/meta-type.presenter';
import { AttendanceActionsComponent } from './payroll/main-table/entity-lists/components/attendance-actions/attendance-actions.component';
// import { MonthlySalaryComponent } from './payroll/forms/monthly-salary/monthly-salary.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { SalarySlipPdfComponent } from './payroll/forms/payroll-employee/components/salary-slip/salary-slip-pdf.component';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import * as feather from 'feather-icons';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { APP_INITIALIZER } from '@angular/core';
import { KeycloakAngularModule , KeycloakService} from 'keycloak-angular';
import { initializeKeycloak } from './init/keycloak-init.factory';
import { SickLeaveComponent } from './payroll/forms/sick-leave/sick-leave.component';
import { SickLeavePresenter } from './payroll/forms/sick-leave/sick-leave.presenter';
import { ModalComponent } from './payroll/components/modal/modal.component';
import { ConfirmationModalComponent } from './payroll/components/confirmation-modal/confirmation-modal.component';
import { AttendanceDownloadModalComponent } from './payroll/components/attendance-download-modal/attendance-download-modal.component';
@NgModule(
  {
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
    HomeComponent,
    DashboardComponent,
    EmployeesComponent,
    HolidaysComponent,
    AttendanceComponent,
    PayrollAttendanceComponent,
    PayrollCalculatedComponent,
    PayrollEmployeeComponent,
    PrivilegeComponent,
    LeaveComponent,
    PayrollComponent,
    ConfigurationComponent,
    SalarySlipComponent,
    MainTableComponent,
    HolidaysPresenter,
    DataTablePagerComponent,
    EmployeesPresenter,
    WeeklyOffComponent,
    PayrollPresenter,
    AttendancePresenter,
    PayrollAttendancePresenter,
    PayrollEmployeePresenter,
    PrivilegePresenter,
    LeavePresenter,
    ConfigurationPresenter,
    SalarySlipPresenter,
    PayrollCalculatedPresenter,
    FilterComponent,
    FormFooterComponent,
    DeleteButtonComponent,
    ActionHostDirective,
    PayrollActionsComponent,
    SearchPipe,
    DatefilterComponent,
    GridviewComponent,
    DepartmentFilterPipe,
    GridView2Component,
    EmpDetailsPersonalComponent,
    MetaTypeComponent,
    SalarySlipPdfComponent,
    MonthlyAttendanceComponent,
    SalaryRateComponent,
    MonthlyAttendancePresenter,
    MonthlySalaryComponent,
    MonthlySalaryPresenter,
    SalaryRatePresenter,
    SalaryRateComponent,
    SalarySlipActionComponent,
    MetaTypePresenter,
    AttendanceActionsComponent,
    PageNotFoundComponent,
    SickLeaveComponent,
    SickLeavePresenter,
    ModalComponent,
    ConfirmationModalComponent,
    AttendanceDownloadModalComponent

    // MonthlySalaryComponent,
 
   
    // MatPaginatorModule
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxDatatableModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatExpansionModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    NgSelectModule,
    MatFormFieldModule,
    MatDatepickerModule,
    NgbDatepickerModule,
    NgbModule ,
    MatGridListModule,
    // MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    KeycloakAngularModule
    

  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
    { 
      provide: MAT_DATE_LOCALE, useValue: 'en-US' 
    }, // Use your preferred locale here
    // Other services and providers
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
