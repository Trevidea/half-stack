// import { Component, OnInit, ViewEncapsulation } from "@angular/core";
// import { FileRangeView, FileView } from "./view/file";
// import { Transformer } from "app/blocks/transformer";
// import { DataFactoryService } from "app/sport-pip-capture/models/data-factory.service";
// import { FileBuilder } from "./builder/file";

import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FileRangeView, FileView } from "./view/file";
import { Transformer } from "app/blocks/transformer";
import { DataFactoryService } from "app/sport-pip-capture/models/data-factory.service";
import { FileBuilder } from "./builder/file";

@Component({
  selector: 'app-file-presenter',
  template: `<app-files  [datasource]="ds" ></app-files>`,
  styleUrls: ['./files.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class FilePresenter implements OnInit {
  ds!:FileRangeView;

  constructor(private dataFactory: DataFactoryService){
    this.ds = new FileRangeView();
  }

  ngOnInit(): void {
      Transformer.ComposeCollectionAsync(this.dataFactory.FilesIndexJson(),this.ds.file ,FileBuilder)
  }
  
}