import { AbstractBuilder } from "src/app/blocks/strategies";
import { EventDetailView } from "../views/event-detail";
import { Data } from "src/app/services/models-interfaces/half-stack-interface";
// import { Transformer } from "src/app/blocks/transformer";
// import { ContectBuilder } from "./contects";
// import { RosterBuilder } from "./roster";
// import { OtherTeamBuilder } from "./other-team";
// import { SelectItemView } from "src/app/blocks/collection-item";


export class EventDetailsBuilder extends AbstractBuilder<Data.Event, EventDetailView> {
    override compose(m: Data.Event, v: EventDetailView) {
        console.log(m)
        v.id = m.id;
        v.title = m.title;
        v.type = m.type;
        v.program = m.program;
        v.level = m.level;
        v.dtEvent = m.dt_event;
        v.time = m.tm_event;
        v.sport = m.sport;
        v.status = m.status;
        // v.assCoachId = m.asst_coach;
        // v.headCoachId = m.head_coach;
        v.venue.cityAddress = m?.venue?.city_address;
        v.venue.streetAddress = m?.venue?.street_address;
        v.venue.location = m?.venue?.location;
        // v.headCoachName.Select((coach: SelectItemView) => coach.key === m.head_coach);
        // v.assistantCoachName.Select((coach: SelectItemView) => coach.key === m.asst_coach);
        // if (m.contact) {
        //     Transformer.ComposeCollection(m.contact, v.contectList, ContectBuilder);
        // }
        // if (m.event_roster) {
        //     Transformer.ComposeCollection(m.event_roster[0]?.players, v.ownRoster, RosterBuilder);
        // }
        // if (m.other_teams) {
        //     Transformer.ComposeObject(m.other_teams[0], v.otherTeam, OtherTeamBuilder)
        // }
    }
    timeNumToStr(time: number): string {
        const hours = Math.floor(time / 100);
        const minutes = time % 100;
        const formattedHours = hours < 10 ? '0' + hours : hours.toString();
        const formattedMinutes = minutes < 10 ? '0' + minutes : minutes.toString();
        return formattedHours + ':' + formattedMinutes;
    }

    override decompose(v: EventDetailView): Data.Event {
        throw new Error("Method not implemented.");
    }
    override view(): EventDetailView {
        return new EventDetailView();
    }

}