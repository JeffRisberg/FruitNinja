import Prefab from '../prefabs/Prefab';
import BombSpawner from '../prefabs/BombSpawner';
import FruitSpawner from '../prefabs/FruitSpawner';
import SpecialFruitSpawner from '../prefabs/SpecialFruitSpawner';
import Cut from '../prefabs/Cut';
import Score from '../prefabs/Score';
import Lives from '../prefabs/Lives';
import GameOverPanel from '../prefabs/GameOverPanel';

class PlayState extends Phaser.State {

    constructor() {
        super();

        this.prefab_classes = {
            "bomb_spawner": BombSpawner,
            "fruit_spawner": FruitSpawner,
            "special_fruit_spawner": SpecialFruitSpawner,
            "background": Prefab
        };
    }

    init(level_data) {
        this.level_data = level_data;

        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        // start physics system
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 1000;

        this.MINIMUM_SWIPE_LENGTH = 50;

        this.score = 0;
        this.lives = 3;
    }

    create() {
        var group_name, prefab_name;

        // create groups
        this.groups = {};
        this.level_data.groups.forEach(function (group_name) {
            this.groups[group_name] = this.game.add.group();
        }, this);

        // create prefabs
        this.prefabs = {};
        for (prefab_name in this.level_data.prefabs) {

            if (this.level_data.prefabs.hasOwnProperty(prefab_name)) {
                this.create_prefab(prefab_name, this.level_data.prefabs[prefab_name]);
            }
        }

        // add events to check for swipe
        this.game.input.onDown.add(this.start_swipe, this);
        this.game.input.onUp.add(this.end_swipe, this);

        this.init_hud();
    }

    create_prefab(prefab_name, prefab_data) {
        var prefab;
        // create object according to its type
        if (this.prefab_classes.hasOwnProperty(prefab_data.type)) {
            prefab = new this.prefab_classes[prefab_data.type](this, prefab_name, prefab_data.position, prefab_data.properties);
        }
    }

    start_swipe(pointer) {
        this.start_swipe_point = new Phaser.Point(pointer.x, pointer.y);
    }

    end_swipe(pointer) {
        var swipe_length, cut_style, cut;
        this.end_swipe_point = new Phaser.Point(pointer.x, pointer.y);
        swipe_length = Phaser.Point.distance(this.end_swipe_point, this.start_swipe_point);

        // if the swipe length is greater than the minimum, a swipe is detected
        if (swipe_length >= this.MINIMUM_SWIPE_LENGTH) {
            // create a new line as the swipe and check for collisions
            cut_style = {line_width: 5, color: 0xE82C0C, alpha: 1};
            cut = new Cut(this, "cut", {x: 0, y: 0}, {
                group: "cuts",
                start: this.start_swipe_point,
                end: this.end_swipe_point,
                duration: 0.3,
                style: cut_style
            });
            this.swipe = new Phaser.Line(this.start_swipe_point.x, this.start_swipe_point.y, this.end_swipe_point.x, this.end_swipe_point.y);
            this.groups.fruits.forEachAlive(this.check_collision, this);
            this.groups.bombs.forEachAlive(this.check_collision, this);
            this.groups.special_fruits.forEachAlive(this.check_collision, this);
        }
    }

    check_collision(object) {
        var object_rectangle, line1, line2, line3, line4, intersection;
        // create a rectangle for the object body
        object_rectangle = new Phaser.Rectangle(object.body.x, object.body.y, object.body.width, object.body.height);
        // check for intersections with each rectangle edge
        line1 = new Phaser.Line(object_rectangle.left, object_rectangle.bottom, object_rectangle.left, object_rectangle.top);
        line2 = new Phaser.Line(object_rectangle.left, object_rectangle.top, object_rectangle.right, object_rectangle.top);
        line3 = new Phaser.Line(object_rectangle.right, object_rectangle.top, object_rectangle.right, object_rectangle.bottom);
        line4 = new Phaser.Line(object_rectangle.right, object_rectangle.bottom, object_rectangle.left, object_rectangle.bottom);
        intersection = this.swipe.intersects(line1) || this.swipe.intersects(line2) || this.swipe.intersects(line3) || this.swipe.intersects(line4);
        if (intersection) {
            // if an intersection is found, cut the object
            object.cut();
        }
    }

    init_hud() {
        var score_position, score_style, score, lives_position, lives;
        // create score prefab
        score_position = new Phaser.Point(20, 20);
        score_style = {font: "48px Arial", fill: "#fff"};
        score = new Score(this, "score", score_position, {text: "Fruits: ", style: score_style, group: "hud"});

        // create lives prefab
        lives_position = new Phaser.Point(0.75 * this.game.world.width, 20);
        lives = new Lives(this, "lives", lives_position, {texture: "sword_image", group: "hud", "lives": 3, "lives_spacing": 50});
    }

    game_over() {
        var game_over_panel, game_over_position, game_over_bitmap, panel_text_style;
        // if current score is higher than highest score, update it
        if (!localStorage.highest_score || this.score > localStorage.highest_score) {
            localStorage.highest_score = this.score;
        }

        // create a bitmap do show the game over panel
        game_over_position = new Phaser.Point(0, this.game.world.height);
        game_over_bitmap = this.add.bitmapData(this.game.world.width, this.game.world.height);
        game_over_bitmap.ctx.fillStyle = "#000";
        game_over_bitmap.ctx.fillRect(0, 0, this.game.world.width, this.game.world.height);
        panel_text_style = {game_over: {font: "32px Arial", fill: "#FFF"},
            current_score: {font: "20px Arial", fill: "#FFF"},
            highest_score: {font: "18px Arial", fill: "#FFF"}};
        // create the game over panel
        game_over_panel = new GameOverPanel(this, "game_over_panel", game_over_position, {texture: game_over_bitmap, group: "hud", text_style: panel_text_style, animation_time: 500});
        this.groups.hud.add(game_over_panel);
    }

    restart_level() {
        this.game.state.restart(true, false, this.level_data);
    }
}

export default PlayState;
