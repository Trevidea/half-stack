import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';

@Component({
  selector: 'app-setting-body',
  templateUrl: './setting-body.component.html',
  styleUrls: ['./setting-body.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SettingBodyComponent implements OnInit {
settingType:string
  constructor(private _coreSidebarService: CoreSidebarService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.settingType = this.route.snapshot.params['body-type'];
    
  }
  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }
}
