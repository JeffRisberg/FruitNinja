var FruitNinja = FruitNinja || {};

FruitNinja.Score = function (game_state, name, position, properties) {
    "use strict";
    Phaser.Text.call(this, game_state.game, position.x, position.y, properties.text, properties.style);
    
    this.game_state = game_state;
    
    this.name = name;
    
    this.game_state.groups[properties.group].add(this);
    
    this.game_state.prefabs[name] = this;
};

FruitNinja.Score.prototype = Object.create(Phaser.Text.prototype);
FruitNinja.Score.prototype.constructor = FruitNinja.Score;

FruitNinja.Score.prototype.update = function () {
    "use strict";
    // update the text to show the number of cutted fruits
    this.text = "Fruits: " + this.game_state.score;
};