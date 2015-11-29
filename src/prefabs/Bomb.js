import Cuttable from "./Cuttable";

class Bomb extends Cuttable {

    constructor(game_state, name, position, properties) {
        super(game_state, name, position, properties);

        this.body.setSize(20, 20);
    }

    cut() {
        super.cut();
        // if a bomb is cut, the player loses a life
        this.game_state.prefabs.lives.die();
        this.kill();
    }
}

export default Bomb;
