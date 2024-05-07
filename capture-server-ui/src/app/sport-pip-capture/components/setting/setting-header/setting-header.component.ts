import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-setting-header',
  templateUrl: './setting-header.component.html',
  styleUrls: ['./setting-header.component.scss']
})
export class SettingHeaderComponent implements OnInit {
  selectedTab = '';
  headerTranslation: number = 0;
  constructor(private router: Router, private renderer: Renderer2, private route: ActivatedRoute) { }

  ngOnInit(): void {

    const param = this.route.snapshot.params['settings'];

    if (param == 'settings') {
      this.router.navigate(['settings'])
    }

  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }

}
