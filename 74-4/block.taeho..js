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
    const c =(c,b)=>class extends Block{constructor(){super(c,b);}}; 
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
    // 중복되는 클래스를 프리머티브 데이터 바꿔서 파싱할 수 있도록...
    // 매직넘버는 줄이는거 상수로 바꾸는 거 다 과정일 뿐이고 외부에서 가져오는 것까지 해야 끝난다.
    // 원하는 블럭을 데이터  형태로 바꿔서 한 번에 클래스로 만들어 오도록 함.
    Block.blocks = [
        '00c3ed-1|1|1|1,1111,1|1|1|1,1111',
    ].map(v=>c(...v.split('-'))); //클래스를 만들어주는 아이에게 문자열을 보냄.
    return Block;
})();//18-01-31 지난 코드에서 확장됨.

//이런 형태로 blocks 를 정의
//팩토리 패턴을 대체하는 구현...
//const blocks = [class extends Block, 
const blocks = [ 
    // 개선 1
    //I - hika 색깔 연빨강 f8cbad 
    class extends Block{
        constructor(){super('#FF1920',
            [[[1],[1],[1],[1]],
            [[1,1,1,1]],
            [[1],[1],[1],[1]],
            [[1,1,1,1]]]
        );}
    },
    //O
    class extends Block{
        constructor(){super('#FBD72B',[
            [[1,1],[1,1]],
            [[1,1],[1,1]],
            [[1,1],[1,1]],
            [[1,1],[1,1]]
        ]);}
    },
    //T - hika 색깔 연노랑 ffe699
    class extends Block{
        constructor(){super('#B84A9C',[
            [[0,1,0],[1,1,1]],
            [[1,0],[1,1],[1,0]],
            [[1,1,1],[0,1,0]],
            [[0,1],[1,1],[0,1]]
        ]);}
    },
    //S
    class extends Block{
        constructor(){super('#00FF24',[
            [[0,1,1],[1,1,0]],
            [[1,0],[1,1],[0,1]],
            [[0,1,1],[1,1,0]],
            [[1,0],[1,1],[0,1]]
        ]);}
    },
    //Z
    class extends Block{
        constructor(){super('#00C3ED',[
            [[1,1,0],[0,1,1]],
            [[0,1],[1,1],[1,0]],
            [[1,1,0],[0,1,1]],
            [[0,1],[1,1],[1,0]]
        ]);}
    },
    //J
    class extends Block{
        constructor(){super('#2900FC',[
            [[1,0,0],[1,1,1]],
            [[1,1],[1,0],[1,0]],
            [[1,1,1],[0,0,1]],
            [[0,1],[0,1],[1,1]]
        ]);}
    },
    //L
    class extends Block{
        constructor(){super('#FD7C31',[
            [[0,0,1],[1,1,1]],
            [[1,0],[1,0],[1,1]],
            [[1,1,1],[1,0,0]],
            [[1,1],[0,1],[0,1]]
        ]);}
    }
];


// 중암점이 아니라 회전 기준점으로 가지고 회전하도록 한다...!

// 초기 1 
// class extends Block{
//     constructor(){super('#f8cbad');}
//     getBlock(){
//         return this.rotate % 2 ?
//         [[1],[1],[1],[1]] :
//         [[1,1,1,1]];
//     }
// }
// class extends Block{
//     constructor(){super('#ffe699');}
//     getBlock(){
//         switch (key) {
//         case 0: return [[0,1,0],[0,1,0]];
//         case 1: return [[1,0],[1,1],[1,0]];
//         case 2: return [[1,1,1],[0,1,0]];
//         case 3: return [[0,1],[1,1],[0,1]];
//         }
//     }
//}