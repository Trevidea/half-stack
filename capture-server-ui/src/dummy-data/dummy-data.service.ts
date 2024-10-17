import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api'
import { CoachesDummy } from './coaches.dummy';
import { PlayersDummy } from './players.dummy';
import { TeamsDummy } from './teams.dummy';
import { eventsDummy } from './events.dummy';
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
