class Score extends Phaser.Text {

    constructor(game_state, name, position, properties) {
        super(game_state.game, position.x, position.y, properties.text, properties.style);

        this.game_state = game_state;

        this.name = name;

        this.game_state.groups[properties.group].add(this);

        this.game_state.prefabs[name] = this;
    }

    update() {
        // update the text to show the number of cutted fruits
        this.text = "Fruits: " + this.game_state.score;
    }
}

export default Score;