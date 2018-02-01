const log =txt=>console.log(txt);

const ConsoleRenderer = class extends Renderer{
    constructor(col, row, back){
        super(col, row, log, back);
    }
};