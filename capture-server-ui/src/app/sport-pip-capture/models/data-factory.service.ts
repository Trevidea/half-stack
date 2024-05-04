import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable, of } from "rxjs";
import { map, mergeMap } from "rxjs/operators";
import { Data } from "./capture-interface";
import { ConnectionData } from "./connection";
// import { DeviceData } from "./device";
import { UserProfileData } from "./user-profile";
import { EventData } from "./event";
import { DistributionData } from "./distribution";
import { PreviousEventsConnectionData } from "./previous-events-connection";
import { MetaTypeData } from "./meta-type";
import { FileIndexData } from "./file-index";
import { ConnectionPreviewData } from "./connection-preview";
import { logData } from "../components/log/builder/log";
@Injectable({
  providedIn: "root",
})
export class DataFactoryService {
  private _spModelUrl: string = environment.spModelUrl;
  logData: any;
  constructor(private _httpClient: HttpClient) {
    this.SaveUserProfileJson = this.SaveUserProfileJson.bind(this);
    this.SaveDistributionList = this.SaveDistributionList.bind(this);
    this.SaveOnDemandFormJson = this.SaveOnDemandFormJson.bind(this);
    this.SaveMetaType = this.SaveMetaType.bind(this);
    this.logData = of(logData);
  }

  create(type: string, entity: any): Observable<any> {
    const url = `${this._spModelUrl}/${type}`;

    return this._httpClient.post<any>(url, entity);
  }

  read(type: string): Observable<any> {
    if (type == "api/event-preview") {
      const url = type;
      console.log(url);
      return this._httpClient.get<any>(url);
    } else {
      const url = `${this._spModelUrl}/${type}`;
      console.log(url);
      return this._httpClient.get<any>(url);
    }
  }

  readOne(type: string, id: number): Observable<any> {
    const url = `${this._spModelUrl}/${type}/${id}`;

    return this._httpClient.get<any>(url);
  }

  update(type: string, entity: any, id: number) {
    if (type == "meta-type/value") {
      const url = `${this._spModelUrl}/meta-type?id='${id}'`;
      const value = JSON.stringify(entity.values);
      const data = {
        table: "meta_type",
        columns: [{ field: "values", type: 1, value: `${value}` }],
        criteria: [{ field: "id", value: `${id}` }],
      };
      return this._httpClient.put<any>(url, data);
    } else {
      const url = `${this._spModelUrl}/${type}/${id}`;
      return this._httpClient.put<any>(url, entity);
    }
    // console.log(url)
  }

  delete(type: string, id: number) {
    const url = `${this._spModelUrl}/${type}/${id}`;
    // console.log(url)
    return this._httpClient.delete<any>(url);
  }
  private _getList<I extends Data.Base>(resource: string): Observable<I[]> {
    return this.read(resource)
      .pipe(map((blob: any) => blob))
      .pipe(
        map((models) => {
          return models.map((model: any) => {
            model.id = model.id;
            return model as I;
          });
        })
      );
  }
  MetaTypeByKey(key: string): Observable<Data.MetaType> {
    const url = `${this._spModelUrl}/meta-type?key='${key}'`;
    return this._httpClient.get<MetaTypeData>(url).pipe(
      map((response) => {
        const result = response["Gateway Response"].result[0];
        // Check if all required fields exist
        const idField = result.find((item) => item.field === "id");
        const nameField = result.find((item) => item.field === "name");
        const valuesField = result.find((item) => item.field === "values");
        const keyField = result.find((item) => item.field === "key");

        if (!nameField || !valuesField || !keyField || !idField) {
          throw new Error("Some required fields are missing in the response.");
        }
        const id = idField.value;
        const name = nameField.value;
        const valuesString = valuesField.value;
        const values = JSON.parse(valuesString);
        const key = keyField.value;
        return { id: id, name: name, values: values, key: key };
      })
    );
  }

  // MetaTypeJson(): Observable<Data.MetaType[]> {
  //   return this._data(`meta-types`, MetaTypeData);
  // }
  MetaTypeJson(): Observable<Data.MetaType[]> {
    const url = `${this._spModelUrl}/meta-types`;
    return this._httpClient.get<MetaTypeData[]>(url).pipe(
      map((response) => {
        const result = response["Gateway Response"].result;
        const metaTypes: Data.MetaType[] = [];

        result.forEach((item: any[]) => {
          const idField = item.find((field) => field.field === "id");
          const nameField = item.find((field) => field.field === "name");
          const valuesField = item.find((field) => field.field === "values");
          const keyField = item.find((field) => field.field === "key");

          if (!idField || !nameField || !valuesField || !keyField) {
            throw new Error(
              "Some required fields are missing in the response."
            );
          }

          const id = idField.value;
          const name = nameField.value;
          const valuesString = valuesField.value;
          const values = JSON.parse(valuesString);
          const key = keyField.value;
          metaTypes.push({ id, name, values, key });
        });

        return metaTypes;
      })
    );
  }

  private _get<I extends Data.Base>(
    resource: string,
    id: number
  ): Observable<I> {
    return this.readOne(resource, id).pipe(
      map((blob: any) => {
        if (blob) blob["id"] = blob["id"];
        return blob as I;
      })
    );
  }

  private _data<M, I extends Data.Base>(
    resource: string,
    type: new (I: Data.Base) => M
  ): Observable<M[]> {
    return this._getList<I>(resource).pipe(
      map((data: I[]) => {
        return data.map((datum: I) => {
          return new type(datum);
        });
      })
    );
  }

  private _datum<M, I extends Data.Base>(
    resource: string,
    id: number,
    type: new (I: Data.Base) => M
  ): Observable<M> {
    return this._get<I>(resource, id).pipe(
      map((datum: I) => {
        return new type(datum);
      })
    );
  }

  // //////Get all data
  // ConnectionsJson(): Observable<ConnectionData[]> {
  //   return this._data('connections', ConnectionData)
  // }

  // //////////Get data
  // ConnectionJson(id: number): Observable<Data.Connection> {
  //   return this._datum('connections', id, ConnectionData);
  // }
  // PreviousConnection(): Observable<Data.PreviousEventsConnection[]> {
  //   return this._data(
  //     "connection-with-past-details",
  //     PreviousEventsConnectionData
  //   );
  // }
  DistributionsListJson(): Observable<Data.Distribution[]> {
    return this._data("distributions", DistributionData);
  }
  // getEventPreview(): Observable<Data.ConnectionPreview[]> {
  //   return this._data("api/event-preview", ConnectionPreviewData);
  // }
  DistributionJson(id: number): Observable<Data.Distribution> {
    return this._datum("distribution", id, DistributionData);
  }
  // DevicesJson(): Observable<DeviceData[]> {
  //   return this._data('devices', DeviceData);
  // }

  // UsersProfileJson(): Observable<UserProfileData[]> {
  //   return this._data('users-profile', UserProfileData);
  // }

  UserProfileJson(id: number): Observable<Data.UserProfile> {
    return this._datum("user", id, UserProfileData);
  }

  FilesIndexJson(): Observable<Data.FileIndex[]> {
    return this._data("file-indexes", FileIndexData);
  }
  // EventJson(id: number): Observable<Data.Event> {

  //   return this._datum('event', id, EventData)
  // }
  // PastEventJson(): Observable<Data.Event[]> {

  //   return this._data(`events/past-events`, EventData)
  // }
  // UpCommingEventJson(): Observable<Data.Event[]> {

  //   return this._data(`events/upcoming-events`, EventData)
  // }
  // ongoingEventJson(): Observable<Data.Event[]> {

  //   return this._data(`events/ongoing-events`, EventData)
  // }

  EventStatus() {
    return ["Pending", "Active"];
  }
  EventLevel() {
    return ["Varsity", "Junior Varsity", "Senior", "Sophomore"];
  }
  EventProgram() {
    return ["Man", "Woman"];
  }
  EventYear() {
    return ["2024", "2023", "2022", "2021", "2020"];
  }
  EventSports() {
    return [
      "Archery",
      "Badminton",
      "Baseball",
      "Basketball",
      "Bowling",
      "Boxing",
      "Camping",
      "Canoeing",
      "Climbing",
      "Cricket",
      "Curling",
      "Cycling",
      "Fencing",
      "Fishing",
      "Fitness",
      "Football",
      "Figure Skating",
      "Gymnastics",
      "Hang Gliding",
      "High Jumping",
      "Hockey",
    ];
  }
  dayHalves() {
    return ["AM", "PM"];
  }
  SaveUserProfileJson(data: Data.UserProfile): Observable<Data.UserProfile> {
    if (data.id) {
      return this.update("user", data, data.id);
    }
  }

  SaveOnDemandFormJson(data: Data.Event): Observable<Data.Event> {
    // console.log(data)

    if (data.id) {
      return this.update("event", data, data.id);
    } else {
      return this.create("event", data);
    }
  }
  SaveDistributionList(data: Data.Distribution): Observable<Data.Distribution> {
    // console.log(data)
    if (data.id) {
      return this.update("distribution", data, data.id);
    } else {
      return this.create("distribution", data);
    }
  }
  DeleteDistributionJson(id: number) {
    return this.delete("distribution", id).subscribe((res: any) => {
      // console.log(res)
    });
  }
  SaveMetaType(data: Data.MetaTypeEgress): Observable<Data.MetaTypeEgress> {
    if (data.id) {
      return this.update("meta-type/value", data, data.id);
    } else {
      throw new Error("Method not implemented.");
    }
  }

  // eventPreviewJson(): Observable<Data.ConnectionPreview[]> {
  //   return this._data("event-preview", ConnectionPreviewData);
  // }
  Logs(): Observable<Data.Log[]> {
    return this.logData;
  }
}
