import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { environment } from "environments/environment";
import Hls from "hls.js";
import {
  trigger,
  transition,
  style,
  animate,
  state,
} from "@angular/animations";
@Component({
  selector: "app-video-streaming",
  templateUrl: "./video-streaming.component.html",
  styleUrls: ["./video-streaming.component.scss"],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger("volumeSliderAnimation", [
      state(
        "void",
        style({
          opacity: 0,
        })
      ),
      state(
        "*",
        style({
          opacity: 1,
        })
      ),
      transition(":enter", animate("0.3s ease-in-out")),
      transition(":leave", animate("0.3s ease-in-out")),
    ]),
  ],
})
export class VideoStreamingComponent implements OnInit {
  @Input()
  liveStreamVideoPath: string = `${environment.spHLSUrl}/spip_school_stream/ind_vs_pak/llhls.m3u8`;
  @ViewChild("liveStreamPlayer", { static: true })
  videoPlayer!: ElementRef<HTMLVideoElement>;
  public setVolumelenght: number = 15;
  private hls!: Hls;
  currentTime: string = "00:00";

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
          (document.querySelector(".play") as HTMLElement).style.display =
            "none";
          const video = this.videoPlayer.nativeElement;

          video.addEventListener("timeupdate", () => {
            this.currentTime = this.formatTime(video.currentTime);
          });
        }
      });
    }
  }
  formatTime(totalSeconds: number): string {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return `${this.padZero(minutes)}:${this.padZero(seconds)}`;
  }

  padZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }
  play() {
    if (this.videoPlayer.nativeElement.paused) {
      this.videoPlayer.nativeElement.play().catch((error) => {
        console.error("Error while trying to play the video:", error);
      });
      (document.querySelector(".play") as HTMLElement).style.display = "none";
      (document.querySelector(".pause") as HTMLElement).style.display = "block";
    } else {
      this.videoPlayer.nativeElement.pause();
      (document.querySelector(".pause") as HTMLElement).style.display = "none";
      (document.querySelector(".play") as HTMLElement).style.display = "block";
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
        const playIcon = document.querySelector(".play") as HTMLElement;
        if (playIcon) {
          playIcon.style.display = "block";
        }
        const pauseIcon = document.querySelector(".pause") as HTMLElement;
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
  seekTo(event: MouseEvent) {
    const video = this.videoPlayer.nativeElement;
    const bar = document.querySelector(".bar") as HTMLElement;
    const rect = bar.getBoundingClientRect();
    const posX = event.clientX - rect.left;
    const percentage = (posX / bar.offsetWidth) * 100;
    const seekTime = (percentage / 100) * video.duration;
    video.currentTime = seekTime;
  }
}
