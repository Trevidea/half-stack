import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'eventTypeTransform'
})
export class EventTypeTransformPipe implements PipeTransform {
  transform(value: string): string {
    if (value === 'on-demand') {
      return 'On-Demand event';
    }else if(value === 'scheduled'){
      return 'Scheduled event'
    }
    return value;
  }
}
