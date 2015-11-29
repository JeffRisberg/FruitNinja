import TextPrefab from "../TextPrefab";

class Score extends TextPrefab {

    constructor(game_state, name, position, properties) {
        super(game_state, name, position, properties);
    }

    update() {
        // update the text to show the number of cutted fruits
        this.text = "Fruits: " + this.game_state.score;
    }
}

export default Score;
