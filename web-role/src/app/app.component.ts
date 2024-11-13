import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SocketService } from './services/web-socket/socket.service';
import { EventRunnerService } from './services/event-runner/event-runner.service';
import { MatDialog } from '@angular/material/dialog';
import { EventStartEndDialogsComponent } from './pages/notifications-dialogs/event-start-end-dialogs/event-start-end-dialogs.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'Trevidea';

  constructor(private socketService: SocketService,
    public dialog: MatDialog,
    private eventRunnerService: EventRunnerService) {
  }

  ngOnInit(): void {
    this.socketService.onTopicMessage('event-terminal').subscribe((data: { topic: string, data: string }) => {
      let message: { terminal: string };

      try {
        const correctedData = data.data.replace(/'/g, '"');
        const parsedData = JSON.parse(correctedData);
        message = parsedData;
      } catch (error) {
        console.error("JSON Parsing Error:", error, "Data:", data);
        return;
      }
      console.log("message socket ::", message);
      if (message.terminal === "start") {
        this.eventRunnerService.setEventStarted(true);
        console.log("message socket ::", message.terminal);
        this.OpenEventStartEndDialog("start");
      } else if (message.terminal === "stop") {
        this.eventRunnerService.setEventStarted(false);
        this.OpenEventStartEndDialog("stop")
      } else {
      }
    });
  }

  OpenEventStartEndDialog(action: string) {
    const dialogRef = this.dialog.open(EventStartEndDialogsComponent, {
      data: { action: action },
      maxWidth: '600px',
      width: '100%',
    });
    dialogRef.afterClosed().subscribe((result) => {
    });
  }
}
