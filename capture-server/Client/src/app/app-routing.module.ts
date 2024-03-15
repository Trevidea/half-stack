import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesPresenter } from './payroll/forms/employees/employees.presenter';
import { HolidaysPresenter } from './payroll/forms/holidays/holidays.presenter';
import { HomeComponent } from './payroll/home/home.component';
import { PayrollPresenter } from './payroll/forms/payroll/payroll.presenter';
import { AttendancePresenter } from './payroll/forms/attendance/attendance.presenter';
import { PayrollAttendancePresenter } from './payroll/forms/payroll-attendance/payroll-attendance.presenter';
import { PayrollEmployeePresenter } from './payroll/forms/payroll-employee/payroll-employee.presenter';
import { PrivilegePresenter } from './payroll/forms/privilege/privilege.presenter';
import { LeavePresenter } from './payroll/forms/leave/leave.presenter';
import { ConfigurationPresenter } from './payroll/forms/configuration/configuration.presenter';
import { SalarySlipPresenter } from './payroll/forms/salary-slip/salary-slip.presenter';
import { PayrollCalculatedPresenter } from './payroll/forms/payroll-calculated/payroll-calculated.presenter';
import { GridviewComponent } from './payroll/main-table/entity-lists/components/gridview/gridview.component';
import { EmpDetailsPersonalComponent } from './payroll/main-table/entity-lists/components/emp-details-personal/emp-details-personal.component';
import { MonthlyAttendancePresenter } from './payroll/forms/monthly-attendance/monthly-attendance.presenter';
import { SalaryRatePresenter } from './payroll/forms/salary-rate/salary-rate.presenter';
import { MonthlySalaryPresenter } from './payroll/forms/monthly-salary/monthly-salary.presenter';
import { MetaTypePresenter } from './payroll/meta-type/meta-type.presenter';
import { SalarySlipPdfComponent } from './payroll/forms/payroll-employee/components/salary-slip/salary-slip-pdf.component';
import { DashboardComponent } from './payroll/dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './guard/auth.guard';
import { SickLeavePresenter } from './payroll/forms/sick-leave/sick-leave.presenter';


const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard],},
  { path: 'salaryslip/:payroll/:employee', component: SalarySlipPdfComponent},
  { path: 'meta-type/:id', component: MetaTypePresenter,canActivate: [AuthGuard] },
  { path: ':payroll', component: HomeComponent ,canActivate: [AuthGuard]},
  { path: 'employees/new', component: EmployeesPresenter,canActivate: [AuthGuard] },
  { path: 'employees/edit', component: EmployeesPresenter,canActivate: [AuthGuard] },
  { path: 'holidays/new', component: HolidaysPresenter,canActivate: [AuthGuard] },
  { path: 'holidays/edit', component: HolidaysPresenter,canActivate: [AuthGuard] },
  { path: 'attendances/new', component: AttendancePresenter,canActivate: [AuthGuard] },
  { path: 'attendances/edit', component: AttendancePresenter, canActivate: [AuthGuard]},
  { path: 'payroll-attendance/new', component: PayrollAttendancePresenter,canActivate: [AuthGuard] },
  { path: 'payroll-attendance/edit', component: PayrollAttendancePresenter,canActivate: [AuthGuard] },
  { path: 'payroll-calculated/new', component: PayrollCalculatedPresenter,canActivate: [AuthGuard]},
  { path: 'payroll-calculated/edit', component: PayrollCalculatedPresenter,canActivate: [AuthGuard] },
  { path: 'payroll-employee/new', component: PayrollEmployeePresenter, canActivate: [AuthGuard]},
  { path: 'payroll-employee/edit', component: PayrollEmployeePresenter, canActivate: [AuthGuard]},
  { path: 'privilege/new', component: PrivilegePresenter, canActivate: [AuthGuard]},
  { path: 'privilege/edit', component: PrivilegePresenter, canActivate: [AuthGuard]},
  { path: 'sick-leaves/new', component: SickLeavePresenter,canActivate: [AuthGuard] },
  { path: 'sick-leaves/edit', component: SickLeavePresenter,canActivate: [AuthGuard] },
  { path: 'payroll/new', component: PayrollPresenter,canActivate: [AuthGuard] },
  { path: 'payroll/edit', component: PayrollPresenter,canActivate: [AuthGuard] },
  { path: 'configuration/new', component: ConfigurationPresenter,canActivate: [AuthGuard] },
  { path: 'configuration/edit', component: ConfigurationPresenter,canActivate: [AuthGuard] },
  { path: 'salary-slip/new', component: SalarySlipPresenter,canActivate: [AuthGuard] },
  { path: 'salary-slip/edit', component: SalarySlipPresenter,canActivate: [AuthGuard] },
  { path: 'gridview/new', component: GridviewComponent },
  { path: 'emp-details-personal/:code', component: EmpDetailsPersonalComponent },
  { path: 'monthly-attendances/new', component: MonthlyAttendancePresenter,canActivate: [AuthGuard] },
  { path: 'monthly-attendances/edit', component: MonthlyAttendancePresenter, canActivate: [AuthGuard]},
  { path: 'salary-rates/new', component: SalaryRatePresenter,canActivate: [AuthGuard] },
  { path: 'salary-rates/edit', component: SalaryRatePresenter,canActivate: [AuthGuard] },
  { path: 'monthly-salaries/new', component: MonthlySalaryPresenter ,canActivate: [AuthGuard]},
  { path: 'monthly-salaries/edit', component: MonthlySalaryPresenter,canActivate: [AuthGuard] },
  { path: 'page-not-found/not', component: PageNotFoundComponent,canActivate: [AuthGuard] },
  { path: 'dashboard/page-not-found', component: PageNotFoundComponent,canActivate: [AuthGuard] },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
