class LoadingState extends Phaser.State {

    constructor() {
        super();
    }

    init(level_data, next_state) {
        this.level_data = level_data;
        this.next_state = next_state;
    }

    preload() {
        var assets = this.level_data.assets;

        for (var asset_key in assets) { // load assets according to asset key
            if (assets.hasOwnProperty(asset_key)) {
                var asset = assets[asset_key];
                switch (asset.type) {
                    case "image":
                        this.load.image(asset_key, asset.source);
                        break;
                    case "spritesheet":
                        this.load.spritesheet(asset_key, asset.source, asset.frame_width, asset.frame_height, asset.frames, asset.margin, asset.spacing);
                        break;
                }
            }
        }
    }

    create() {
        this.game.state.start(this.next_state, true, false, this.level_data);
    }
}

export default LoadingState;