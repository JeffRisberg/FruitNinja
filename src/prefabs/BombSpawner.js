import Spawner from "./Spawner";
import Bomb from "./Bomb";

class BombSpawner extends Spawner {

    constructor(game_state, name, position, properties) {
        super(game_state, name, position, properties);
    }

    create_object(name, position, velocity) {
        return new Bomb(this.game_state, name, position, {texture: "bomb_image", group: "bombs", velocity: velocity});
    }
}

export default BombSpawner;
