import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { CoachDialogsComponent } from '../../coach/coach-dialogs/coach-dialogs.component';
import { SelectPlayerComponent } from './select-player.component';
import { ModelService } from 'src/app/services/model-services/model-service.service';
import { PlayerRosterView } from './views/player';

@Component({
  selector: 'app-select-player-presenter',
  standalone: true,
  imports: [MatDialogContent, SelectPlayerComponent],
  template: `<app-select-player [datasource]="ds" (cancel)="onCancel()" (done)="onDone()" ></app-select-player>`,
  styleUrl: './select-player.component.scss'
})
export class SelectPlayerPresenter implements OnInit {
  ds!: PlayerRosterView;
  constructor(public dialogRef: MatDialogRef<CoachDialogsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, // Receive data
    private modelService: ModelService) {
    this.ds = new PlayerRosterView();
    if (data && data.players) {
      this.ds.playerList = data.players;
    }
  }
  ngOnInit(): void {
   
  }



  onCancel() {
    this.dialogRef.close();
  }

  onDone() {
    const selectedPlayers = this.ds.playerList.filter(player => player.isSelected);
    this.dialogRef.close(selectedPlayers);
  }
}
