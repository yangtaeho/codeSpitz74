// data protocol 로 만들고 싶어서 네이티브 객체를 상속해서 만들 수 있도록 함...!
const Data = class extends Array{
    //assign 패턴
    constructor(r, c) {
        super();
        Object.assign(this, {r, c}); //this 란 키워드보다 super 가 반드시 먼저 있어야 함...
    }
    // ........... cell 만이 cell 의 정합성을 검증할 수있다..!
    cell(r, c, color, test) { //test 인자 추가 180131 - 겹치게 그렸는지 확인하는 메소드 
        if(r > this.r || c > this.c || r < 0 || c < 0 || color == '0') return this; //변경 -> 0은 안그리고 음 값도  처리하지 않도록..
        //(this[r] || (this[r] = []))[c] = color;
        const row = this[r] || (this[r] = []);
        if(color && row[c]) test.isIntersacted = true;
        row[c] = color;
        return this;
    }
    row(row, ...color){
        return color.forEach((v, i)=>this.cell(row, i, v)), this;
    }
    all(...rows){
        return rows.forEach((v, i)=>this.row(i, ...v)), this;
    }
};
