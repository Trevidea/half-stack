import { AfterContentInit, AfterViewInit, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-weekly-off',
  templateUrl: './weekly-off.component.html',
  styleUrls: ['./weekly-off.component.scss']
})
export class WeeklyOffComponent implements OnInit, AfterContentInit {
  @Input() datasource: any
  week: any = {
    "Sunday": { checked: false, value: 0 },
    "Monday": { checked: false, value: 1 },
    "Tuesday": { checked: false, value: 2 },
    "Wednesday": { checked: false, value: 3 },
    "Thursday": { checked: false, value: 4 },
    "Friday": { checked: false, value: 5 },
    "Saturday": { checked: false, value: 6 },
  }
  constructor() {

  }
  ngAfterContentInit(): void {
    setTimeout(() => {
      let digitsArray = []
      if (this.datasource.weeklyOff) {
        digitsArray = this.datasource.weeklyOff.toString().split('').map(Number);
      }
      digitsArray.forEach(element => {
        for (const day in this.week) { // logs the value of the 'value' property for the current day
          if (this.week[day].value == element) {
            this.week[day].checked = true
          }
        }

      });
    }, 30)
  }

  ngOnInit(): void {
    // let digitsArray = this.datasource.weeklyOff.toString().split('').map(Number);
    console.log(this.datasource)
  }



  onChecked(e: any) {
    let val: string = ''
    for (const day of Object.keys(this.week)) {
      console.log(this.week[day])
      if (this.week[day].checked)
        val += this.week[day].value
    }

    this.datasource.weekly_Off = val;
    console.log(val)
    console.log(this.datasource)
  }
}
