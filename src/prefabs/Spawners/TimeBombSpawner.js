import Spawner from "./Spawner";
import TimeBomb from "../Cuttables/TimeBomb";

class TimeBombSpawner extends Spawner {

    constructor(game_state, name, position, properties) {
        super(game_state, name, position, properties);
    }

    create_object(name, position, velocity) {
        return new TimeBomb(this.game_state, name, position, {texture: "time_bomb_image", group: "time_bombs", velocity: velocity});
    }
}

export default TimeBombSpawner;
