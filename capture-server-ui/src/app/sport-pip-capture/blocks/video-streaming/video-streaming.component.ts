import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import Hls from "hls.js";
@Component({
  selector: "app-video-streaming",
  templateUrl: "./video-streaming.component.html",
  styleUrls: ["./video-streaming.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class VideoStreamingComponent implements OnInit {
  @Input() liveStreamVideoPath: string = "";
  @ViewChild("liveStreamPlayer", { static: true })
  videoPlayer!: ElementRef<HTMLVideoElement>;
  public setVolumelenght: number = 15;
  private hls!: Hls;

  ngOnInit(): void {
    // Initialize hls.js
    this.hls = new Hls();

    if (Hls.isSupported()) {
      // Attach hls.js to the video element
      this.hls.attachMedia(this.videoPlayer.nativeElement);

      // Load the live stream
      this.hls.loadSource(this.liveStreamVideoPath);

      // When the stream is loaded, play it
      this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (this.videoPlayer.nativeElement.paused) {
          this.videoPlayer.nativeElement.play().catch((error) => {
            console.error("Error while trying to play the video:", error);
          });
          (document.querySelector(".fa-pause") as HTMLElement).style.display =
            "none";
        }
      });
    }
  }
  play() {
    if (this.videoPlayer.nativeElement.paused) {
      this.videoPlayer.nativeElement.play().catch((error) => {
        console.error("Error while trying to play the video:", error);
      });
      (document.querySelector(".fa-pause") as HTMLElement).style.display =
        "none";
      (document.querySelector(".fa-play") as HTMLElement).style.display =
        "block";
    } else {
      this.videoPlayer.nativeElement.pause();
      (document.querySelector(".fa-play") as HTMLElement).style.display =
        "none";
      (document.querySelector(".fa-pause") as HTMLElement).style.display =
        "block";
    }
  }
  fullScreen() {
    const video = this.videoPlayer.nativeElement as HTMLVideoElement;

    if (video.requestFullscreen) {
      video.requestFullscreen();
    }
  }

  ngAfterViewInit() {
    const video = this.videoPlayer.nativeElement;

    video.addEventListener("timeupdate", () => {
      let curr = (video.currentTime / video.duration) * 100;
      if (video.ended) {
        const playIcon = document.querySelector(".fa-play") as HTMLElement;
        if (playIcon) {
          playIcon.style.display = "block";
        }
        const pauseIcon = document.querySelector(".fa-pause") as HTMLElement;
        if (pauseIcon) {
          pauseIcon.style.display = "none";
        }
      }
      const innerElement = document.querySelector(".inner") as HTMLElement;
      if (innerElement) {
        innerElement.style.width = `${curr}%`;
      }
    });
  }
  setVolume(volume: number): void {
    const videoElement = this.videoPlayer.nativeElement;
    videoElement.volume = volume / 100;
  }
  showVolumeSlider: boolean = false;

  toggleVolumeSlider() {
    this.showVolumeSlider = !this.showVolumeSlider;
  }
}
