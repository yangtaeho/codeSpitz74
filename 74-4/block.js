//Object.assign --> 인자를 넣어줌...
// 일es
// const Block = class{
//     constructor(color)
//     left()
//     right()
//     getBlock()
// };

// 초기 1
// const Block = class{
//     constructor(color) {Object.assign (this, {color, blocks,raotate:0});}
//     left() {if(--this.rotate < 0) this.rotate = 3;} //돌리는 각도를 top -> right -> bottom -> left 0,1,2,3 으로 표현... css 처럼...
//     right() {if(++this.rotate > 3) this.rotate = 0;}
//     //getBlock() {throw 'override!';} //override 하지 안읂 getBlock 은 쓸 수 없다...
//     getBlock() {color, blocks 와 네 개의 배열 받아오도록 처리함...} //override 하지 안읂 getBlock 은 쓸 수 없다...
// };
// const blocks = [class extends Block, ....]; //팩토리 패턴을 대체하는 구현...

// 개선 
const Block =(_=>{
    //파싱을 해줌
    const s =v=>v.split(',').map(v=>v.split('|').map(v=>v.split('')));
    const c =(c,b)=>class extends Block{constructor(){super(c, b);}};  //Block 이 쓰이고 있지만 함수안에 있기 때문에 문제없이 컴파일?된다.
    const Block = class{
        static block(){
            return new (this.blocks[parseInt(Math.random() * this.blocks.length)]);
        }
        constructor(color,blocks) {
            Object.assign (this, {color, blocks:s(blocks),raotate:0}); //문자열 파싱하여 클래스로 만드는 함수를 통해서 구현
        }
        left() {if(--this.rotate < 0) this.rotate = 3;} //돌리는 각도를 top -> right -> bottom -> left 0,1,2,3 으로 표현... css 처럼...
        right() {if(++this.rotate > 3) this.rotate = 0;}
        //getBlock() {throw 'override!';} //override 하지 안읂 getBlock 은 쓸 수 없다...
        get block() {color, this.blocks}
    };
    // 값 기반 언어에서는 중복을 최대한 줄일 수 있다는 것이 장점이다.
    // 중복되는 클래스를 프리머티브 데이터 바꿔서 파싱할 수 있도록...
    // 매직넘버는 줄이는거 상수로 바꾸는 거 다 과정일 뿐이고 외부에서 가져오는 것까지 해야 끝난다.
    // 원하는 블럭을 데이터  형태로 바꿔서 한 번에 클래스로 만들어 오도록 함.
    Block.blocks = [
        '00c3ed-1|1|1|1,1111,1|1|1|1,1111',
        'FBD72B-11|11,11|11,11|11,11|11',
        'B84A9C-010|111,10|11|10,111|010,01|11|01',
        '00FF24-011|110,10|11|01,011|110,10|11|01',
        'FF1920-110|011,01|11|10,110|011,01|11|10',
        '2900FC-100|111,11|10|10,111|001,01|01|11',
        'FD7C31-001|111,10|10|11,111|100,11|01|01'
    ].map(v=>c(...v.split('-'))); //클래스를 만들어주는 아이에게 문자열을 보냄.
    return Block;
})();//18-01-31 지난 코드에서 확장됨.

// 중암점이 아니라 회전 기준점으로 가지고 회전하도록 한다...!
