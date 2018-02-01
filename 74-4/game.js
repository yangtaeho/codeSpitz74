//임시 객체로 열거형을 만들고 실제 클래스 선언시 처리해줌.
const s = {};
'title,stageIntro,play,dead,stageClear,clear,ranking'.split(',').forEach(v=>s[v] = Symbol());
//게임의 상태를 명확하게 표현해주게 함.
const Game = class {
    [s.title](){
        this.stage.clear();
        this.score.clear();
    }
    [s.stageIntro](){
        this._render(this.stage.stage);
    }
    [s.play](){
        const data = new Data(this.row, this.col);
        //... //TODO 180131 다음 시간 6교시에 할 것!!!!
        this._render(data);//update - 패널과 게임의 대화
        this._render(Block.block());//next - 패널과 게임의 대화
    }
    [s.dead](){}
    [s.stageClear](){}
    [s.clear](){}
    [s.ranking](){}
};
//entries가 키밸류 쌍으로 분리해준 것을 게임에게 넣어줌. 
Object.entries(s).forEach(([k,v])=>Game[k]=v);
//forEach 는 c 코드니까.... 무한대로 빨라질 수 있다... 따라서 for 보다 빠르다.. 표준쓰는게 이긴다...
//지금 당장 퍼포먼스가 문제가 되든 말든 네이티브 함수로 바뀐다... 
//문 한 줄 한 줄이 객체로 바뀜... 서스팬드 하기 위해서...
//ec 스펙은 안정화되면 네이티브로 다 내리기 때문에 무조건 표준을 써주는게 좋다.
Object.freeze(Game);