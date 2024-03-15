import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";

@Component({
  selector: 'app-payroll-actions',
  templateUrl: './payroll-actions.component.html',
  styleUrls: ['./payroll-actions.component.scss']
})
export class PayrollActionsComponent implements OnInit {
  datasource:any;
  constructor() { }

  ngOnInit(): void {
    console.log(this.datasource)
  }
  action(){
    this.datasource.onProAtt()
    console.log(this.datasource.selectedRow)
  }
//   opensweetalertsave() {
//     if (this.state.error == true) {
//         var msg = "";
//         msg = this.state.data?.error?.error?.message;
//         const errs = this.state.data?.error?.error?.details?.errors;
//         if (Array.isArray(errs)) {
//             errs.forEach(err => {
//                 msg += `<h5 style="color: red;">${(err as any).path[0]}</h5><br /><br>`
//             })
//         }
//         if (errs && errs.find(err => (err as any).path[0] === "roNumber")) {
//             Swal.fire({
//                 title: "Validation Error",
//                 html: `<h5 style="color: red;">RO Number not available. Your RO Number has been incremented. Try saving again.</h5><br /><br>`,
//                 icon: 'error'
//             });
//         }
//         else {
//             Swal.fire({
//                 title: "Validation Error",
//                 html: msg,
//                 icon: 'error'
//             });
//         }
//     }
//     else {
//         Swal.fire({
//             title: "Success",
//             html: `<h5 style="color: green;">Record Saved</h5><br /><br>`,
//             icon: 'success',
//         });
//     }
// }
}
