import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { AdapterService } from "./adapter.service";
import { first, map, mergeMap, Observable } from "rxjs";
import { Data } from "../models-interfaces/half-stack-interface";
import { MetaTypeData } from "../models-interfaces/metatype";
import { EventData } from "../models-interfaces/event";
import { PastEventData } from "../models-interfaces/past-event";
<<<<<<< HEAD
import { PreviousEventsConnectionData } from "../models-interfaces/previous-events-connection";
import { UserProfileData } from "../models-interfaces/user-profile";
import { DeviceData } from "../models-interfaces/device";
=======
import { UserProfileData } from "../models-interfaces/user-profile";
import { DeviceData } from "../models-interfaces/device";
>>>>>>> 1c52543a70fce3cd865d125fdc08ef95b36140ab


@Injectable({
  providedIn: 'root'
})
export class ModelService {

  private modelsServerUrl: string = environment.cpServerBaseUrl;

  constructor(private _httpClient: HttpClient, private _adapter: AdapterService) {
    // this.MetaType = this.MetaType.bind(this)
    this.saveEvent = this.saveEvent.bind(this);
    this.addDeviceToEvent = this.addDeviceToEvent.bind(this);
    this.saveDevice = this.saveDevice.bind(this);
  }

  create(type: string, entity: any): Observable<any> {
    const url = `${this.modelsServerUrl}/${type}`
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

  updateMetaType(type: string, entity: any, id: number) {
    const url = `${this.modelsServerUrl}/meta-type?id='${id}'`;
    const value = JSON.stringify(entity.values);
    const data = {
      table: "meta_type",
      columns: [{ field: "values", type: 1, value: `${value}` }],
      criteria: [{ field: "id", value: `${id}` }],
    };
    return this._httpClient.put<any>(url, data);
  }
  SaveMetaType(data: Data.MetaTypeEgress): Observable<Data.MetaTypeEgress> {
    if (data.id) {
      return this.updateMetaType("meta-type/value", data, data.id);
    } else {
      throw new Error("Method not implemented.");
    }
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
  private getEntitiesByDynamicQuery(type: string, key: string, keyType: string): Observable<any> {
    const url = `${this.modelsServerUrl}/${type}?${keyType}=${key}`;
    return this._httpClient.get<any>(url);
  }
  private _getSelectedQueryType<I extends Data.Base>(
    resource: string,
    key: string,
    keyType: string
  ): Observable<I[]> {
    return this._adapter.demodulate(resource,
      this.getEntitiesByDynamicQuery(resource, key, keyType)
    ).pipe(
      map((models) =>
        models.map((model: any) => {
          return model as I;
        })
      )
    );
  }

  private _selectQueryData<M, I extends Data.Base>(
    resource: string,
    key: string,
    keyType: string,
    type: new (I: Data.Base) => M
  ): Observable<M[]> {
    return this._getSelectedQueryType<I>(resource, key, keyType).pipe(
      map((data: I[]) => data.map((datum: I) => new type(datum)))
    );
  }

  private _selectQueryOne<M, I extends Data.Base>(
    resource: string,
    key: string,
    keyType: string,
    type: new (I: Data.Base) => M
  ): Observable<M> {
    return this._selectQueryData(resource, key, keyType, type).pipe(
      map((data: M[]) => data[0])
    );
  }
  //============================================================All reuseable realated  funtions declared  avobe=========================================//

  //============================================================ All Data Post realated  funtions Below =========================================//

  saveEvent(data: Data.Event): Observable<Data.Event> {
    console.log(data);

    if (data.id) {
      return this.update("event", data, data.id)
    } else {
      return this.create("event", data)
    }
  }
  saveDevice(data: Data.Device): Observable<Data.Device> {
    return this.create("devices", data);
  }
  openPreview(data: { eventId: number }): Observable<any> {
    const url = `${this.modelsServerUrl}/event/open-preview`;
    return this._httpClient.post<any>(url, data);
  }

  getApplications(): Observable<any> {
    const url = `${this.modelsServerUrl}/omal/apps?vhost=spip`;
    return this._httpClient
      .get<any>(url)
      .pipe(map((response) => response["Gateway Response"]["applications"]));
  }
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ All Data retrival realated  funtions Below ++++++++++++++++++++++++++++++++++++++++//
  eventList(): Observable<Data.Event[]> {
    return this._data("events", EventData);
  }
  eventJson(id: number): Observable<Data.Event> {
    return this._selectOne("event", id, EventData);
  }

  getSpecificPastEvent(id: number): Observable<Data.PastEvent> {
    return this._selectOne('past-event/detail', id, PastEventData)
  }

  MetaTypeByKey(key: string): Observable<Data.MetaType> {
    return this._selectQueryOne("meta-type", `'${key}'`, "key", MetaTypeData);
  }

  usersJson(): Observable<Data.UserProfile[]> {
    return this._data("user-profiles", UserProfileData);
  }

  deviceList(): Observable<Data.Device[]> {
    return this._data("devices", DeviceData);
  }

  deviceById(id: number): Observable<Data.Device> {
    return this._selectOne("devices", id, DeviceData);
  }

  addDeviceToEvent(data: Data.AddDeviceToEvent): Observable<Data.AddDeviceToEvent> {
    console.log(data)
    return this.create("event-device", data);
  }

  EventYear() {
    return ["2024", "2023", "2022", "2021", "2020"];
  }
  type() {
    return ["Streaming", "Player"];
  }

}
