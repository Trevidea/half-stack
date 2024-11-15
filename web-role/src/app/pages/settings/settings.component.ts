import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TablerIconsModule } from 'angular-tabler-icons';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MaterialModule } from 'src/app/material.module';
import { SideNavItem } from './setting-nav-item';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    NgScrollbarModule,
    TablerIconsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterOutlet,
    RouterModule
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})

export class SettingsComponent {
  activeNavId: number = 1;
  sidePanelOpened = true;
  sideNavItem: SideNavItem[] = [
    { id: 1, displayName: 'Account', iconName: 'user', route: 'account' },
    { id: 2, displayName: 'Device', iconName: 'devices', route: 'user' },
    { id: 3, displayName: 'Files', iconName: 'file', route: 'files' },
    { id: 4, displayName: 'Sharing', iconName: 'share', route: 'sharing' },
    { id: 5, displayName: 'Preferences', iconName: 'adjustments-alt', route: 'preferences' },
    { id: 6, displayName: 'Media Server', iconName: 'video', route: 'media-server' },
    { id: 7, displayName: 'About', iconName: 'info-circle', route: 'about' }
  ]



  isOver(): boolean {
    return window.matchMedia(`(max-width: 960px)`).matches;
  }

  setActiveNav(itemId: number) {
    this.activeNavId = itemId;
  }
}
