import BootState from './states/BootState';
import LoadingState from './states/LoadingState';
import PlayState from './states/PlayState';

class FruitNinja extends Phaser.Game {

    constructor() {
        super("100%", "100%", Phaser.CANVAS, 'content', null);

        this.state.add('boot', BootState, false);
        this.state.add('loading', LoadingState, false);
        this.state.add('play', PlayState, false);

        this.state.start('boot', true, false, "assets/levels/level1.json");
    }
}

new FruitNinja();