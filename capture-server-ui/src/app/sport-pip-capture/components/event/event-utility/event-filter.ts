import { EventView } from "../views/event";

export class EventFilter {
    static filterEvents(events: EventView[], query: any): EventView[] {
        return events.filter(event => {
            return (
                (query.level === null || event.level === query.level) &&
                (query.program === null || event.program === query.program) &&
                (query.sport === null || event.sport === query.sport) &&
                (query.year === null || event.year === query.year) &&
                (query.status === null || event.status === query.status)
            );
        });
    }
}