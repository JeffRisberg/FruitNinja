import Cuttable from "./Cuttable";

class SpecialFruit extends Cuttable {

    constructor(game_state, name, position, properties) {
        super(game_state, name, position, properties);

        this.body.setSize(20, 20);

        // create a timer with autoDestroy = false, so it won't be killed
        this.kill_timer = this.game_state.game.time.create(false);
    }

    kill() {
        super.kill();

        // prepare the fruit so it can be reused
        this.body.allowGravity = true;
        this.kill_timer.stop();
    }

    cut() {
        super.cut();
        // if a fruit is cut, increment score
        this.game_state.score += 1;

        // if it's the first cut, stops the fruit and start the timer to kill it
        if (!this.kill_timer.running) {
            this.body.allowGravity = false;
            this.body.velocity.y = 0;
            this.body.velocity.x = 0;
            this.kill_timer.add(Phaser.Timer.SECOND * 3, this.kill, this);
            this.kill_timer.start();
        }
    }
}

export default SpecialFruit
