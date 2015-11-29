import Prefab from '../prefabs/Prefab';
import Score from '../prefabs/Score';
import FruitSpawner from '../prefabs/FruitSpawner';
import BombSpawner from '../prefabs/BombSpawner';
import Cut from '../prefabs/Cut';

class PlayState extends Phaser.State {

    constructor() {
        super();

        this.prefab_classes = {
            "fruit_spawner": FruitSpawner,
            "bomb_spawner": BombSpawner,
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
        console.log("start_swipe");
        this.start_swipe_point = new Phaser.Point(pointer.x, pointer.y);
    }

    end_swipe(pointer) {
        console.log("end_swipe");
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
        // create score prefab
        var score_position = new Phaser.Point(20, 20);
        var score_style = {font: "48px Arial", fill: "#fff"};
        var score = new Score(this, "score", score_position, {text: "Fruits: ", style: score_style, group: "hud"});
    }

    game_over() {
        this.game.state.restart(true, false, this.level_data);
    }
}

export default PlayState;
