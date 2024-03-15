import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { CustomAdapter, CustomDateParserFormatter } from 'src/app/blocks/ngb-date-converter';
import { ModelServiceService } from 'src/app/model-service/model-service.service';

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.scss'],
  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})
export class HolidaysComponent implements OnInit {
  @Input() datasource: any;
  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter();
  constructor(public dataService: ModelServiceService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const heroId = this.route.snapshot.paramMap.get('id');
    console.log(heroId);
    this.dataService.HolidayJson(+heroId).subscribe(data => {
      console.log(data)
    })
  }

  cancelBtn() {
    this.router.navigate(['holidays'])
  }
}
