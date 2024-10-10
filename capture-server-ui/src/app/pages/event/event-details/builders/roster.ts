// import { AbstractBuilder } from "src/app/blocks/strategies";
// import { Data } from "src/app/services/models-interfaces/full-stack-interface";
// import { Playerview } from "../views/player-info";

// export class RosterBuilder extends AbstractBuilder<Data.EventPlayerRoster, Playerview> {
//     override compose(m: Data.EventPlayerRoster, v: Playerview) {
//         v.playerName = m.player_name;
//         v.JerseyNumber = m.Jersey_number;
//         v.playerPostion = m.position;
//     }
//     override decompose(v: Playerview): Data.EventPlayerRoster {
//         throw new Error("Method not implemented.");
//     }
//     override view(): Playerview {
//         return new Playerview();
//     }

// }