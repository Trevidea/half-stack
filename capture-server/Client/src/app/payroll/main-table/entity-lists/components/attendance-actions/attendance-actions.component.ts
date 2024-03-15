import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-attendance-actions',
  templateUrl: './attendance-actions.component.html',
  styleUrls: ['./attendance-actions.component.scss'],
 
})
export class AttendanceActionsComponent implements OnInit {
  datasource: any;
  month:string;
  // year:number;
  years: number[] = [];
  selectedYear: number;
  constructor( private modalService: NgbModal,) { 
    this.generateYears();
  }

  ngOnInit(): void {
    console.log(this.datasource)
    const currentDate = new Date();
    this.month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    this.selectedYear = currentDate.getFullYear();
  }

   openModelScreen(content: TemplateRef<any>) {
    this.modalService.open(content, { size: 'md', centered: true });

  }



  generateYears() {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear -20; 
    for (let year = startYear; year <= currentYear; year++) {
      this.years.push(year);
    }
  }
}
