import Spawner from "./Spawner";
import Clock from "../Cuttables/Clock";

class ClockSpawner extends Spawner {

    constructor(game_state, name, position, properties) {
        super(game_state, name, position, properties);
    }

    create_object(name, position, velocity) {
        return new Clock(this.game_state, name, position, {texture: "clock_image", group: "clocks", velocity: velocity});
    }
}

export default ClockSpawner;
