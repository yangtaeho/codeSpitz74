


//test code title ========================
const sel = s=>document.querySelector(s);
const game = new Game(
    sel('body'), 10, 20,...
    Game.play,
    game=>{
        const t = new TableRenderer(game.col, game.row, '#000');
        sel('#play').appendChild(t.base);
        sel('#play').renderer = t;
        return sel('#play');
    },
    v=>{
        switch (true) {
            case v instanceof Data:sel('#play').renderer.render(v); break;
            case v instanceof Block:
                v= v.block;
                const t= new TableRenderer(
                    v.reduce((p,v)=>v.length > p ? v.length : p, 0),
                    v.length,
                    'rgba(0,0,0,0)'
                );
                sel('#play .next').innerHTML = t.base.outHTML;
                //귀찮아서 상수항을 넣음....
                t.renderer(new Data(5,5).all(...v.map(v=>v=='0'?'0':v.color))); //강타입 형태로 해서 타입을 갱신하도록....
                
                break;
        
            default:
                break;
        }
    }
);
game.setState(Game.title);