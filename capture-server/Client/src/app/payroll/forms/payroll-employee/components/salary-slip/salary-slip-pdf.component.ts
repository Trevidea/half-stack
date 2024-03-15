import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import * as html2pdf from 'html2pdf.js';
import { ModelServiceService } from 'src/app/model-service/model-service.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-salary-slip-pdf',
  templateUrl: './salary-slip-pdf.component.html',
  styleUrls: ['./salary-slip-pdf.component.scss']
})
export class SalarySlipPdfComponent implements OnInit {
  htmlFromApi: string;
  sanitizedHtml: SafeHtml;

  constructor(public dataFactory: ModelServiceService, private router: Router, private route: ActivatedRoute, private sanitizer: DomSanitizer) { }
  generatePDF() {
    const element = document.getElementById('pdfContent');
    html2pdf()
      .from(element)
      .save('salary.PDF');
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((data: ParamMap) => {
      console.log(data)
      const employee = data.get('employee')//'4' 
      const payroll = data.get('payroll'); //== 31
      // this.dataFactory.gethtml('4', '31').subscribe(data => {
        this.dataFactory.gethtml(employee, payroll).subscribe(data => {
          console.log(data)
          this.htmlFromApi = data?.['Gateway Response']?.['file-data']
          this.sanitizedHtml = this.sanitizer.bypassSecurityTrustHtml(this.htmlFromApi);
          console.log(this.htmlFromApi)
        })
      })
    }
}
