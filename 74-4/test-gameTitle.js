

//test code title ========================
const sel = s=>document.querySelector(s);
const game = new Game(
    sel('body'), 10, 20,
    Game.title,
    game=>{
        sel('#title .btn').onclick =_=>game.setState(Game.stageIntro);
        return sel('#title');
    },
    null,
    Game.stageIntro,
    game=>sel('#stageIntro'),
    (game, v)=>{
        sel('#stageIntro .stage').innerHTML = v;
        setTimeout(_=>game.setState(Game.play), 500);
    }
);
game.setState(Game.title);