const s = {};
'title....생략'
const Game = class{
    constructor(base, col, row, ...v){
        Object.assign(this, {base, col, row, state:{}, curr:'title', score:new Score, stage:new Stage});
        let i = 0;
        while(i < v.length) thisstate[v[i++]] = Panel.get(this, v[i++], v[i++]);
    }
    setState(state){
        if(!Object.values(s).includes(state)) throw 'invalid'; //열거형을 통해서 이 메서드를 안정화 해줌...
        this.curr = state;
        const {state:{[this.curr]:{base:el}}} = this;
        this.base.innerHTML = '';
        this.base.appendChild(el); // 다음주에는 네이티브 객체 다 날려버릴거임...
        el.style.display = 'block';
        this[this.curr]();//현재 스테이트의 함수 호출...
    }
};
