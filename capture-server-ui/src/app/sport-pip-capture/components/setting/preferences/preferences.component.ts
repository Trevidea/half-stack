import { Component, HostBinding, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { CoreConfigService } from '@core/services/config.service';
import { User } from 'app/auth/models';
import ColorThief from 'colorthief'
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthenticationService } from 'app/auth/service';
import { FlatpickrOptions } from 'ng2-flatpickr';


@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent implements OnInit {
  lightModeTimeChange: string;
  darkModeTimeChange: string
  dominantColors: string[] = [];
  lightModeTime: string = '05:00';
  darkModeTime: string = '19:00';
  autoSwitchEnabled: boolean = false;
  drakSwitchEnabled: boolean = false;
  lightSwitchEnabled: boolean = false;
  public avatarImage: string;

  form: UntypedFormGroup;
  private _unsubscribeAll: Subject<any>;
  coreConfig: any;
  showTimePicker: boolean = false

  color1 = ''
  color2 = ''
  color3 = ''
  public currentSkin: string;
  public prevSkin: string;
  dominantColor: string;
  @HostBinding('class.fixed-top')
  public isFixed = false;

  constructor(private _formBuilder: UntypedFormBuilder,
    private _coreConfigService: CoreConfigService,
    private _authenticationService: AuthenticationService,) {
    this.dominantColors = [];
    this._authenticationService.currentUser.subscribe(x => (this.currentUser = x));
    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  //Start  FlatpickrOptions//////
  public timeOptions: FlatpickrOptions = {
    enableTime: true,
    noCalendar: true,
    time_24hr: true,
    altInput: true,
    defaultDate: this.lightModeTime,
    dateFormat: 'H:i',
  }

  public timeOptions2: FlatpickrOptions = {
    enableTime: true,
    noCalendar: true,
    altInput: true,
    time_24hr: true,
    defaultDate: this.darkModeTime,
    dateFormat: 'H',
  }
  //end  FlatpickrOptions//////

  public currentUser: User;
  public horizontalMenu: boolean;
  public hiddenMenu: boolean;
  ngOnInit(): void {
    this.avatarImage = 'assets/images/avatars/10.png'
    this.extractDominantColor(this.avatarImage)
    // get the currentUser details from localStorage
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // Subscribe to the config changes
    this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
      this.coreConfig = config;
      this.currentSkin = config.layout.skin;
    });
    this.onCheckboxSelected(this.currentSkin);
  }


  /**EXTRACT color from img logic start */

  extractDominantColor(imageSrc: string) {
    const image = new Image();

    image.onload = () => {
      const colorThief = new ColorThief();
      const dominantColors = colorThief.getPalette(image, 3);
      const [color1, color2, color3] = dominantColors.map(color =>
        `rgb(${color[0]}, ${color[1]}, ${color[2]})`
      );
      this.color1 = color1;
      this.color2 = color2;
      this.color3 = color3;
    };

    image.src = imageSrc;
    this.avatarImage = imageSrc;
  }
  extractDominantColors(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const image = new Image();

        image.onload = () => {
          const colorThief = new ColorThief();
          const dominantColors = colorThief.getPalette(image, 3);

          const [color1, color2, color3] = dominantColors.map(color =>
            `rgb(${color[0]}, ${color[1]}, ${color[2]})`
          );


          this.color1 = color1;
          this.color2 = color2;
          this.color3 = color3;
        };
        image.src = e.target.result;
        this.avatarImage = e.target.result;
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }
  /** EXTRACT color from img logic end */


  /**light mode and dark mode logic start   */

  onCheckboxSelected(mode: string) {
    console.log(this.currentSkin)
    if (mode === 'default') {
      console.log()
      this.onLightModeCheckboxSelected();
    } else if (mode === 'dark') {
      this.onDarkModeCheckboxSelected();

    }
  }

  private onDarkModeCheckboxSelected() {
    this.showTimePicker = false;
    const darkModeCheckbox = document.getElementById('darkModeCheckbox') as HTMLInputElement;
    darkModeCheckbox.checked = true;
    const lightModeCheckbox = document.getElementById('lightModeCheckbox') as HTMLInputElement;
    lightModeCheckbox.checked = false;
    const autoSwitchCheckbox = document.getElementById('autoSwitchCheckbox') as HTMLInputElement;
    autoSwitchCheckbox.checked = false;
    this.autoSwitchEnabled = false;
  }
  private onLightModeCheckboxSelected() {
    const lightModeCheckbox = document.getElementById('lightModeCheckbox') as HTMLInputElement;
    lightModeCheckbox.checked = true;
    this.showTimePicker = false;
    const darkModeCheckbox = document.getElementById('darkModeCheckbox') as HTMLInputElement;
    darkModeCheckbox.checked = false;
    const autoSwitchCheckbox = document.getElementById('autoSwitchCheckbox') as HTMLInputElement;
    autoSwitchCheckbox.checked = false;
    this.autoSwitchEnabled = false;

  }


  showTime() {
    this.showTimePicker = true;
    const autoSwitchCheckbox = document.getElementById('autoSwitchCheckbox') as HTMLInputElement;
    autoSwitchCheckbox.checked = true;
    const lightModeCheckbox = document.getElementById('lightModeCheckbox') as HTMLInputElement;
    lightModeCheckbox.checked = false;
    const darkModeCheckbox = document.getElementById('darkModeCheckbox') as HTMLInputElement;
    darkModeCheckbox.checked = false;
    this.autoSwitchEnabled = true;
  }

  toggleAutoSwitch() {
    if (this.autoSwitchEnabled) {
      this.autoSwitchToLightOrDarkMode();
    }
  }

  autoSwitchToLightOrDarkMode() {
    const currentHour = new Date().getHours();
    console.log(currentHour)
    if (currentHour >= 17 || currentHour < 5) {
      this.setDarkMode();
    } else {
      this.setLightMode();
    }
  }

  setDarkMode() {
    this._coreConfigService.setConfig({ layout: { skin: 'dark' } }, { emitEvent: true });
  }

  setLightMode() {
    this._coreConfigService.setConfig({ layout: { skin: 'default' } }, { emitEvent: true });
    localStorage.setItem('prevSkin', this.currentSkin);
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  /** light mode and dark mode logicend  */

}
