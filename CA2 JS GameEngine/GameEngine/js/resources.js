const Images = {
    player: new Image(),
    enemy: new Image()
    //Add more resource images in same format
};

//Audio not in base engine
const AudioFiles = {
    jump: "...", //File path
    collect: "..."
};

Images.player.src = "./resources/images/player/player.png";
Images.enemy.src = "./resources/images/enemy/enemy.png";

export {Images, AudioFiles};