import Cuttable from "./Cuttable";

class Fruit extends Cuttable {

    constructor(game_state, name, position, properties) {
        super(game_state, name, position, properties);

        this.frames = properties.frames;

        var frame_index = this.game_state.rnd.between(0, this.frames.length - 1);
        this.frame = this.frames[frame_index];

        this.body.setSize(20, 20);
    }

    reset(position_x, position_y, velocity) {
        super.reset(position_x, position_y, velocity);

        var frame_index = this.game_state.rnd.between(0, this.frames.length - 1);
        this.frame = this.frames[frame_index];
    }

    cut() {
        this.game_state.score += 1;
        this.kill();
    }
}

export default Fruit;
