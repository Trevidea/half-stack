import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
interface DataItem {
  _id: number;
  _key: string;
  _name: string;
  _value: string;
}
@Component({
  selector: 'app-meta-type',
  standalone: true,
  imports: [MatCardModule, CommonModule, MaterialModule, FormsModule, ReactiveFormsModule, TablerIconsModule],
  templateUrl: './meta-type.component.html',
  styleUrl: './meta-type.component.scss'
})
export class MetaTypeComponent implements OnInit {
  @Input() datasource: any;
  @Output() save = new EventEmitter();
  metaType: string[] = []
  value: any
  alert: boolean = false
  activeDiv: string;

  ngOnInit(): void {
    setTimeout(() => {
      this.getMetaType(this.getMetaType(this.datasource.values[0]));
    }, 1000)
  }

  getMetaType(item) {
    this.alert = false
    console.log(item)
    this.activeDiv = item.name;
    this.datasource.key = item.key;
    this.datasource.name = item.name;
    this.datasource.id = item.id
    this.metaType = JSON.parse(item._value)
  }

  onKeyUp() {
    this.alert = false;
  }

  addNewValue(intputValue: any) {
    this.value = intputValue.value
    console.log(this.value)
    if (intputValue.value == '') {
      return;
    }
    const existing = this.metaType.find(f => f === intputValue.value)
    if (existing) {
      this.alert = true
      intputValue.value = ''
      return;
    }
    this.metaType.push(this.value)
    const mType = JSON.stringify(this.metaType)
    this.datasource.value = mType
    console.log(this.datasource)
    this.save.emit()
    intputValue.value = ''
  }

  deleteMetaType(item) {
    const itemIndex = this.metaType.findIndex(i => i == item)
    this.metaType.splice(itemIndex, 1)
    const mType = JSON.stringify(this.metaType)
    this.datasource.value = mType
    this.save.emit()
  }

  sort(data: DataItem[] | null, order: 0 | 1 = 0): DataItem[] | null {
    if (data) {
      if (order === 0) return data.sort((a, b) => a._key.localeCompare(b._key));
      else return data.sort((a, b) => b._key.localeCompare(a._key));
    } else {
      return null;
    }
  }

}
