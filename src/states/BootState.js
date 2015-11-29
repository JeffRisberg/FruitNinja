class BootState extends Phaser.State {

    constructor() {
        super();
    }

    init(level_file) {
        this.level_file = level_file;
    }

    preload() {
        this.load.text("level1", this.level_file);
    }

    create() {
        var level_text, level_data;

        level_text = this.game.cache.getText("level1");
        level_data = JSON.parse(level_text);
        this.game.state.start("loading", true, false, level_data);
    }
}

export default BootState;
