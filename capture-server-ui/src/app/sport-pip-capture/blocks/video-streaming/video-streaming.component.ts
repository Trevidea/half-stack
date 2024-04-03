import { Component, Input, OnInit } from "@angular/core";
import Hls from "hls.js";
@Component({
  selector: "app-video-streaming",
  templateUrl: "./video-streaming.component.html",
  styleUrls: ["./video-streaming.component.scss"],
})
export class VideoStreamingComponent implements OnInit {
  @Input() liveStreamVideoPath: string = "";
  private hls!: Hls;

  ngOnInit() {
    // Initialize hls.js
    this.hls = new Hls();

    // Get the video element by its ID
    const videoElement = document.getElementById(
      "liveStreamPlayer"
    ) as HTMLVideoElement;

    if (Hls.isSupported()) {
      // Attach hls.js to the video element
      this.hls.attachMedia(videoElement);

      // Load the live stream
      this.hls.loadSource(this.liveStreamVideoPath);

      // When the stream is loaded, play it
      this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
        videoElement.play();
      });
    }
  }
}
