import Cuttable from "./Cuttable";

class Clock extends Cuttable {

    constructor(game_state, name, position, properties) {
        super(game_state, name, position, properties);

        this.body.setSize(20, 20);
    }

    cut() {
        super.cut();
        // if a clock is cut, increase the remaining time by 3 seconds
        this.game_state.remaining_time += Phaser.Timer.SECOND * 3;
        this.kill();
    }
}

export default Clock;
