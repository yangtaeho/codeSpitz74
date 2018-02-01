
const CanvasRenderer = class extends Renderer{
    constructor(col,row,back,style){
        super(col, row, el('canvas'));
        const {base, blocks} = this;
        base.style.cssText = style; //border 처리 등...

        Object.assign(tihs, {
            width:base.width = parseInt(base.style.height),
            height:base.height = parseInt(base.style.height),
            cellSize:[base.width/col, base.height/row],
            ctx:bse.getContext('2d')
        });

    }
    clear(){

        this.ctx.clearRect(0,0,this.width,this.height);
    }
    _render(v){
        this.clear();
        const {col, ctx, cellSize:[w,h]} = this;
        let {row:i} = this;
        while (i--) {
            let j = col;
            while (j--) {
                ctx.fillStyle = v[i][j];
                ctx.fillRect= ''; /////////Av[i][j]; TODO
            }
        }
    }
}