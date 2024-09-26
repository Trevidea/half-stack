import { environment } from "environments/environment";
import { AdapterService } from "./adapter.service";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { BehaviorSubject, Observable, Observer, of } from "rxjs";
import { first, map, mergeMap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Data } from "./capture-interface";
import { EventData } from "./event";
import { MetaTypeData } from "./meta-type";
import { UserProfileData } from "./user-profile";
import { DeviceData } from "./device";
import { PreviousEventsConnectionData } from "./previous-events-connection";
import { LogService } from "./log.service";
import { PastConnectionDetailsData } from "./pastconnectionDetail";
import { DistributionData } from "./distribution";
import { LoggedInUserData } from "./user-logged-in";
import { PastEventData } from "./past-event";
@Injectable({
  providedIn: "root",
})
export class ModelServiceService {
  public modelsServerUrl: string = environment.spModelUrl;
  private logUrl: string = environment.logUrl;
  model: any;

  constructor(
    private _httpClient: HttpClient,
    private _adapter: AdapterService,
    private logService: LogService
  ) {
    this.saveEvent = this.saveEvent.bind(this);
    this.saveDevice = this.saveDevice.bind(this);
    this.saveEventDevice = this.saveEventDevice.bind(this);
    this.eventUploadAuthentication = this.eventUploadAuthentication.bind(this);
    this.saveDistributionList = this.saveDistributionList.bind(this);
    this.uploadPastEvent = this.uploadPastEvent.bind(this);
  }

  create(type: string, entity: any): Observable<any> {
    const url = `${this.modelsServerUrl}/${type}`;
    return this._adapter.modulateOne(type, entity).pipe(
      mergeMap((modata) => {
        console.log(modata)
        return this._httpClient.post<any>(url, modata);
      })
    );
  }

  postData(type: string, entity: any): Observable<any> {
    const url = `${this.modelsServerUrl}/${type}`;
    return this._httpClient.post<any>(url, entity);
  }

  read(type: string): Observable<any> {
    const url = `${this.modelsServerUrl}/${type}`;
    return this._httpClient.get<any>(url);
  }

  readOne(type: string, id: number): Observable<any> {
    const url = `${this.modelsServerUrl}/${type}?id=${id}`;
    return this._httpClient.get<any>(url);
  }

  readOneWithQuery(type: string, qurey: any): Observable<any> {
    const url = `${this.modelsServerUrl}/${type}?${qurey}`;
    return this._httpClient.get<any>(url);
  }

  getEntitiesByDynamicQuery(
    type: string,
    key: string,
    keyType: string
  ): Observable<any> {

    const url = `${this.modelsServerUrl}/${type}?${keyType}=${key}`;
    console.log("hello", url)
    return this._httpClient.get<any>(url);
  }

  update(type: string, entity: any, id: number) {
    const url = `${this.modelsServerUrl}/${type}`;
    return this._adapter.modulateOne(type, entity).pipe(
      mergeMap((modata) => {
        return this._httpClient.put<any>(url, modata);
      })
    );
  }

  delete(type: string, id: number): Observable<any> {
    let _type = type;
    const pos = type.indexOf("_");
    if (pos >= 0) {
      _type = type.split("_").join("-");
    }
    let url = `${this.modelsServerUrl}/${_type}`;
    return this._adapter.modulateOne(type, { id: id }).pipe(
      mergeMap((modata) => {
        const httpOptions = {
          headers: new HttpHeaders({ "Content-Type": "application/json" }),
          body: modata,
        };
        return this._httpClient.delete<any>(url, httpOptions);
      })
    );
  }

  deleteView(type: string, id: number): Observable<any> {
    const url = `${this.modelsServerUrl}/${type}/view/${id}`;
    return this._httpClient.delete<any>(url);
  }

  deleteEvent(type: string, id: number): Observable<any> {
    // const url = `${this.strapiUrl}/${type}/del/${id}`
    const url = `${this.modelsServerUrl}/${type}/view/${id}`;
    return this._httpClient.delete<any>(url);
  }

  schema(type: string) {
    const url = `${this.modelsServerUrl}/${type}/schema`;
    return this._httpClient.get<any>(url);
  }

  views(type: string): Observable<any> {
    const url = `${this.modelsServerUrl}/${type}/views`;
    return this._httpClient.get<any>(url);
  }
  private _getSelectedList<I extends Data.Base>(
    resource: string,
    id: number
  ): Observable<I[]> {
    return this._adapter.demodulate(resource, this.readOne(resource, id)).pipe(
      map((models) =>
        models.map((model: any) => {
          console.log(model)
          return model as I;
        })
      )
    );
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

  private _getList<I extends Data.Base>(resource: string): Observable<I[]> {
    return this._adapter.demodulate(resource, this.read(resource)).pipe(
      map((models) =>
        models.map((model: any) => {
          return model as I;
        })
      )
    );
  }


  private _data<M, I extends Data.Base>(resource: string, type: new (I: Data.Base) => M): Observable<M[]> {
    return this._getList<I>(resource).pipe(
      map((data: I[]) => {
        return data.map((datum: I) => new type(datum));
      })
    );
  }


  private _selectData<M, I extends Data.Base>(
    resource: string,
    id: number,
    type: new (I: Data.Base) => M
  ): Observable<M[]> {
    return this._getSelectedList<I>(resource, id).pipe(
      map((data: I[]) => data.map((datum: I) => new type(datum)))
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

  private _selectOne<M, I extends Data.Base>(
    resource: string,
    id: number,
    type: new (I: Data.Base) => M
  ): Observable<M> {
    return this._selectData(resource, id, type).pipe(
      map((data: M[]) => data[0])
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

  /**++++++++++++++++++++++++++++++++++++++++++++++++++ <> POST PUT ACTIONS <> ++++++++++++++++++++++++++++++++++++++++++++++++++*/


  saveDistributionList(data: Data.Distribution): Observable<Data.Distribution> {
    console.log(data)
    if (data.id) {
      return this.update("distributions", data, data.id);
    } else {
      return this.create("distributions", data);
    }
  }

  eventUploadAuthentication(data: Data.EventUploadAuth): Observable<Data.EventUploadAuth> {
    console.log(data)
    return this.create('event-upload-auth', data);

  }
  saveEvent(data: Data.Event): Observable<Data.Event> {
    if (data.id) {
      return this.update("event", data, data.id)
    } else {
      return this.create("event", data)
    }
  }
  uploadPastEvent(event_id: number): Observable<any> {
    let data = { "event-id": event_id }
    console.log(data);
    return this.postData("event/assets", data);
  }

  saveMetaType(data: Data.MetaType): Observable<Data.MetaType> {
    if (data.id) {
      return this.update(`meta-type?key=${data.id}`, data, data.id);
    } else {
      return this.create("event", data);
    }
  }
  private apiUrl = `${environment.spModelUrl}/on-demand-event`;
  _saveOnDemandEvent(data: any): Observable<any> {
    return this._httpClient.post<any>(this.apiUrl, data);
  }

  saveEventDevice(data: Data.EventDevice): Observable<Data.EventDevice> {
    console.log(data)
    return this.create("event-device", data);
  }
  saveDevice(data: Data.Device): Observable<Data.Device> {
    return this.create("devices", data);
  }

  syncEvents(): Observable<any> {
    const url = `${this.modelsServerUrl}/event/sync`;
    const data = {
      source: "https://strapi.sp-fullstack.site",
      "delete-criteria": "type='scheduled'",
    };
    return this._httpClient.post<any>(url, data);
  }

  openPreview(data: { eventId: number }): Observable<any> {
    const url = `${environment.spModelUrl}/event/open-preview`;
    return this._httpClient.post<any>(url, data);
  }


  closePreview(data: { eventId: number }): Observable<any> {
    const url = `${environment.spModelUrl}/event/close-preview`;
    return this._httpClient.post<any>(url, data);
  }

  startRecording(data: any): Observable<any> {
    const url = `${environment.spModelUrl}/api/omal/start-dump`;
    return this._httpClient.post(url, data);
  }

  storStream(data: any): Observable<any> {
    const url = `${environment.spModelUrl}/api/omal/stop-dump`;
    return this._httpClient.post(url, data);
  }

  createApp(data: { "app-name": string }): Observable<any> {
    const url = `${environment.spModelUrl}/omal/create-app`;
    return this._httpClient.post(url, data);
  }

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

  /**++++++++++++++++++++++++++++++++++++++++++++++++++ </> POST PUT ACTIONS Above </> ++++++++++++++++++++++++++++++++++++++++++++++++++*/

  eventList(): Observable<Data.Event[]> {
    return this._data("events", EventData);
  }

  distributionsListJson(): Observable<Data.Distribution[]> {
    return this._data("distributions", DistributionData);
  }
  fetechApplicationDetail(): Observable<any> {
    const url = `${environment.spModelUrl}/omal/app`;
    return this._httpClient.get(url);
  }

  hostConnectionDeviceDetailJson(
    id: number
  ): Observable<Data.HostConnectionDeviceDetail> {
    const staticData: Data.HostConnectionDeviceDetail = {
      id: 1,
      eventId: 123,
      transmitStatus: "success",
      deviceType: "desktop",
      userName: "john_doe",
      deviceId: "abc123",
      ipAddress: "192.168.1.100",
      retries: 2,
      internetConnection: 1,
      chunkDuration: "30s",
      partHoldBack: "5s",
      segmentDuration: 120,
      segmentCount: 5,
      hostConnectionQuality: [
        {
          id: 1,
          deviceId: 123,
          startForm: "12:30:00",
          end: "3:45 pm",
          videoQuality: 1,
          duration: 180,
        },
        {
          id: 2,
          deviceId: 123,
          startForm: "2:00:00",
          end: "5:30 pm",
          videoQuality: 0,
          duration: "2h",
        },
      ],
    };
    return of(staticData);
  }

  deviceList(): Observable<Data.Device[]> {
    return this._data("devices", DeviceData);
  }

  eventsBasedOnStatus(status: string): Observable<Data.Event[]> {
    return this._data(`event?status='${status}'`, EventData);
  }

  eventDetails(status: string, type: string): Observable<Data.Event[]> {
    return this._data(`event?status='${status}'&type='${type}'`, EventData);
  }


  closeAllPreview(): Observable<any> {
    const url = `${environment.spModelUrl}/event/close-preview`;
    return this._httpClient.get<any>(url);
  }

  getVirtualHost(): Observable<any> {
    const url = `${environment.spModelUrl}/omal/virtual-hosts`;
    return this._httpClient.get<any>(url);
  }

  getApplications(): Observable<any> {
    const url = `${environment.spModelUrl}/omal/apps?vhost=spip`;
    return this._httpClient
      .get<any>(url)
      .pipe(map((response) => response["Gateway Response"]["applications"]));
  }

  LoggedInUserDetails(userName: string): Observable<Data.LoggedInUser[]> {
    return this._data(`user/account?username=${userName}`, LoggedInUserData)
  }

  usersJson(): Observable<Data.UserProfile[]> {
    return this._data("user-profiles", UserProfileData);
  }

  eventConnectionJsonById(id: number): Observable<Data.PastConnectionDetails[]> {
    return this._data(`event-devices?event_id=${id}`, PastConnectionDetailsData);
  }

  PreviousConnection(): Observable<Data.PreviousEventsConnection[]> {
    return this._data("connections", PreviousEventsConnectionData);
  }

  MetaTypeJson(): Observable<Data.MetaType[]> {
    return this._data("meta-types", MetaTypeData);
  }

  getSpecificPastEvent(id: number): Observable<Data.PastEvent> {
    return this._selectOne('past-event/detail', id, PastEventData)
  }

  deviceById(id: number): Observable<Data.Device> {
    return this._selectOne("devices", id, DeviceData);
  }

  eventJson(id: number): Observable<Data.Event> {
    return this._selectOne("event", id, EventData);
  }

  MetaTypeByKey(key: string): Observable<Data.MetaType> {
    return this._selectQueryOne("meta-type", `'${key}'`, "key", MetaTypeData);
  }

  deleteApp(data: { "app-name": string }): Observable<any> {
    const url = `${environment.spModelUrl}/omal/app`;
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
      body: data,
    };
    return this._httpClient.delete<any>(url, httpOptions);
  }


  type() {
    return ["Streaming", "Player"];
  }
}
