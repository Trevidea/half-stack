import { environment } from "environments/environment";
import { AdapterService } from "./adapter.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { first, map, mergeMap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Data } from "./capture-interface";
import { EventData } from "./event";
import { LiveEventDetailData } from "./live-event-detail";


@Injectable({
  providedIn: 'root'
})
export class ModelServiceService {
  private modelsServerUrl: string = environment.pgUrl;

  constructor(private _httpClient: HttpClient, private _adapter: AdapterService) {
    this.saveEvent = this.saveEvent.bind(this);
    // this.saveOnDemandEvent = this.saveOnDemandEvent.bind(this)
  }



  create(type: string, entity: any): Observable<any> {

    const url = `${this.modelsServerUrl}/${type}`
    console.log(url)
    return this._adapter.modulateOne(type, entity).pipe(mergeMap(modata => {
      console.log("modulateOne", modata)
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
      .pipe(map((data: I[]) => { console.log(":::::", data); return data.map((datum: I) => new type(datum)) }));
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
  // private _selectOne<M, I extends Data.Base>(resource: string, id: number, type: new (I: Data.Base) => M): Observable<M> {
  //   return this._selectData(resource, id, type).pipe(map((data: M[]) => data.at(0)));
  // }
  // MetaTypeJsonByKey(key: string)
  //   : Observable<Data.MetaType> {
  //   const url = `${this.pgUrl}/meta-type?key='${key}'`
  //   return this._httpClient.get<MetaTypeModel>(url);
  // }
  // MetaTypeJsonById(id: number)
  //   : Observable<Data.MetaType> {
  //   const url = `${this.pgUrl}/meta-type?id=${id}`
  //   return this._httpClient.get<MetaTypeModel>(url);
  // }


  saveEvent(data: Data.Event): Observable<Data.Event> {
    console.log(data)

    if (data.id) {
      return this.update("event", data, data.id);
    } else {
      return this.create("event", data);
    }
  }

  // http://drake.in:1437/api/on-demand-event

  // saveOnDemandEvent(data: Data.OnDemandEvent): Observable<Data.OnDemandEvent> {
  //   console.log('saveOnDemandEvent', data)
  //   if (data.id) {
  //     return this.update("on-demand-event", data, data.id);
  //   } else {
  //     return this.create("on-demand-event", data);
  //   }
  // }

  private apiUrl = 'http://drake.in:1437/api/on-demand-event';
  _saveOnDemandEvent(data: any): Observable<any> {
    return this._httpClient.post<any>(this.apiUrl, data);
  }
  eventJson(): Observable<Data.Event[]> {
    return this._data('event', EventData)
  }


  syncEvents(): Observable<any> {
    const url = `${this.modelsServerUrl}/event/sync`
    const data = {
      'source': "http://localhost:1337/api/events",
      'delete-criteria': "dt_event >= now()"
    }
    return this._httpClient.post<any>(url, data)
  }


  liveEventJson(): Observable<Data.LiveEventDetail[]> {
    return this._data('liveEvent', LiveEventDetailData)
  }
}
