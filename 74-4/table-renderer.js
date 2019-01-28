const TableRenderer = (_=>{
    //앞으로 function 은 쓰지마...!
    const el = v=>document.createElement(v);
    const add = (p, c)=> p.appendChild(typeof c == 'string' ? el(c) : c);
    const back = (s, v)=>{s.backgroundColor = v;};

    //table renderer 테스트 언급... data.all 을 이용한 것..!..
    //렌더러는  게임은 1도 관심없는 것.. 앱은 예쁜 데이터 뷰어이다 라고 인식해야 함. 데이터가 그려지는 것은 렌더러가 알아서 한다.
    //pwa, spa 든 렌더러와 데이터를 완전히 분리할 수 있을 수록.....!
    //리액트의 증분 계산 렌더만을 활용하는게 더 쉽고 유지보수 용이하지 않을까???
    //render
    const TableRenderer = class extends Renderer{
        constructor(col, row, back, style){ //외부에서 style 을 지정해주고 싶기 때무에 style 인자를 추가함.( 테이블의 특성이므로 여기서 갖공 있고 부모는 모름!)
            super(col, row, el('table'), back); //base 로 쓸 테이블...
            const {base, blocks} = this;
            //////
            // 추상화가 있는 경우에는 추상화 계층간의 대화가 아주 중요하다...

            //자식이 부모의 서비스를 이용해 먹는 느낌의 코드 (Renderer 를 알아야 쓸 수 가 있다...)
            // base.style.cssText = style; //border 처리 등...

            // let i = row;
            let {row:i} = this;
            while(i--){
                // const tr = base.appendChild(el('tr')); // appendChild는 결과값으로 인자를 넘겨줌..
                const tr = add(base, 'tr');
                const curr = [];
                let j = col;
                blocks.push(curr);
                // while(j--) curr.push(tr.appendChild(el('td')).style);
                while(j--) curr.push(add(tr, 'td').style);

                // 도메인 지식이 난무한다... 즉... 이거 잘 아는 친구에게 위임 가능.... 이게 분리의 장점...
            }
            // document.body.appendChild(base);
            // console.log('append done'); //debug
        }
        clear(){
            this.blocks.forEach(curr=>curr.forEach(s=>back(s, this.back)));
        }
        _render(v){
            //this.blocks.forEach((curr,i) => curr.forEach((s,j)=>back(s, [i][j])));
            this.blocks.forEach((curr,i) => curr.forEach(
                (s,j)=>back(s, v[i][j] || this.back)
            ));
        }
    };
    return TableRenderer;
})();