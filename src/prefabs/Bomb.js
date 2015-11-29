import Cuttable from "./Cuttable";

class Bomb extends Cuttable {

    constructor(game_state, name, position, properties) {
        super(game_state, name, position, properties);

        this.body.setSize(20, 20);
    }

    cut() {
        this.game_state.game_over();
        this.kill();
    }
}

export default Bomb;
