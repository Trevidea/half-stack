import { AbstractBuilder } from "src/app/blocks/strategies";
import { Data } from "src/app/services/models-interfaces/full-stack-interface";
import { PlayerView } from "../views/player";


export class PlayerBuilder extends AbstractBuilder<Data.Player, PlayerView> {
    compose(m: Data.Player, v: PlayerView) {
        v.playerId = m.id;
        v.playerName = m.first_name + ' ' + m.last_name;
        v.JerseyNumber = m.jersey;
        v.position = m.position;
        v.picture = m.picture
        v.isSelected = false;
    }
    decompose(v: PlayerView): Data.Player {
        throw new Error("Method not implemented.");
    }
    view(): PlayerView {
        return new PlayerView();
    }

}