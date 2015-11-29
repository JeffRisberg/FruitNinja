import BootState from './states/BootState';
import LoadingState from './states/LoadingState';
import TitleState from './states/TitleState';
import PlayState from './states/PlayState';

class FruitNinja extends Phaser.Game {

    constructor() {
        super("100%", "100%", Phaser.CANVAS, 'content', null);

        this.state.add('boot', BootState, false);
        this.state.add('loading', LoadingState, false);
        this.state.add("title", TitleState, false);
        this.state.add('play', PlayState, false);

        this.state.start('boot', true, false, "build/levels/title_screen.json", "title");
    }
}

new FruitNinja();