import Prefab from "./Prefab";

class Cuttable extends Prefab {

    constructor(game_state, name, position, properties) {
        super(game_state, name, position, properties);

        this.anchor.setTo(0.5);
        this.scale.setTo(5);

        this.game_state.game.physics.arcade.enable(this);

        // initiate velocity
        this.velocity = properties.velocity;
        this.body.velocity.y = -this.velocity.y;
        this.body.velocity.x = this.velocity.x;

        // kill prefab if it leaves screen
        this.checkWorldBounds = true;
        this.outOfBoundsKill = true;
    }

    reset(position_x, position_y, velocity) {
        super.reset(position_x, position_y);

        // initiate velocity
        this.body.velocity.y = -velocity.y;
        this.body.velocity.x = velocity.x;
    }
}

export default Cuttable;
