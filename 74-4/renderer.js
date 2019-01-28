const Renderer = class{
    constructor(col, row, base, back) {
        // super();
        Object.assign(this, {col, row, base, back, blocks:[]}); //blocks 가 테이블의 tr,td 를 그릴 수 있는 배열의 style 데이터를 갖고 있으...
    }
    clear(){throw 'override';}
    render(v){
        // 강타입 계약을 하는 것은 굉장히 어려운 개념이다...  컴파일 통과하더라도.....의미없음...
        if(!(v instanceof Data)) throw 'invalid v'; // 형을 기억하고 ...v 기반일 것이다라는 것을 의미... Data 기반으로... 모든 처리가 앞단에서 끝났을 것이다라는 개념. 타입에 의존한 프로그래밍...
        this._render(v); //template method
    }
    _render(v){throw 'override!';} //template method
};