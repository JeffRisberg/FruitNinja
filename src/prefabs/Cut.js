class Cut extends Phaser.Graphics {

    constructor(game_state, name, position, properties) {
        super(game_state.game, position.x, position.y);

        this.game_state = game_state;

        this.name = name;

        this.game_state.groups[properties.group].add(this);

        this.game_state.prefabs[name] = this;

        // set color and width
        this.beginFill(properties.style.color);
        this.lineStyle(properties.style.line_width, properties.style.color, properties.style.alpha);

        // draw line
        this.moveTo(properties.start.x, properties.start.y);
        this.lineTo(properties.end.x, properties.end.y);

        // kill the cut after some time
        this.kill_timer = this.game_state.time.create();
        this.kill_timer.add(Phaser.Timer.SECOND * properties.duration, this.kill, this);
        this.kill_timer.start();
    }

    kill() {
        this.clear();
        super.kill();
    }
}

export default Cut;
