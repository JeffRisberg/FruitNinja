import TextPrefab from "../TextPrefab";

class RemainingTime extends TextPrefab {

    constructor(game_state, name, position, properties) {
        super(game_state, name, position, properties);
    }

    update() {
        // update the text to show the remaining time in seconds
        this.text = "Time Left: " + this.game_state.remaining_time / Phaser.Timer.SECOND;
    }
}

export default RemainingTime;