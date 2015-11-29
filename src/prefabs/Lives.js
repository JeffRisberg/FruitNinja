import Prefab from "./Prefab";

class Lives extends Prefab {

    constructor(game_state, name, position, properties) {
        super(game_state, name, position, properties);
        var live_index, life;

        this.visible = false;

        this.lives = properties.lives;
        this.lives_sprites = [];

        // create a sprite for each life
        for (live_index = 0; live_index < this.lives; live_index += 1) {
            life = new Phaser.Sprite(this.game_state.game, position.x + (live_index * properties.lives_spacing), position.y, this.texture);
            this.lives_sprites.push(life);
            this.game_state.groups.hud.add(life);
        }
    }

    die() {
        var life;

        this.lives -= 1;
        // kill the last life
        life = this.lives_sprites.pop();
        life.kill();
        // if there are no more lives, it's game over
        if (this.lives === 0) {
            this.game_state.game_over();
        }
    }
}

export default Lives;
