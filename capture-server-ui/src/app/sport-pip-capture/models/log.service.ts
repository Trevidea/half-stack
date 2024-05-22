import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LogService {
  private logUrl: string = environment.logUrl;
  constructor(private _httpClient: HttpClient) {}

  logPost(extention: string, data: any) {
    this._httpClient
      .post(this.logUrl + `${extention}`, data)
      .subscribe((res) => {
        console.log(res);
      });
  }
  logPut(extention: string, data: any) {
    this._httpClient
      .put(this.logUrl + `${extention}`, data)
      .subscribe((res) => {
        console.log(res);
      });
  }
  getChangeLog(obj1: any, obj2: any): any {
    const changes: any[] = [];
    const timestamp = new Date().toISOString();
    for (let key in obj2) {
      if (obj2.hasOwnProperty(key) && obj1[key] !== obj2[key]) {
        changes.push({
          timestamp: timestamp,
          activity: `${key} changed from ${obj1[key]} to ${obj2[key]}`,
        });
      }
    }
    return changes;
  }
  public flattenObject(obj: any, res: any = {}): Observable<any> {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (
          typeof obj[key] === "object" &&
          !Array.isArray(obj[key]) &&
          obj[key] !== null
        ) {
          this.flattenObject(obj[key], res);
        } else {
          res[key] = obj[key];
        }
      }
    }
    return res;
  }
}
