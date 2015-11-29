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

    cut() {
        var emitter;
        // create emitter in prefab position
        emitter = this.game_state.game.add.emitter(this.x, this.y);
        emitter.makeParticles("particle_image");
        // set particles speed
        emitter.minParticleSpeed.setTo(-200, -200);
        emitter.maxParticleSpeed.setTo(200, 200);
        emitter.gravity = 0;
        // start emitter
        emitter.start(true, 700, null, 1000);
    }
}

export default Cuttable;
