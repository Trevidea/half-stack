import { Component, Input, OnInit } from '@angular/core';
import Hls from 'hls.js';
@Component({
  selector: 'app-hls-player',
  standalone: true,
  imports: [],
  templateUrl: './hls-player.component.html',
  styleUrl: './hls-player.component.scss'
})
export class HlsPlayerComponent implements OnInit {
  @Input() videoSrc: string;

  ngOnInit(): void {
    const videoElement = document.getElementById('videoElement') as HTMLVideoElement;
    this.setVideoSource('videoElement', this.videoSrc)
  }


  private setVideoSource(elemId: string, src: string) {
    console.log('Setting video source:', src);
    const video = document.getElementById(elemId) as HTMLVideoElement;
    if (Hls.isSupported()) {
      console.log('HLS is supported');
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MEDIA_ATTACHED, () => {
        video.muted = true;
        video.play();
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      console.log('HLS is not supported but native HLS is supported');
      video.src = src;
      video.addEventListener('canplay', () => {
        video.play();
      });
    } else {
      console.log('Neither HLS nor native HLS is supported');
    }
  }
}
