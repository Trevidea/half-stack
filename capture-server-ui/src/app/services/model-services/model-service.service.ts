import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { AdapterService } from "./adapter.service";
import { first, map, mergeMap, Observable } from "rxjs";
import { Data } from "../models-interfaces/full-stack-interface";
import { MetaTypeModel } from "../models-interfaces/metatype";
import { CoachData } from "../models-interfaces/coach";



@Injectable({
  providedIn: 'root'
})
export class ModelService {

  private modelsServerUrl: string = environment.cpServerBaseUrl;

  constructor(private _httpClient: HttpClient, private _adapter: AdapterService) {
    this.saveCoach = this.saveCoach.bind(this);
    // this.MetaType = this.MetaType.bind(this)
  }

  create(type: string, entity: any): Observable<any> {
    console.log(type)
    const url = `${this.modelsServerUrl}/${type}`
    console.log(entity)
    return this._adapter.modulateOne(type, entity).pipe(mergeMap(modata => {
      console.log(modata)
      return this._httpClient.post<any>(url, modata);
    }));
  }
  read(type: string): Observable<any> {
    const url = `${this.modelsServerUrl}/${type}`
    return this._httpClient.get<any>(url);
  }
  readOne(type: string, id: number): Observable<any> {
    const url = `${this.modelsServerUrl}/${type}?id=${id}`
    return this._httpClient.get<any>(url);
  }
  update(type: string, entity: any, id: number) {
    const url = `${this.modelsServerUrl}/${type}`
    // entity.values = JSON.parse(entity.values)
    return this._adapter.modulateOne(type, entity).pipe(mergeMap(modata => {
      console.log(url, "::", modata)
      return this._httpClient.put<any>(url, modata);
    }));

  }
  delete(type: string, id: number): Observable<any> {
    let _type = type;
    const pos = type.indexOf("_");
    if (pos >= 0) {
      _type = type.split("_").join("-");
    }
    let url = `${this.modelsServerUrl}/${_type}`
    return this._adapter.modulateOne(type, { "id": id }).pipe(mergeMap(modata => {
      console.log("sending DELETE on ", url, "with data:\n", modata)
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: modata
      };
      return this._httpClient.delete<any>(url, httpOptions);
    }));
  }



  deleteView(type: string, id: number): Observable<any> {
    // const url = `${this.strapiUrl}/${type}/del/${id}`
    const url = `${this.modelsServerUrl}/${type}/view/${id}`
    console.log(url)
    return this._httpClient.delete<any>(url);
  }

  schema(type: string) {
    const url = `${this.modelsServerUrl}/${type}/schema`
    return this._httpClient.get<any>(url);
  }

  views(type: string): Observable<any> {
    const url = `${this.modelsServerUrl}/${type}/views`
    return this._httpClient.get<any>(url);
  }

  private _getSelectedList<I extends Data.Base>(resource: string, id: number): Observable<I[]> {
    return this._adapter.demodulate(resource, this.readOne(resource, id))
      .pipe(map(models => models.map((model: any) => {
        return model as I
      })));
  }
  private _getList<I extends Data.Base>(resource: string): Observable<I[]> {

    return this._adapter.demodulate(resource, this.read(resource))
      .pipe(map(models => models.map((model: any) => {
        return model as I
      })));
  }


  private _get<I extends Data.Base>(resource: string, id: number): Observable<I> {

    return this._adapter.demodulate(resource, this.readOne(resource, id))
      .pipe(map(models => models.map((model: any) => {
        return model as I
      })));
  }

  private _data<M, I extends Data.Base>(resource: string, type: new (I: Data.Base) => M): Observable<M[]> {
    return this._getList<I>(resource)
      .pipe(map((data: I[]) => data.map((datum: I) => new type(datum))));
  }

  private _datum<M, I extends Data.Base>(resource: string, id: number, type: new (I: Data.Base) => M): Observable<M> {

    return this._get<I>(resource, id)
      .pipe(first())
      .pipe(map((datum: I) => new type(datum)))
      ;
  }

  private _selectData<M, I extends Data.Base>(resource: string, id: number, type: new (I: Data.Base) => M): Observable<M[]> {
    return this._getSelectedList<I>(resource, id)
      .pipe(map((data: I[]) => data.map((datum: I) => new type(datum))))
  }

  private _selectOne<M, I extends Data.Base>(resource: string, id: number, type: new (I: Data.Base) => M): Observable<M> {
    return this._selectData(resource, id, type).pipe(map((data: M[]) => data[0]));
  }

  //============================================================All reuseable realated  funtions declared  avobe=========================================//

  saveCoach(data: Data.Coach): Observable<Data.Coach> {
    console.log(data)
    if (data.id) {
      return this.update("coach", data, data.id)
    } else {
      return this.create("coach", data)
    }
  }
  //============================================================ All Data Post realated  funtions Below =========================================//




  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ All Data retrival realated  funtions Below ++++++++++++++++++++++++++++++++++++++++//

  MetaTypeJsonByKey(key: string)
    : Observable<Data.MetaType> {
    const url = `${this.modelsServerUrl}/meta-type?key='${key}'`
    return this._httpClient.get<MetaTypeModel>(url);
  }

  coachList(): Observable<Data.Coach[]> {
    return this._data("coaches", CoachData);
  }

  coachJson(id: number): Observable<Data.Coach> {
    return this._selectOne("coach", id, CoachData);
  }

  EventYear() {
    return ["2024", "2023", "2022", "2021", "2020"];
  }


}
