import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TablerIconsModule } from 'angular-tabler-icons';
import { UI } from '../ui-interface';

@Component({
  selector: 'app-action-menu',
  standalone: true,
  imports: [MatButtonModule,
    TablerIconsModule,
    MatMenuModule,
    MatIconModule],
  templateUrl: './action-menu.component.html',
  styleUrl: './action-menu.component.scss'
})
export class ActionMenuComponent {
  @Input() dropdownItems: UI.DropDownMenuItem[] = [];
}
