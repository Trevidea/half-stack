import { environment } from "environments/environment";
import { AdapterService } from "./adapter.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { first, map, mergeMap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Data } from "./capture-interface";
import { EventData } from "./event";
import { LiveEventDetailData } from "./live-event-detail";
import { MetaTypeData } from "./meta-type";

@Injectable({
  providedIn: "root",
})
export class ModelServiceService {
  private modelsServerUrl: string = environment.spModelUrl;

  constructor(
    private _httpClient: HttpClient,
    private _adapter: AdapterService
  ) {
    this.saveEvent = this.saveEvent.bind(this);
    // this.saveOnDemandEvent = this.saveOnDemandEvent.bind(this)
  }

  create(type: string, entity: any): Observable<any> {
    const url = `${this.modelsServerUrl}/${type}`;
    console.log(url);
    return this._adapter.modulateOne(type, entity).pipe(
      mergeMap((modata) => {
        console.log("modulateOne", modata);
        return this._httpClient.post<any>(url, modata);
      })
    );
  }
  read(type: string): Observable<any> {
    const url = `${this.modelsServerUrl}/${type}`;
    console.log(url)
    return this._httpClient.get<any>(url);
  }

  readWithQuery(query: string): Observable<any> {
    const url = `${this.modelsServerUrl}/${query}`
    console.log("readWithQuery", url)
    return this._httpClient.get<any>(url)
  }

  readOne(type: string, id: number): Observable<any> {
    const url = `${this.modelsServerUrl}/${type}?id=${id}`;
    console.log(url);
    return this._httpClient.get<any>(url);
  }

  update(type: string, entity: any, id: number) {
    const url = `${this.modelsServerUrl}/${type}`;
    // entity.values = JSON.parse(entity.values)
    return this._adapter.modulateOne(type, entity).pipe(
      mergeMap((modata) => {
        console.log(url, "::", modata);
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
        console.log("sending DELETE on ", url, "with data:\n", modata);
        const httpOptions = {
          headers: new HttpHeaders({ "Content-Type": "application/json" }),
          body: modata,
        };
        return this._httpClient.delete<any>(url, httpOptions);
      })
    );
  }

  deleteView(type: string, id: number): Observable<any> {
    // const url = `${this.strapiUrl}/${type}/del/${id}`
    const url = `${this.modelsServerUrl}/${type}/view/${id}`;
    console.log(url);
    return this._httpClient.delete<any>(url);
  }

  deleteEvent(type: string, id: number): Observable<any> {
    // const url = `${this.strapiUrl}/${type}/del/${id}`
    const url = `${this.modelsServerUrl}/${type}/view/${id}`;
    console.log(url);
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



  private _get<I extends Data.Base>(
    resource: string,
    id: number
  ): Observable<I> {
    return this._adapter.demodulate(resource, this.readOne(resource, id)).pipe(
      map((models) =>
        models.map((model: any) => {
          return model as I;
        })
      )
    );
  }

  private _data<M, I extends Data.Base>(
    resource: string,
    type: new (I: Data.Base) => M
  ): Observable<M[]> {
    return this._getList<I>(resource).pipe(
      map((data: I[]) => {
        console.log(":::::", data);
        return data.map((datum: I) => new type(datum));
      })
    );
  }



  private _datum<M, I extends Data.Base>(
    resource: string,
    id: number,
    type: new (I: Data.Base) => M
  ): Observable<M> {
    return this._get<I>(resource, id)
      .pipe(first())
      .pipe(map((datum: I) => new type(datum)));
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
  private _selectOne<M, I extends Data.Base>(
    resource: string,
    id: number,
    type: new (I: Data.Base) => M
  ): Observable<M> {
    return this._selectData(resource, id, type).pipe(
      map((data: M[]) => data[0])
    );
  }


  saveEvent(data: Data.Event): Observable<Data.Event> {
    console.log(data);

    if (data.id) {
      return this.update("event", data, data.id);
    } else {
      return this.create("event", data);
    }
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

  eventList(): Observable<Data.Event[]> {
    return this._data("event", EventData);
  }

  eventJson(id: number): Observable<Data.Event> {
    return this._selectOne("event", id, EventData);
  }

  eventsBasedOnStatus(status: string): Observable<Data.Event[]> {
    return this._data(`event?status='${status}'`, EventData);
  }

  eventDetails(status: string, type: string): Observable<Data.Event[]> {
    return this._data(`event?status='${status}'&type='${type}'`, EventData);
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
    console.log(data);
    return this._httpClient.post<any>(url, data);
  }

  closePreview(data: { eventId: number }): Observable<any> {
    const url = `${environment.spModelUrl}/event/close-preview`;
    console.log(data);
    return this._httpClient.post<any>(url, data);
  }

  liveEventJson(): Observable<Data.LiveEventDetail[]> {
    return this._data("liveEvent", LiveEventDetailData);
  }

  MetaTypeByKey(key: string): Observable<Data.MetaType> {
    const url = `${environment.spModelUrl}/meta-type/key/${key}`;
    return this._httpClient.get<MetaTypeData>(url);
  }

  MetaTypeJson(): Observable<Data.MetaType[]> {
    return this._data('meta-types', MetaTypeData);
  }

}
