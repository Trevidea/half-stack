import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '@core/services/event -start.service';

@Component({
  selector: 'app-connection-header',
  templateUrl: './connection-header.component.html',
  styleUrls: ['./connection-header.component.scss']
})
export class ConnectionHeaderComponent implements OnInit {
  _gridView: boolean = false;
  _ListView: boolean = true;
  connectiondetail: boolean = false
  constructor(private router: Router, private event: EventService , private route: ActivatedRoute) { }

  ngOnInit(): void {
  }
  ConnectionDetails(yes: boolean) {
    this.connectiondetail = yes
  }
  closeDetail() {
    this.connectiondetail = false
  }

  gridView() {
    this._gridView = true;
    this._ListView = false;
    this.router.navigate(['connection/connection-card-view']);
  }
  listView() {

    this._gridView = false;
    this._ListView = true;
    this.router.navigate(["connection"]);

  }
}
