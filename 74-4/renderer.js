const Renderer = class{
    constructor(col, row, base, back) {
        // super();
        Object.assign(this, {col, row, base, back, blocks:[]}); //blocks 가 테이블의 tr,td 를 그릴 수 있는 배열의 style 데이터를 갖고 있으...
    }
    clear(){throw 'override';}
    render(data){
        // 강타입 계약을 하는 것은 굉장히 어려운 개념이다...  컴파일 통과하더라도.....의미없음...
        if(!(data instanceof Data)) throw 'invalid data'; // 형을 기억하고 ...data 기반일 것이다라는 것을 의미... Data 기반으로... 모든 처리가 앞단에서 끝났을 것이다라는 개념. 타입에 의존한 프로그래밍...
        this._render(data); //template method
    }
    _render(data){throw 'override!';} //template method
};

// data protocol 로 만들고 싶어서 네이티브 객체를 상속해서 만들 수 있도록 함...!
const Data = class extends Array{
    //assign 패턴
    constructor(row, col) {
        super();
        Object.assign(this, {row, col}); //this 란 키워드보다 super 가 반드시 먼저 있어야 함...
    }
    // ........... cell 만이 cell 의 정합성을 검증할 수있다..!
    _cell(r, c, color, test) { //test 인자 추가 180131 - 겹치게 그렸는지 확인하는 메소드 
        if(r > this.rw || c > this.c || r < 0 || c < 0 || color == '0') return this; //변경 -> 0은 안그리고 음 값도  처리하지 않도록..
        //(this[r] || (this[r] = []))[c] = color;
        const row = this[r] || (this[r] = []);
        if(color && row[c]) test.isIntersacted = true;
        row[c] = color;
        return this;
    }
    _row(row, ...color){
        return color.forEach((v, i)=>this._cell(row, i, v)), this;
    }
    all(...rows){
        return rows.forEach((v, i)=>this._row(i, ...v)), this;
    }

};
