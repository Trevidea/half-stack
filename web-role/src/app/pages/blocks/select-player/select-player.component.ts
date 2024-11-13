import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { CoachDialogsComponent } from '../../coach/coach-dialogs/coach-dialogs.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { TablerIconsModule } from 'angular-tabler-icons';

@Component({
  selector: 'app-select-player',
  standalone: true,
  imports: [MaterialModule, FormsModule, ReactiveFormsModule, CommonModule, TablerIconsModule],
  templateUrl: './select-player.component.html',
  styleUrl: './select-player.component.scss'
})
export class SelectPlayerComponent {
  selectAll: boolean = false;
  @Input() datasource: any;
  @Output() done = new EventEmitter();
  @Output() cancel = new EventEmitter();

  // Toggle select all
  toggleSelectAll() {
    this.datasource.playerList.forEach(player => player.isSelected = this.selectAll);
  }

  onPlayerSelect() {
    const selected = this.datasource.playerList.filter(p => p.isSelected);
    console.log(selected)
  }



 
}
