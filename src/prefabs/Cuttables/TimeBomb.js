import Cuttable from "./Cuttable";

class TimeBomb extends Cuttable {

    constructor(game_state, name, position, properties) {
        super(game_state, name, position, properties);

        this.body.setSize(20, 20);
    }

    cut() {
        super.cut();
        // if a time bomb is cut, decrease the remaining time by 5 seconds
        this.game_state.remaining_time -= Phaser.Timer.SECOND * 5;
        this.kill();
    }
}

export default TimeBomb;
