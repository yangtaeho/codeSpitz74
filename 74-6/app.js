//여기는 기본이니까.. intent 를 한 줄 띄는 것으로 대체하는 것을 제안..
const APP = (SET=>{

'use strict'; // 좀 더 엄격하게 검사.. 우리가 만든 부분에 설정하는 것으로..

//[s] 자체 라이브러리 구간 ========================================
//라이브러리는 최대한 많이 만들어 본후 천천히 써도 늦지 않는다....

//while 과 for 를 없애는 역할..
//문을 함수로 감쌈으로서 어디에든 쓸 수 있다...
//쎄미 콜론은 무조건 찍어라... minify 하면 다 깨져...
const repeat = (count, ...arg) => {
    const f = arg.pop();
    for(let i = 0; i < count; i++) f(i, ...arg);
};

//Object assign 을 저 오브젝트에 property 를 추가하겠다는 의도가 이름에 들어감.
const PROP = (self, ...v) => Object.assign(self, ...v);
const ERR = v => { throw v; }
const IS_OVERRIDE = _ => ERR('isOverride!'); //주석이 아니라 .. 코드로 표현한 것만이 살아난다..!
// 기억에 의존하는 코드 규칙을 함수로 변경...
const TMPL = (self, method, ...arg) => '_' + method in self ? self['_' + method](...arg) : ERR();
const HOOK = (p, method) => typeof p.prototype[method] === 'function' ? '_' + method : ERR();
// 수정할 일이 많지 않은 경우는 줄 수를 줄이는게 좋다...


//[e] 자체 라이브러리 구간 ========================================


const SubData = class{
    constructor(listener) { PROP(this, {listener}); }
    notify() { if(this.listener) this.listener(); }
    clear() {
        // 언어에서 제공해주지 않으니 함수로 표현한 것.
        TMPL(this, 'clear');
        //this._clear(); // 탬플릿 메소드를 호출한다는 의미
    }
};
const Stage = class extends SubData {
    //clear 용 hook 메소드란 것으로 표현함.
    // hook 은 탬플릿 메소드 패턴에서 이런 상황을 표현할 때 쓰는 용어
    [HOOK(SubData, 'clear')]() {
    // _clear() { }
        this.stage = 0;
        this.isNext();
    }
    isNext() {
        // 상수는 선언하고 반영하는게 아니고 선언하기 전부터 애초에 가져오도록 해버리는게 좋다....
        if(this.stage++ === SET.stage.max) return false;
        else {
            this.notify();
            return true;
        }
    }
    // stage 가 이렇게 어렵다.. 단위테스트는 코드의 견고함을 보장하지 못한다... 코드의 안정성에 집착을 해야 한다.
    // 코드 안정성 확인... 분기가 없다. 키 추출이 안되면 죽는다. 멘데토리 함수.....
    // if 가 멘데토리 이거나 옵셔널이라도 if 와 else 에서 하는 일이 동일해야 한다.
    get speed() {
        const {stage: {speed: [min, max], max: stageMax}} = SET;
        return min - (min - max) * (this.stage - 1) / stageMax; //선형 보간 활용... TODO
    }
    get count() {
        //해체를 쓰는 이유... 제어문 없이 해체 가능함.
        const {stage: {count:[base, inc]}} = SET;
        return max + inc * (this.stage - 1);
    }
};
const Score = class extends SubData {
    [HOOK(SubData, 'clear')]() {
        this.curr = this.total = 0; // 중복을 제거...
        this.notify();
    }
    add(line, stage) {
        // 생략
    }
};
const Block = class {
    //set, get 은 유일하게 함수로 쓸수 있는 예약어..
    static get() {}
    constructor() {}
    left() {}
    right() {}
    get block() {}
};
const Data = class extends Array {
    constructor(row, col) {
        super(row); //500의 길이를 갖는데 안에 메모리는 차지 하지 않는 배열을 갖는 성김배열을 만듦. 여기서도 성김배열을 만듦.
        this.fill([]); //빈 배열에 array 를 넣어서 2차원 배열을 만들어 줬다. 길이만 있고 비워있었기 때문에 가능함.
        PROP(this, {col}); //this.col = col; //자기만의 언어로 표현...
    }
    cell() {}
    row() {}
    all() {}
};
const Renderer = class {
    constructor() {}
    // 이것마저 실수의 여지가 있다..
    //clear() { throw 'override!'; }
    clear() { IS_OVERRIDE(); }
    render(v) {
        TMPL(this, 'render', v);
    }
};
const TableRenderer = class extends Renderer {
    //반드시 부모만 받는 것은 아님.... 자바의 인터...? 모르곘다... TODO
    [HOOK(Renderer, 'render')]() {}
    //@Override //가능함.. 아직 공식 스펙은 아님.. 데코리에터 스펙....
    //웰노운 심볼? 과 부딪힌다?? 
    [OVERRIDE(Renderer, 'clear')]() {} // 구현은 생략.... HOOK 과 비슷하니 해볼 것.. TODO
};
const Panel = class {
    constructor(game, _init, _render) {
        PROP(this, {game, _init, _render});
    }
    //use strict 모드에서는 arguments 란 예약어만 나와도 죽는다....
    init(...arg) {
        //...arg 가 나온 이유는 arguments 라는게 이미 알고 있어야 하는 지식이 있어야 하기 때문....
        return this.base = this._init(this.game, ...arg);
        //레이지 로딩.. base 를 호출하는 시점까지 _init 의 격발을 늦춤...
    }
    render(...arg) {
        this._render(this.base, this.game, ...arg);
    }
};
const Game = class {
    //상태를 정의해놓으면 상태를 늘릴 수 있다.
    //클래스에 코드를 기술하지 않도록 할수록 컨테이너와 같은 개체가 될 수 있다.
    //조합형 개체.. 개체망을 통해서 구현....할 수 있을까에 대한 고민
    //그림 을 그리는 패널과 그 상황에 맞는 액션을 하는 무언가로 나눌 수 있다.

    constructor(col, row, basePanel) { //네이티브 객체가 들어오는 걸 막기 위해 basePanel 을 인자로 받음.

    }
    // f 는 인자로 받는 함수의 애칭..
    addState(state, {init, render}, f) { //panel 을 해체하서 init, render 로 받음.
        this.state[state] = f;
        this.panel[panel] = new Panel(this, init, render);
    }

};

return {
    init() {
        const game = new Game(10, 20, {
            init() {
                return self('#stage');
            },
            render(base, game, panel, {base: el = panel.init()}) {
                //네 번째 인자는 실제로는 없지만.. 좌변으로부터 해석하기 떄문에 받은 panel 에 접근할 수 있다.
                base.innerHTML = '';
                base.appendChild(el);
            }
            // render(base, game, panel) {
            //     const {base: el = panel.init()} = panel;
            //     base.innerHTML = '';
            //     base.appendChild(el);
            // }
        });
        // 상태패턴이 상태를 바꾸거나.... ?? ㅇ만ㅇ란얼나ㅣ;어라미;ㄴㅇ러  22:03 TODO
        // 응집도를 높이기 위해 변화율 같은 애들 묶어온 것임... 기존과 바뀐 부분...
        game.addState(Game.title, {
            init(game, ...arg) {
                sel('#title').style.display = 'block';
                sel('#title.start').onclick = _ =>game.setState(Game.stageIntro);
                return sel('#title');
            },
            null
            //안쓰는 인자 다 지움.
        }, (_, {stage, score}) => {
            /* (base, {stage, score}, ...arg) */
            stage.clear();
            score.clear();
        });
        //여기까지 와서 보니.. 게임은 실제 로직과 화면 등은 외부로부터 상태들을 받아서 호스팅만 해줌.
    }
};
})(SET); //SET 을 인자로 받아서 외부에 전역 변수 SET 이 있더라도 오염되지 않도록 해준다.

APP.init();