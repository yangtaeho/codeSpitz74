const s = {};
'title,stageIntro,play,dead,stageClear,clear,ranking'.split(',').forEach(v=>s[v] = Symbol());
//'title....생략'
const Game = class{
    constructor(base, col, row, ...v){
        Object.assign(this, {base, col, row, state:{}, curr:'title', score:new Score, stage:new Stage});
        let i = 0;
        while(i < v.length) this.state[v[i++]] = Panel.get(this, v[i++], v[i++]);
    }
    // 여기에서 받아온 state 를 통해 처리되기 떄문에  symbol 로 잔뜩 서술하는 것이 의미가 없다...
    setState(state){
        if(!Object.values(s).includes(state)) throw 'invalid'; //열거형을 통해서 이 메서드를 안정화 해줌...
        this.curr = state;
        const {state:{[this.curr]:{base:el}}} = this;
        this.base.innerHTML = '';
        this.base.appendChild(el); // 다음주에는 네이티브 객체 다 날려버릴거임...
        el.style.display = 'block';
        this[this.curr]();//현재 스테이트의 함수 호출...
    }
    _render(v){
        const {state:{[this.curr]:base}} = this;
        base.render(v);
    }
};
//entries가 키밸류 쌍으로 분리해준 것을 게임에게 넣어줌. 
Object.entries(s).forEach(([k,v])=>Game[k]=v);
//forEach 는 c 코드니까.... 무한대로 빨라질 수 있다... 따라서 for 보다 빠르다.. 표준쓰는게 이긴다...
//지금 당장 퍼포먼스가 문제가 되든 말든 네이티브 함수로 바뀐다... 
//문 한 줄 한 줄이 객체로 바뀜... 서스팬드 하기 위해서...
//ec 스펙은 안정화되면 네이티브로 다 내리기 때문에 무조건 표준을 써주는게 좋다.
Object.freeze(Game);