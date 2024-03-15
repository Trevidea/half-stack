import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Stepper from 'bs-stepper';
import { ModelServiceService } from 'src/app/model-service/model-service.service';
import { Data } from 'src/app/model-service/payroll-interface';
@Component({
  selector: 'app-meta-type',
  templateUrl: './meta-type.component.html',
  styleUrls: ['./meta-type.component.scss']
})
export class MetaTypeComponent implements OnInit {
  @Input() datasource: any;
  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter();
  @Output() key = new EventEmitter<string>();
  metaType: string[] = []
  value: any
  alert: boolean = false
  activeDiv: number = 0;


  constructor(public modelService: ModelServiceService, private router: Router, private route: ActivatedRoute, private renderer: Renderer2) { }



  ngOnInit(): void {
    setTimeout(() => { this.getMetaType(this.datasource.values[0]) }, 300)

  }

  getMetaType(item) {
    this.alert = false
    console.log(item)
    this.datasource.key = item.key;
    this.datasource.name = item.name;
    this.datasource.id = item.id
    this.metaType = JSON.parse(item.value)
    console.log(this.metaType)
  }
  addMetaType(input: any) {
    console.log(input.value)
    const value = input.value
    const existing = this.metaType.filter(f => f == value)
    this.value = existing
    if (existing[0]) {
      this.alert = true
      input.value = ''
      return;
    }
    this.metaType.push(value)

    const mType = JSON.stringify(this.metaType)
    this.datasource.value = mType
    console.log(this.datasource)
    this.save.emit()
    input.value = ''
  }

  deleteMetaType(item) {
    const itemIndex = this.metaType.findIndex(i => i == item)
    this.metaType.splice(itemIndex, 1)
    const mType = JSON.stringify(this.metaType)
    this.datasource.value = mType
    this.save.emit()
  }
  clearAlert() {
    this.alert = false
  }
  sort(data: string[] | null, order: 0 | 1 = 0): string[] | null {
    if (data) {
      if (order === 0)
        return data.sort()
      else
        return data.sort((a: any, b: any) => b - a);
    }
    else {
      return null;
    }
  }









  // getmetaType(item) {
  //   this.metaType = []
  //   this.modelService.MetaTypeJsonById(item.id).subscribe(
  //     (res) => {
  //       console.log(res)
  //       res['Gateway Response'].result[0].forEach((async metaType => {
  //         if (metaType.field == 'values') {
  //           let arr = [];
  //           arr = await JSON.parse(metaType.value)
  //           arr.forEach(m => this.metaType.push(m))
  //         }
  //       }))
  //     }
  //   )
  // }
  updatemetaType() {
    const arr = `'["HR", "House Keeping", "Development", "ABC"]'`;
    // const escapedArr = arr.map(element => "\\'" + element + "\\'");
    // const outputStr = '"' + '[' + escapedArr.join(', ') + ']' + '"';

    console.log(arr);
    // console.log(['HR','House Keeping','Development','ABC'])
    // [\'HR\', \'House Keeping\', \'Development\', \'ABC\']
    this.modelService.update('meta-type', { name: "'department'", key: "'DEPARTMENT'", values: arr, id: 7 }, 7).subscribe(res => console.log(res))
  }

}
