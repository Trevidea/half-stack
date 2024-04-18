import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';

@Component({
  selector: 'app-schedual-event-detail',
  templateUrl: './schedual-event-detail.component.html',
  styleUrls: ['./schedual-event-detail.component.scss']
})
export class SchedualEventDetailComponent implements OnInit {
  @Input() datasource;
  @Input() currentIndex: number;
  @Input() detailType: string
  constructor(private _coreSidebarService: CoreSidebarService,private router: Router) { }

 
  // toggleSidebar(key): void {
  //   this._coreSidebarService.getSidebarRegistry(key).close()
  // }

  ngOnInit(): void {
    console.log(this.datasource, this.currentIndex);
  }

  closeSidebar(key): void {
    this._coreSidebarService.getSidebarRegistry(key).close()
  }

  nextEvent() {
    if (this.currentIndex < this.datasource.length - 1) {
      this.currentIndex++;
    }
  }

  previousEvent() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  get currentEvent() {
    return this.datasource[this.currentIndex];
  }


  editOnDemandEvent() {
    this.router.navigate(['/on-demand-event'], {
      queryParams: { id: this.currentEvent?.id },
    })
  }
}
