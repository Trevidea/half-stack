import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { elementAt, first, map, mergeMap, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AdapterService } from '../payroll/adapter.service';
import { AttendanceModel } from './attendance-model';
import { EmployeeModel } from './employee-model';
import { PayrollEmployeeModel } from './payroll-employee-model';
import { HolidayModel } from './holiday-model';
import { PayrollAttendanceModel } from './payroll-attendance-modal';
import { Data } from './payroll-interface';
import { PayrollModel } from './payroll-model';
import { PrivilegeModel } from './privilege-model';
import { LeaveModel } from './leave-model';
import { ConfigurationModel } from './configuration-model';
import { SalaryModel } from './salary-model';
import { PayrollCalculatedModel } from './payroll-calculated-model';
import { MetaTypeModel } from './meta-type';
import { SalaryRateModel } from './salary-rate-model';
import { MonthlyAttendanceModel } from './monthly-attendance-model';
import { MonthlySalaryModel } from './monthly-salary-model';
import { SelectItemView, SelectStringItemView } from '../blocks/collection-item';
import { SickLeaveModel } from './sick-leave-model';

class ro {

  constructor(private model: ModelServiceService) { }
  updateStage(data: {}) {
    return this.model.create("ros/update-stage", data);
  }
}
@Injectable({
  providedIn: 'root'
})
export class ModelServiceService {
  payrollMonthsList(): SelectStringItemView[] {
    return[
      new SelectStringItemView("1-2024","1-2024"),
      new SelectStringItemView("2-2024","2-2024"),
      new SelectStringItemView("3-2024","3-2024")
    ];
  }


  private pgUrl: string = environment.strapiAPIUrl;
  private modelsServerUrl: string = environment.modelsUrl;

  constructor(private _httpClient: HttpClient, private _adapter: AdapterService) {
    this.SaveHoliday = this.SaveHoliday.bind(this);
    this.SaveEmployee = this.SaveEmployee.bind(this);
    this.SavePayroll = this.SavePayroll.bind(this);
    this.SaveAttendance = this.SaveAttendance.bind(this);
    this.SavePayrollAttendance = this.SavePayrollAttendance.bind(this);
    this.SavePayrollEmployee = this.SavePayrollEmployee.bind(this);
    this.SaveSickLeave = this.SaveSickLeave.bind(this);
    this.SavePrivilege = this.SavePrivilege.bind(this);
    this.SaveLeave = this.SaveLeave.bind(this);
    this.SaveConfiguration = this.SaveConfiguration.bind(this);
    this.SaveSalarySlip = this.SaveSalarySlip.bind(this);
    this.SavePayrollCalculated = this.SavePayrollCalculated.bind(this);
    this.SaveSalaryRate = this.SaveSalaryRate.bind(this);
    this.SaveMonthlyAttendance = this.SaveMonthlyAttendance.bind(this);
    this.SaveMonthlysalary = this.SaveMonthlysalary.bind(this);
    this.MetaType = this.MetaType.bind(this)
  }
  ro = new ro(this);

  create(type: string, entity: any): Observable<any> {
    console.log(type)
    const url = `${this.modelsServerUrl}/${type}`
    console.log(entity)
    return this._adapter.modulateOne(type, entity).pipe(mergeMap(modata => {
      return this._httpClient.post<any>(url, modata);
    }));
  }
  read(type: string): Observable<any> {
    const url = `${this.modelsServerUrl}/${type}`
    return this._httpClient.get<any>(url);
  }
  readOne(type: string, id: number): Observable<any> {
    const url = `${this.modelsServerUrl}/${type}?id=${id}`
    return this._httpClient.get<any>(url);
  }
  update(type: string, entity: any, id: number) {
    const url = `${this.modelsServerUrl}/${type}`
    // entity.values = JSON.parse(entity.values)
    return this._adapter.modulateOne(type, entity).pipe(mergeMap(modata => {
      console.log(url, "::", modata)
      return this._httpClient.put<any>(url, modata);
    }));

  }
  delete(type: string, id: number): Observable<any> {
    let _type = type;
    const pos = type.indexOf("_");
    if (pos >= 0) {
      _type = type.split("_").join("-");
    }
    let url = `${this.modelsServerUrl}/${_type}`
    return this._adapter.modulateOne(type, { "id": id }).pipe(mergeMap(modata => {
      console.log("sending DELETE on ", url, "with data:\n", modata)
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: modata
      };
      return this._httpClient.delete<any>(url, httpOptions);
    }));
  }
   
  

  deleteView(type: string, id: number): Observable<any> {
    // const url = `${this.strapiUrl}/${type}/del/${id}`
    const url = `${this.modelsServerUrl}/${type}/view/${id}`
    console.log(url)
    return this._httpClient.delete<any>(url);
  }

  schema(type: string) {
    const url = `${this.modelsServerUrl}/${type}/schema`
    return this._httpClient.get<any>(url);
  }

  views(type: string): Observable<any> {
    const url = `${this.modelsServerUrl}/${type}/views`
    return this._httpClient.get<any>(url);
  }

  private _getSelectedList<I extends Data.Base>(resource: string, id: number): Observable<I[]> {
    return this._adapter.demodulate(resource, this.readOne(resource, id))
      .pipe(map(models => models.map((model: any) => {
        return model as I
      })));
  }
  private _getList<I extends Data.Base>(resource: string): Observable<I[]> {

    return this._adapter.demodulate(resource, this.read(resource))
      .pipe(map(models => models.map((model: any) => {
        return model as I
      })));
  }


  private _get<I extends Data.Base>(resource: string, id: number): Observable<I> {

    return this._adapter.demodulate(resource, this.readOne(resource, id))
      .pipe(map(models => models.map((model: any) => {
        return model as I
      })));
  }


  private _data<M, I extends Data.Base>(resource: string, type: new (I: Data.Base) => M): Observable<M[]> {
    return this._getList<I>(resource)
      .pipe(map((data: I[]) => data.map((datum: I) => new type(datum))));
  }
  private _datum<M, I extends Data.Base>(resource: string, id: number, type: new (I: Data.Base) => M): Observable<M> {

    return this._get<I>(resource, id)
      .pipe(first())
      .pipe(map((datum: I) => new type(datum)))
      ;
  }
  private _selectData<M, I extends Data.Base>(resource: string, id: number, type: new (I: Data.Base) => M): Observable<M[]> {
    return this._getSelectedList<I>(resource, id)
      .pipe(map((data: I[]) => data.map((datum: I) => new type(datum))))

  }
  private _selectOne<M, I extends Data.Base>(resource: string, id: number, type: new (I: Data.Base) => M): Observable<M> {
    return this._selectData(resource, id, type).pipe(map((data: M[]) => data.at(0)));
  }
  MetaTypeJsonByKey(key: string)
    : Observable<Data.MetaType> {
    const url = `${this.pgUrl}/meta-type?key='${key}'`
    return this._httpClient.get<MetaTypeModel>(url);
  }

  MetaTypeJsonById(id: number)
    : Observable<Data.MetaType> {
    const url = `${this.pgUrl}/meta-type?id=${id}`
    return this._httpClient.get<MetaTypeModel>(url);
  }
  
  gethtml(employeeId: string, payrollId: string): Observable<any> {
    console.log(employeeId, payrollId)
    const url = `${this.pgUrl}/salary-slip?employee=${employeeId}&payroll=${payrollId}`
    return this._httpClient.get<any>(url);
  }
  // gethtml(employeeId: string, payrollId: string): Observable<any> {
  //   const url = `${this.pgUrl}/salary-slip?employee=${employeeId}&payroll=${payrollId}`
  //   return this._httpClient.get<any>(url);

  // }
  HolidayCategories() {
    return ["Primary", "Secondary"]
  }
  HolidaysJson(): Observable<HolidayModel[]> {
    return this._data("holidays", HolidayModel);
  }


  EmployeeDepartment() {
    return ["IT", "HR"]
  }
  EmployeeDsignation() {
    return ["Front End Developer", "Software Developer", "HR Manager", "Software Developer (Asso)", "UI/UX Designer", "Office Assistant"]
  }
  EmployeeWeeklyOff() {
    return ["Saturday", "Sunday"]
  }
  EmployeeHoliday() {
    return ["Primary"]
  }

  EmployeesJson(): Observable<EmployeeModel[]> {
    return this._data("employees", EmployeeModel);
  }
  ALLMetaTypeJson(): Observable<MetaTypeModel[]> {
    return this._data(`meta-type`, MetaTypeModel)
  }
  MetaTypeJson(id: number, key: string): Observable<Data.MetaType> {
    return this._selectOne(`meta-type`, id, MetaTypeModel)
  }
  /////created method for salary rate
  SalaryRateJson(id: number): Observable<Data.SalaryRate> {
    return this._selectOne("salary-rate", id, SalaryRateModel);
  }

  //////created method for select monthlyAttendance



  HolidayJson(id: number): Observable<Data.Holiday> {
    return this._selectOne("holiday", id, HolidayModel);
  }
  EmployeeJson(id: number): Observable<Data.Employee> {
    return this._selectOne("employee", id, EmployeeModel);
  }



  PayrollsJson(): Observable<PayrollModel[]> {
    return this._data("payrolls", PayrollModel);
  }
  PayrollJson(id: number): Observable<Data.Payroll> {
    return this._selectOne("payroll", id, PayrollModel);
  }
  AttendancesJson(): Observable<AttendanceModel[]> {
    return this._data("attendance-list", AttendanceModel);
  }
  AttendancesJsonRaw(query: string): Observable<AttendanceModel[]> {
    return this._data(`attendance-list?${query}`, AttendanceModel);
  }
  AttendanceJson(id: number): Observable<Data.Attendance> {
    return this._selectOne("attendance-list", id, AttendanceModel);
  }
  PayrollAttendancesJson(): Observable<PayrollAttendanceModel[]> {
    return this._data("payroll-attendance-list", PayrollAttendanceModel);
  }


  MonthlyAttendanceJson(id: number): Observable<Data.MonthlyAttendance> {
    console.log(id)
    return this._selectOne("monthly-attendance", id, MonthlyAttendanceModel);
  }


  MonthlyAttendanceListJson(): Observable<MonthlyAttendanceModel[]> {
    return this._data("monthly-attendance-list", MonthlyAttendanceModel);
  }



  PayrollAttendanceJson(id: number): Observable<Data.PayrollAttendance> {
    return this._selectOne("payroll-attendance", id, PayrollAttendanceModel);
  }
  PayrollEmployeesJson(): Observable<PayrollEmployeeModel[]> {
    return this._data("payroll-employee-list", PayrollEmployeeModel);
  }
  PayrollEmployeeJson(id: number): Observable<Data.PayrollEmployee> {
    return this._selectOne("payroll-employee", id, PayrollEmployeeModel);
  }
  PrivilegesJson(): Observable<PrivilegeModel[]> {
    return this._data("privilege-list", PrivilegeModel);
  }

  // ///////////////////////////////
  salaryRateJson(): Observable<SalaryRateModel[]> {
    return this._data("salary-rate-list", SalaryRateModel);
  }

  PrivilegeJson(id: number): Observable<Data.Privilege> {
    return this._selectOne("privilege", id, PrivilegeModel);
  }

  SickLeavesJson(): Observable<Data.SickLeave[]> {
    return this._data("sick-leave-list", SickLeaveModel);
  }
  SickLeaveJson(id: number): Observable<Data.SickLeave> {
    return this._selectOne("sick-leave", id, SickLeaveModel);
  }
  LeavesJson(): Observable<LeaveModel[]> {
    return this._data("payroll-leave-list", LeaveModel);
  }
  LeaveJson(id: number): Observable<Data.Leave> {
    return this._selectOne("payroll-leave", id, LeaveModel);
  }
  ConfigsJson(): Observable<ConfigurationModel[]> {
    return this._data("configs", ConfigurationModel);
  }
  ConfigJson(id: number): Observable<Data.Configuration> {
    return this._selectOne("config", id, ConfigurationModel);
  }
  SalarySlipsJson(): Observable<SalaryModel[]> {
    return this._data("salary-slip-fields", SalaryModel);
  }
  SalarySlipJson(id: number): Observable<Data.Salary> {
    return this._selectOne("salary-slip-field", id, SalaryModel);
  }
  PayrollsCalculatedJson(): Observable<PayrollCalculatedModel[]> {
    return this._data("payroll-calculated-list", PayrollCalculatedModel);
  }

  // ////created method for populate table of monthlysalary
  MonthlySalariesJson(): Observable<MonthlySalaryModel[]> {
    return this._data("monthly-salary-list", MonthlySalaryModel);
  }


  MonthlySalariesForPayrollJson(query:string):  Observable<MonthlySalaryModel[]> {
    return this._data(`monthly-salary-list?${query}`, MonthlySalaryModel);
  }

  ///created method for create and update table of Monthly salary
  MonthlySalaryJson(id: number): Observable<Data.MonthlySalary> {
    return this._selectOne("monthly-salary", id, MonthlySalaryModel);
  }

  PayrollCalculatedJson(id: number): Observable<Data.PayrollCalculated> {
    return this._selectOne("payroll-calculated", id, PayrollCalculatedModel);
  }
  SaveHoliday(data: Data.Holiday): Observable<Data.Holiday> {

    if (data.id) {
      return this.update("holiday", data, data.id)
    }
    else {
      return this.create("holiday", data);
    }
  }
  SaveEmployee(data: Data.Employee): Observable<Data.Employee> {
    if (data.id) {
      return this.update("employee", data, data.id)
    }
    else {
      return this.create("employee", data);
    }
  }
  SavePayroll(data: Data.Payroll): Observable<Data.Payroll> {
    console.log(data)
    if (data.id) {
      return this.update("payroll", data, data.id)
    }
    else {
      return this.create("payroll", data);
    }
  }
  SaveAttendance(data: Data.Attendance): Observable<Data.Attendance> {
    console.log(data)
    if (data.id) {
      return this.update("attendance", data, data.id)
    }
    else {
      return this.create("attendance", data);
    }
  }
  SavePayrollAttendance(data: Data.PayrollAttendance): Observable<Data.PayrollAttendance> {
    console.log(data)
    if (data.id) {
      return this.update("payroll-attendance", data, data.id)
    }
    else {
      return this.create("payroll-attendance", data);
    }
  }
  /// method  created for create and update monthly-attendance table in database
  SaveMonthlyAttendance(data: Data.MonthlyAttendance): Observable<Data.MonthlyAttendance> {
    console.log(data)

    if (data.id) {
      return this.update("monthly-attendance", data, data.id);
    }
    else {
      return this.create("monthly-attendance", data);
    }

  }

  //method created for create and update SalaryRate table in database
  SaveSalaryRate(data: Data.SalaryRate): Observable<Data.SalaryRate> {
    if (data.id) {
      return this.update("salary-rate", data, data.id)
    }
    else {
      return this.create("salary-rate", data);
    }
  }
  MetaType(data: Data.MetaType): Observable<Data.MetaType> {
    console.log(data)
    if (data.id) {
      console.log("updaing meta type ")
      return this.update("meta-type", data, data.id)
    }
    else {
      return this.create("meta-type", data);
    }
  }
  SavePayrollEmployee(data: Data.PayrollEmployee): Observable<Data.PayrollEmployee> {
    console.log(data)
    if (data.id) {
      return this.update("payroll-employee", data, data.id)
    }
    else {
      return this.create("payroll-employee", data);
    }
  }
  SavePrivilege(data: Data.Privilege): Observable<Data.Privilege> {
    console.log(data)
    if (data.id) {
      return this.update("privilege", data, data.id)
    }
    else {
      return this.create("privilege", data);
    }
  }

  SaveSickLeave(data: Data.SickLeave): Observable<Data.SickLeave> {
    console.log(data)
    if (data.id) {
      return this.update("sick-leave", data, data.id)
    }
    else {
      return this.create("sick-leave", data);
    }
  }
  SaveLeave(data: Data.Leave): Observable<Data.Leave> {
    console.log(data)
    if (data.id) {
      return this.update("payroll-leave", data, data.id)
    }
    else {
      return this.create("payroll-leave", data);
    }
  }
  SaveConfiguration(data: Data.Configuration): Observable<Data.Configuration> {
    console.log(data)
    if (data.id) {
      return this.update("config", data, data.id)
    }
    else {
      return this.create("config", data);
    }
  }
  SaveSalarySlip(data: Data.Salary): Observable<Data.Salary> {
    console.log(data)
    if (data.id) {
      return this.update("salary-slip-field", data, data.id)
    }
    else {
      return this.create("salary-slip-field", data);
    }
  }

  //created service method  for update  and create table in database 
  SaveMonthlysalary(data: Data.MonthlySalary): Observable<Data.MonthlySalary> {
    console.log(data)
    if (data.id) {
      return this.update("monthly-salary", data, data.id)
    }
    else {
      return this.create("monthly-salary", data);
    }
  }

  SavePayrollCalculated(data: Data.PayrollCalculated): Observable<Data.PayrollCalculated> {
    console.log(data)
    if (data.id) {
      return this.update("payroll-calculated", data, data.id)
    }
    else {
      return this.create("payroll-calculated", data);
    }
  }

  ImportAttendance(forMonth: string) {
    const uri = `attendance/process?month=${forMonth}`;
    this.read(uri).subscribe((data)=>{
       console.log(data)
    },err=>console.log(err))
  }

  // ImportAttendance(forMonth: string) {
  //   const uri = `attendance/process?month=${forMonth}`;
  //   this.read(uri).subscribe(
  //     resp => console.log(resp),
  //     error => {
  //       if (error.status === 0) {
  //         console.error('Failed to connect. Check your internet connection.');
  //       } else {
  //         console.error(`HTTP error: ${error.status} - ${error.message}`);
  //       }
  //     }
  //   );
  // }
  
  ProcessAttendance(year: number, month: number) {
    const uri = `monthly-attendance/process?year=${year}&month=${month}`;
    this.read(uri).subscribe(resp => console.log(resp));
  }
  ProcessSalary(year: number, month: number) {
    const uri = `monthly-salary/process?year=${year}&month=${month}`;
    this.read(uri).subscribe(resp => console.log(resp));
  }

}
