import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'agGrid';
  sidebarStatus: boolean = true
  _mode = 'side'
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    // console.log(window.innerWidth)
    this.sidebarStatus = window.innerWidth > 1024;
    if(!this.sidebarStatus){
      this._mode='over'
    }else{
      this._mode='side'
    }
    // console.log(window.innerWidth, this.sidebarStatus)
  }

  ngOnInit() {

    this.sidebarStatus = window.innerWidth > 1024;
  }
  sidebarToggle() {
    this.sidebarStatus = !this.sidebarStatus
  }

}
