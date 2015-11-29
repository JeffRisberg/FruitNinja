import TextPrefab from "../TextPrefab";

class StartGameItem extends TextPrefab {

    constructor(game_state, name, position, properties) {
        super(game_state, name, position, properties);

        this.anchor.setTo(0.5);

        this.level_file = properties.level_file;
        this.state_name = properties.state_name;

        this.inputEnabled = true;
        this.events.onInputDown.add(this.select, this);
    }

    select() {
        this.game_state.state.start("boot", true, false, this.level_file, this.state_name);
    }
}

export default StartGameItem;
