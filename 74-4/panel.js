const Panel = class{
    // 클래스 타입을 나눌 필요가 없기 ㄷ때문에 서브클래스는 하지 않았다.
    //초기화와 렌더만 함.... 이 것을 함수로 위임할 것이 필요하다.


    //패널은 반드시 게임을 알고 이썽야 하기 떄문에 뷰는 게임을 알고 있어야 하기 떄문에 인자를 받음.
    //렌더러를 받고 game을 받아서 init을 한다는 제약 사항이 생긴것...
    //리턴 값으로 베이스 엘리먼트를 리턴한다.
    static get(game, init, render){
        const p = new Panel();
        return p.init(game, init(game), render), p;
    }
    //위임 클래스 기법... 
    //서브클래스를 받지 않고 init 할 때 
    //람다를 받아서 이닛을 어떻게 할지를 넘겨 받아서 처리...
    //개별 수행하고 잇는 아ㅣ들의 행동만 제어하고 싶어서 함수를 인자로 받아서 ` 처리하고 있음.


    // init 과 static get 의 인자가 init(game) 한 값은 base 여야 한다고  강제하고 있음.
    init(game, base, r){
        Object.assign(this, {game, base, r});
    }
    //형적 안정화를 얻으면서.. 
    //렌더를 어떻게 할지를 외부에서 가져올 수 있도록 처리... 
    render(v){this.r(this.game, v);} //람다를 이용한 서브 클래싱★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆
};