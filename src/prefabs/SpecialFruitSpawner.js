import Spawner from "./Spawner";
import SpecialFruit from "./SpecialFruit";

class SpecialFruitSpawner extends Spawner {

    constructor(game_state, name, position, properties) {
        super(game_state, name, position, properties);

        this.frames = properties.frames;
    }

    create_object(name, position, velocity) {
        return new SpecialFruit(this.game_state, name, position,
            {texture: "fruits_spritesheet", group: "special_fruits", frame: 15, velocity: velocity});
    }
}

export default SpecialFruitSpawner;
