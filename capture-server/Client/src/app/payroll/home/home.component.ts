import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ModelServiceService } from 'src/app/model-service/model-service.service';
import { ActionHostDirective } from '../action-host.directive';
import { attendanceList } from '../main-table/entity-lists/attendance-list';
import { ActionComponent } from '../main-table/entity-lists/components/action-component';
import { configList } from '../main-table/entity-lists/configuration-list';
import { employeeList } from '../main-table/entity-lists/employee-list';
import { holidayList } from '../main-table/entity-lists/holiday-list';
// import { leaveList } from '../main-table/entity-lists/leave-list';
import { ListDataBase } from '../main-table/entity-lists/list-data-base';
import { MonthlyAttendanceList } from '../main-table/entity-lists/monthly-attendance-list';
import { MonthlySalaryList } from '../main-table/entity-lists/monthy-salary-list';
import { payrollAttendanceList } from '../main-table/entity-lists/payroll-attendance-list';
import { payrollCalculatedList } from '../main-table/entity-lists/payroll-calculated-list';
import { payrollEmployeeList } from '../main-table/entity-lists/payroll-employee-list';
import { payrollList } from '../main-table/entity-lists/payroll-list';
import { privilegeList } from '../main-table/entity-lists/privilege-list';
import { salaryRateList } from '../main-table/entity-lists/salary-rate-list';
import { salarySlipList } from '../main-table/entity-lists/salary-slip-list';
import { sickLeaveList } from '../main-table/entity-lists/sick-leave-list';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  filterData: any;
  listData: ListDataBase = null;
  title: string
  entTitle: string
  ent: string
  isClicked: boolean = false;

  // @ViewChild(ActionHostDirective, { static: true }) actionHost!: ActionHostDirective;



  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public dataService: ModelServiceService,
    private attendanceList: attendanceList,
    private payrollList: payrollList,
    private monthlySalary: MonthlySalaryList,
    private sickLeaveList: sickLeaveList,
    private employeeList:employeeList,
    private payrollAttendanceList:payrollAttendanceList,
    private MonthlyAttendanceList:MonthlyAttendanceList,
    private payrollEmployeeList:payrollEmployeeList,
    private privilegeList:privilegeList,
    private configList:configList,
    private salarySlipList:salarySlipList,
    private payrollCalculatedList:payrollCalculatedList,
    private salaryRateList:salaryRateList,
    private holidayList:holidayList) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.ent = params.get('payroll');
      this.entTitle = this.ent.split("-").join(" ")
      switch (this.ent) {
        case 'employees': {
          this.listData = this.employeeList;
          break;
        }
        case 'payroll': {
          // const paylist:payrollList = new payrollList();
          this.listData = this.payrollList;
          break;
        }
        case 'attendances': {
          this.listData = this.attendanceList;
          //new attendanceList(this.dataService)
          break;
        }
        case 'payroll-attendance': {
          this.listData = this.payrollAttendanceList
          break;
        }
        case 'monthly-attendances': {
          this.listData = this.MonthlyAttendanceList
          break;
        }
        case 'payroll-employee': {
          this.listData = this.payrollEmployeeList
          break;
        }
        case 'privilege': {
          this.listData = this.privilegeList
          break;
        }
        case 'sick-leaves': {
          this.listData = this.sickLeaveList
          break;
        }
        case 'configuration': {
          this.listData = this.configList
          break;
        }
        case 'salary-slip': {
          this.listData = this.salarySlipList
          break;
        }
        case 'payroll-calculated': {
          this.listData = this.payrollCalculatedList
          break;
        }
        case 'monthly-salaries': {
          this.listData = this.monthlySalary
          break;
        }

        case 'salary-rates': {
          this.listData = this.salaryRateList
          break;
        }
        default: {
          this.listData = this.holidayList
          console.warn("Default list:", this.listData)
        }
      }
      this.onRefresh();

    })

  }

  onRefresh() {
    this.listData.populate(this.dataService);
    this.loadActions();
  }
  getTitle(title: string) {
    this.ent = title;
    this.title = this.ent

  }

  rotate(e: any) {
    this.isClicked = !this.isClicked;
    console.log(this.isClicked)
  }

  getChevronStyle() {
    console.log('called')
    if (this.isClicked) {
      return { 'transform': 'rotate(180deg)' }
    } else {
      return { 'transform': 'rotate(180deg)' }
    }
  }
  loadActions() {
    // const viewContainerRef = this.actionHost.viewContainerRef;
    // viewContainerRef.clear();
    // console.log(this.actionHost.data);
    // console.log(viewContainerRef);
    // this.listData.actions.forEach(action => {
    //   console.log(action)
    //   const componentRef = viewContainerRef.createComponent<ActionComponent>(action.component);
    //   componentRef.instance.datasource = action.data;
    // })
  }


}
