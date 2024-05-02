import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorModalService {

  private showModalSource = new Subject<string>();
  showModal$ = this.showModalSource.asObservable();

  constructor() { }

  showModal(message: string) {
    this.showModalSource.next(message);
  }
}
