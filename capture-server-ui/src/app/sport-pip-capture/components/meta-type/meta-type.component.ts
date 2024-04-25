import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewEncapsulation,
} from "@angular/core";
import { DataFactoryService } from "app/sport-pip-capture/models/data-factory.service";

@Component({
  selector: "app-meta-type",
  templateUrl: "./meta-type.component.html",
  styleUrls: ["./meta-type.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class MetaTypeComponent implements OnInit {
  isLoading: boolean = true;
  @Input() datasource: any;
  newValue: string;
  searchMetaValue: string;
  searchMetaType: string;
  listHeader: string;
  constructor(
    private el: ElementRef,
    private dataFactory: DataFactoryService
  ) {}

  private _metaType: {
    id: number;
    values: string[] | undefined;
    key: string;
    name: string;
  };
  public get metaType(): {
    id: number;
    values: string[] | undefined;
    key: string;
    name: string;
  } {
    if (!this._metaType) {
      this.metaType = this.datasource;
    }
    return this._metaType;
  }
  public set metaType(v: {
    id: number;
    values: string[] | undefined;
    key: string;
    name: string;
  }) {
    this._metaType = v;
  }

  ngOnInit(): void {
    // const os = navigator.platform;
    // console.log("Operating System:", os);
    // const isPortrait = window.matchMedia("(orientation: portrait)").matches;
    // console.log("Is Portrait Mode:", isPortrait);

    this.observeDataSourceChanges();
    this.getConnectionType();
  }
  getConnectionType() {
    if (navigator as any) {
      const connection = (navigator as any).connection;
      const online = (navigator as any).onLine;
      const downlink: number = (navigator as any).connection.downlink;
      const rtt: number = (navigator as any).connection.rtt; // get rtt time in milliseconds
      console.log("RRT::", rtt);
      console.log("Download Link::", downlink);
      console.log("Network Information:", connection);

      // Accessing effectiveType to estimate network quality
      console.log("Effective connection type:", connection.effectiveType);
    } else {
      console.log("Network Information API is not supported.");
    }
  }

  OnChangeType(
    i: number,
    item: { id: number; values: string[]; key: string; name: string }
  ) {
    this.newValue = "";
    this.datasource.metatype.forEach(
      (element: { backgroundColor: string; color: string }) => {
        element.backgroundColor = "aliceblue";
        element.color = "black";
      }
    );
    this.datasource.metatype[i].backgroundColor = "#b9b9c3";
    this.datasource.metatype[i].color = "white";
    this.listHeader = item.name;
    this.metaType = item;
  }
  isAdded: boolean = false;
  findValue(e) {
    let index = this.metaType.values.indexOf(e);
    console.log(index);
    if (index == 0) {
      this.isAdded = true;
    }
    return index;
  }
  UpdateRow(item: string) {
    let elementToRemove = item;

    let index = this.metaType.values.indexOf(elementToRemove);
    console.log(index);
    if (index !== -1) {
      this.metaType.values.splice(index, 1);
      const data = this.metaType.values;
      this.dataFactory
        .update("meta-type/value", this.metaType, this.metaType.id)
        .subscribe((d) => {
          console.log(d);
        });
    } else {
      this.metaType.values.push(item);
      const data = this.metaType.values;
      this.dataFactory
        .update("meta-type/value", this.metaType, this.metaType.id)
        .subscribe((d) => {
          console.log(d);
        });
    }
    this.newValue = "";
  }

  private observeDataSourceChanges(): void {
    const interval = setInterval(() => {
      if (this.datasource.metatype.length > 0) {
        try {
          this.OnChangeType(0, this.datasource.metatype[0]);
          this.isLoading = false;
          clearInterval(interval);
        } catch (err) {
          console.log(err);
        }
      }
    }, 100);
  }
  initService() {
    const conn = (navigator as any).connection;
    if (conn) {
      if (conn.saveData) {
        // do something
      }
      const connectionlist = ["slow-2g", "2g", "3g", "4g"];
      const effectiveType = conn.effectiveType;
      console.log("effectiveType", effectiveType);
    }
  }
}
