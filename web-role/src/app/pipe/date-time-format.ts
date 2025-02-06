import { Pipe, PipeTransform } from '@angular/core';
import { format, parseISO } from 'date-fns';

@Pipe({
    name: 'dateTimeFormat',
    standalone: true
})
export class DateTimeFormatPipe implements PipeTransform {

    transform(eventDate: string, eventTime: number): string {
        // Parse the event date
        const parsedDate = parseISO(eventDate);

        // Calculate hours and minutes from eventTime in HHMM format
        const hours = Math.floor(eventTime / 100);  // First two digits for hours
        const minutes = eventTime % 100;  // Last two digits for minutes

        // Set the parsed date's time
        const eventDateTime = new Date(parsedDate.setHours(hours, minutes));

        // Format to the desired output format: Saturday, Sept 27th, 5:00 PM
        return format(eventDateTime, "EEEE, MMM do, h:mm a");
    }
}
