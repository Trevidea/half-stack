import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { PlyrComponent } from 'ngx-plyr';

@Component({
  selector: 'app-past-event-view',
  templateUrl: './past-event-view.component.html',
  styleUrls: ['./past-event-view.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PastEventViewComponent implements OnInit {
  // url = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";
  // url = "http://drake.in:59919/spip_school_stream/ind_vs_pak/llhls.m3u8";
  url = "assets/videos/2/output.m3u8";
  // get the component instance to have access to plyr instance
  @ViewChild(PlyrComponent)

  // or get it from plyrInit event
  public plyr: PlyrComponent;
  public player: Plyr;
  public plyrOptions = { tooltips: { controls: true } };
  constructor() { }

  ngOnInit(): void {
  }
  // video Sources
  public videoSources: Plyr.Source[] = [
    {
      src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4',
      type: 'video/mp4',
      size: 576
    },
    {
      src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4',
      type: 'video/mp4',
      size: 720
    },
    {
      src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4',
      type: 'video/mp4',
      size: 1080
    },
    {
      src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1440p.mp4',
      type: 'video/mp4',
      size: 1440
    }
  ];

  public tracks = [
    {
      kind: 'captions',
      label: 'English',
      srclang: 'en',
      src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.en.vtt',
      default: true
    },
    {
      kind: 'captions',
      label: 'French',
      srclang: 'fr',
      src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.fr.vtt'
    }
  ];

  public poster = 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg';



}
