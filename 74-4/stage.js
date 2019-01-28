/**
 * hika
 */
const Stage = class {
    // 180131 제거 
    //생성된 시점에 누구한테 알릴지 알수 없기 때문에 listener 를 받도록 되어있으
    init(listener){
        this.listener = listener;
    }
    clear(){
        this.stage = 0;
        this.next();
    }
    _spped(){this.speed = 500 - 450 * this.stage / Stage.max;}
    _count(){this.count = 10 + 3 * this.stage;}
    // 인자가 없다는 것은 next 에 대한 완전한 권한을 갖고 있다.
    next(){
        if (this.stage++ < Stage.max) {
            this._speed();//한 줄이라도 관리가 필요하면 메소드로 뺴는 것이 좋다.
            this._count();
            //this.listener();
        }
    }
    [Symbol.toPrimitive](hint){
        return this.stage;
        //return `<div>Stage ${this.stage}</div>`; // 이 한줄 만으로 도메인 무결성을 해침... html 로만 구현 가능하게 되어버림.... 도메인 모델로 가려면...
    }
};
// Stage.maxStage = 20;
Stage.max = 20; //교안에 빠진 부분

const Score = class{
    // 180131 제거 
    init(listener){
        this.listener = listener;
    }
    clear(){this.curr = this.total = 0;}
    add(line, stage){//stage란 값을 보내도록 함... 프리미티브값! 
        // flag 로 분기하지 않기 때문에 가장 낮은 결합을 이루고 있다...
        const score = parseInt((stage * 5) * (2 **line)/* 2의 line 제곱이란 의미임 */); //밑값이 점점 높아져서 스코어를 더 받게
        this.curr += score, this.total += score;
        this.listener(); // callable 만 부를 수 있으면 된다...????????
        // callable 의 인스턴스

    }
    [Symbol.toPrimitive](hint){
        // return `<div>Score ${this.curr} / ${this.total}</div>`; // 이 한줄 만으로 도메인 무결성을 해침... html 로만 구현 가능하게 되어버림.... 도메인 모델로 가려면...
        return `${this.curr},${this.total}`; // 180131 도메인 무결성 해치는 부분을 제거.
    }
};