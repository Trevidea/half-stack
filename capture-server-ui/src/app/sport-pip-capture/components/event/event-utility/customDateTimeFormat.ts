import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'customDateTimeFormat'
})
export class CustomDateTimeFormatPipe implements PipeTransform {

    transform(dateTimeString: string, time: number): string {
        const date = new Date(dateTimeString);

        // Get day name
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayName = days[date.getDay()];

        // Get month name
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const monthName = months[date.getMonth()];

        // Get day suffix (st, nd, rd, or th)
        const day = date.getDate();
        let daySuffix;
        if (day >= 11 && day <= 13) {
            daySuffix = 'th';
        } else {
            switch (day % 10) {
                case 1:
                    daySuffix = 'st';
                    break;
                case 2:
                    daySuffix = 'nd';
                    break;
                case 3:
                    daySuffix = 'rd';
                    break;
                default:
                    daySuffix = 'th';
            }
        }

        // Format time
        const hours = Math.floor(time / 100);
        const minutes = time % 100;
        const ampm = hours >= 12 ? 'pm' : 'am';
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
        const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

        return `${dayName}, ${monthName} ${day}${daySuffix}, ${formattedHours}:${formattedMinutes} ${ampm}`;
    }

}
