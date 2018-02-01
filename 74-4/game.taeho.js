
const Game = class {

    constructor(renderer,col,row) {
        this.renderer = renderer;
        this.row = row;
        this.col = col;
        // super();
        this.stage = new Stage();

    }
    init() {
        this.stage.init(this.renderer);
    }
    setData(data) {
        this.data = data;
    }
    getData() {
        return this.data;
    }
    getInitData() {
        return [
            ['', '', '', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', '', '', '']
        ];
    }
    start() {
        console.log('start');
        this.init();
        this.data = new Data(this.row,this.col);
        this.data.all(
            ...this.getInitData()
        );
        this.setData(this.data);
        this.run();
        console.log('start done');
    }
    run() {
        console.log('run');
        const res = this.renderer.render(this.getData());
    }
};