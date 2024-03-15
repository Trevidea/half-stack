import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {
  transform(timeString: string): string {
    let [hours, minutes] = timeString.split(':');
    let period = 'AM';
    const hour = parseInt(hours, 10);

    if (hour >= 12) {
      period = 'PM';
      if (hour > 12) {
        hours = (hour - 12).toString();
      }
    }

    hours = hours.padStart(2, '0');
    minutes = minutes.padStart(2, '0');

    return `${hours}:${minutes} ${period}`;
  }
}