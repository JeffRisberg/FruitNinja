import Spawner from "./Spawner";
import Fruit from "./Fruit";

class FruitSpawner extends Spawner {

    constructor(game_state, name, position, properties) {
        super(game_state, name, position, properties);

        this.frames = properties.frames;
    }

    create_object(name, position, velocity) {
        return new Fruit(this.game_state, name, position,
            {texture: "fruits_spritesheet", group: "fruits", frames: this.frames, velocity: velocity});
    }
}

export default FruitSpawner;
