import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api'
@Injectable({
  providedIn: 'root'
})
export class DummyDataService implements InMemoryDbService {
  constructor() { }
  createDb(reqInfo?: RequestInfo) {
    return {
      // 'coaches': CoachesDummy.data,
      // 'players': PlayersDummy.data,
      // 'teams': TeamsDummy.data,
      // 'events': eventsDummy.data
    }
  }
}
