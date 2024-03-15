import { AfterViewInit, ElementRef, EventEmitter, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { CoreMenu, menu } from './side-content';
import { KeycloakService } from 'keycloak-angular';
import * as feather from 'feather-icons';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, AfterViewInit {
  menu: CoreMenu[]
  constructor(private elementRef: ElementRef, protected readonly keycloak: KeycloakService) {
    this.menu = menu
  }
  ngAfterViewInit(): void {
    feather.replace();
    this.replaceIcons();
  }
  replaceIcons() {
    const elements = this.elementRef.nativeElement.querySelectorAll('.feather-icon');
    elements.forEach((element: HTMLElement) => {
      const iconName = element.getAttribute('data-feather');
      if (iconName) {
        element.innerHTML = feather.icons[iconName].toSvg();
      }
    });
  }
  ngOnInit(): void {
  }
  logout(){
    this.keycloak.logout(environment.redirectUrl);
  }

} 
