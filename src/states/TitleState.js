import Prefab from '../prefabs/Prefab';
import TextPrefab from '../prefabs/TextPrefab';
import StartGameItem from '../prefabs/HUD/StartGameItem';
import JSONLevelState from '../states/JSONLevelState';

class TitleState extends JSONLevelState {

    constructor() {
        super();

        this.prefab_classes = {
            "start_game_item": StartGameItem,
            "background": Prefab
        };
    }

    create() {
        console.log("Title Create");
        super.create();
        var title_position, title_style, title, menu_position, menu_items, menu_properties, menu;

        // adding title
        title_position = new Phaser.Point(0.5 * this.game.world.width, 0.3 * this.game.world.height);
        title_style = {font: "72px Shojumaru", fill: "#FFF"};
        title = new TextPrefab(this, "title", title_position, {text: "Fruit Ninja", style: title_style, group: "hud"});
        title.anchor.setTo(0.5);
    }
}

export default TitleState;
