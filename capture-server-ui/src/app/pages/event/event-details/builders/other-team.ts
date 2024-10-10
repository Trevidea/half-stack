// import { AbstractBuilder } from "src/app/blocks/strategies";
// import { Transformer } from "src/app/blocks/transformer";
// import { OtherTeamView } from "../views/other-team";
// import { RosterBuilder } from "./roster";
// import { Playerview } from "../views/player-info";
// import { Data } from "src/app/services/models-interfaces/half-stack-interface";

// export class OtherTeamBuilder extends AbstractBuilder<Data.OtherTeam, OtherTeamView> {
//     override compose(m: Data.OtherTeam, v: OtherTeamView) {
//         v.id = m.id;
//         v.eventId = m.event_id;
//         v.logo = m.logo;
//         v.oppositionTeams.SelectedItem = m.name;
//         v.oppAsstCoach = m.asst_coach;
//         v.oppHeadCoach = m.head_coach;
//         if (m.roster) {
//             Transformer.ComposeCollection(m.roster, v.roster, OtherTeamRosterBuilder);
//         }
//     }
//     override decompose(v: OtherTeamView): Data.OtherTeam {
//         return {
//             id: v.id,
//             logo: v.logo,
//             name: v.oppositionTeams.SelectedItem,
//             head_coach: v.oppHeadCoach,
//             asst_coach: v.oppAsstCoach,
//             event_id: v.eventId,
//             roster: Transformer.DecomposeCollection(v.roster, OtherTeamRosterBuilder),
//         }
//     }
//     override view(): OtherTeamView {
//         return new OtherTeamView();
//     }

// }


// export class OtherTeamRosterBuilder extends AbstractBuilder<Data.OtherTeamRoster, Playerview> {

//     override compose(m: Data.OtherTeamRoster, v: Playerview) {
//         console.log(m);
//         v.JerseyNumber = m.jersey;
//         v.playerName = m.player;
//         v.playerPostion = m.position;
//     }
//     override decompose(v: Playerview): Data.OtherTeamRoster {
//        throw new Error("not implemented")
//     }
//     override view(): Playerview {
//         return new Playerview();
//     }

// }