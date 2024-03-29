import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable, combineLatest, of } from "rxjs";
import { map } from "rxjs/operators";

export interface Template {
  field: string,
  type: number
}
@Injectable({
  providedIn: 'root'
})
export class AdapterService {
  private modelsServerUrl: string = environment.spModelUrl;
  templateMap: { [resource: string]: { [field: string]: number } } = {};

  read(type: string): Observable<any> {
    const url = `${this.modelsServerUrl}/${type}`
    return this._httpClient.get<any>(url);
  }

  constructor(private _httpClient: HttpClient) { }
  cppToNg(cppObj: { field: string, type: number, value: any }[]): { field: string, value: any } {
    let ngObj: any = {};
    for (const obj of cppObj) {
      ngObj[obj.field] = obj.value;
    }
    return ngObj;
  }

  getTemplateMap(forResource: string): Observable<{ [field: string]: number; }> {
    if (this.templateMap.hasOwnProperty(forResource))
      return of(this.templateMap[forResource]);
    else {
      const pos = forResource.indexOf("-");
      if (pos >= 0) {
        forResource = forResource.split("-").join("");
      }
      console.log(forResource)
      const tmpl = this.read(`${forResource}/template`);
      console.log(tmpl)
      return tmpl.pipe(map(t => {
        let templObj: { [field: string]: number; } = {};
        for (const elem of t["Gateway Response"]) {
          templObj[elem.field] = elem.type;
        }
        this.templateMap[forResource] = templObj;
        console.log(' this.templateMap[forResource]', this.templateMap[forResource])
        return templObj;
      }));
    }
  }
  ngToCpp(ngObj: { field: string, value: any }, resource: string): Observable<{ field: string, type: number, value: any }[]> {
    console.log(ngObj, resource)
    return this.getTemplateMap(resource).pipe(map(template => {
      let cppObj: { field: string, type: number, value: any }[] = [];
      for (const key of Object.keys(ngObj)) {
        if (key == "id") continue;

        let obj: { field: string, type: number, value: any } = { field: key, type: template[key], value: ngObj[key] };
        cppObj.push(obj);
        console.log(obj)
      }
      return cppObj;
    }))
  }
  demodulate(type: string, data: Observable<any>): Observable<any> {

    return data.pipe(map(blob => blob["Gateway Response"].result))
      .pipe(map((arr: any[]) => {
        return arr.map(cppObj => this.cppToNg(cppObj));

      }));
  }
  modulate(type: string, data: any): Observable<any> {
    return combineLatest(data.map((x: { field: string; value: any; }) => this.ngToCpp(x, type)))
  }
  modulateOne(type: string, data: any): Observable<any> {
    console.log("Table",type)
    const pos = type.indexOf("-");
    if (pos >= 0) {
      type = type.split("-").join("_");
     
    }
    console.log(data,type)
    return this.ngToCpp(data, type).pipe(map(cols => { return { "table": type, "columns": cols, "criteria": [{ "field": "id", "value": data["id"] }] } }))
  }
}
