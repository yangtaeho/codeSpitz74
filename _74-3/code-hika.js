const textNode = (text, target) =>{
    if(text.length) {
        //target 에 삽입
        target.push({type: 'TEXT', text});
    }
    return '';
};

const parser = input=>{
    const result = {tag:{type:'ROOT', children:[]}}, stacks = []; //스택 루프 처리
	let cursor = 0, stack = result; //스택 루프 처리
	
    do{ //재귀함수를 처리 하기 위해 스택 루프 처리
		let text = '';
        while(cursor < input.length){
            const v = elementNode(input, cursor, text, stack, stacks);
			({cursor, text, stack} = v); //해체할당. 오부젝트의 해체 할당시는 괄호로 열어줌. 있는 cursor 에 대해서는 변경된 값을 할당해줌.
			if(v.isBreak) break;
		}

    }while(stack = stacks.pop()); //스택 루프 처리 // 받아친데서 추가, 수정한 부분
    return result;
};

const elementNode = (input, cursor, text, stack, stacks)=>{
    //함수화할시 해당 함수의 지역 변수는 소비되고 사라지기 때문에 이펙트를 보고해줘야 한다.
    //함수로 변경시 문을 값으로 바꿔야 한다. 외부와 통신하기 위해서...
    
    const char = input[cursor++];
    let isBreak = false; //break 여부를 확인하기 위해 추가된 변수
    if(char === '<'){ //꺾쇠가 등장하는 순간 텍스트 노드가 탄생한다
        //텍스트노드삽입
        text = textNode(text, stack.tag.children);
        if (input[cursor++] !== '/') { //슬래시를 인식한 순간 판단 가능함.
            let name = input.substring(cursor - 1, cursor = input.indexOf('>', cursor));
            const isClose = input[cursor - 1] === '/'; // 받아친데서 추가, 수정한 부분
            if(isClose) { 
				name = name.substr(0, name.length - 1); //여기까지 해서 이름을 얻고 닫는 태그를 확인함.
			}
            //FIXME 어트리뷰트 해소를 한다면 아마도 여기에서!
            const tag = {name, type:'NODE', children:isClose?null:[]}; // 노드를 만들어줬다...
            cursor++;
            stack.tag.children.push(tag); //현재 스택에 노드를 넣어버림. 부모 태그 입장에서는 하위 태그의 복잡도는 관심이 없음.
            if(!isClose){
				stacks.push({tag, back: stack}); //tag 를 넣고 돌아갈 수 있게 현재 스택을 back에 넣어줌.
                isBreak = true; // 컨텍스트 전환을 해줘야 하기 때문에 브레이크를 검. 스택 내부를 검사하기 위해서...
            }
        } else if(stack.tag.name == input.substring(cursor, input.indexOf('>', cursor))){
			stack = stack.back;
			cursor = input.indexOf('>', cursor) + 1; // 받아친데서 추가, 수정한 부분
        } else {
            throw "처리 불가능한 노드";
        }
    } else {
		text += char;
    }

    return {cursor, text, stack, isBreak}; //자기가 변경한 사항을 외부에 보고해주기 위해서 리턴해줌.
};