import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FilesComponent implements OnInit {
  @Input () datasource:any

  showFullFileName = false;
  constructor() { }

  ngOnInit(): void {
  }

}
