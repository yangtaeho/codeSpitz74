// ==== for main test data ====
const deb = true; //debug
const cmd = 'c';
var dat = {
    a:'<div>test</div>',
    b:'<div>a<a>b</a>c<img/>d</div>',
    //c:'<div class="test clazz" readonly title=test!! style="width:150px;height:50px">test</div>',
    c:'<div class="test clazz" readonly title=test!! style= "width : 150px ;height:50px">test</div>',
    d:'<div style="width:150px;height:50px">test<div><img/>a<a>b</a>c<img/>d</div></div>',
    e:'<div><div>test</div>a<img/>test<div>test2</div><div>test3</div><div>test4</div></div>',
};
//class="test clazz" readonly title=test!! style= "width : 150px ;height:50px"
// ================================================================================================



//logic
const setTextNode = (text,target) => {
    if (text.legnth) {
        //어딘가에 삽입..
        target.push({type:'TEXT',text});
    }
};
const parseAttr = (attrStr) => getAttrList(attrStr); //space.js

const setElementNode =(input, cursor, text, stack, childrenStacks) => {
    let isBreak = false;
    let char = input[cursor++];
    if (char === '<') {
        //시작하는 태그 구간
        deb && console.log(cursor,', input[cursor]=',input[cursor]);
        if (input[cursor] !== '/') {
            setTextNode(text,stack.tag.children); // 기존 노드 처리..
            text = ''; // 새로 시작하므로 리셋

            let tagStr = input.substring(cursor, cursor = input.indexOf('>',cursor));
            deb && console.log(cursor,', tagStr=',tagStr);

            const hasAttr = tagStr.indexOf(' ') > -1;
            let nodeNm = tagStr.substring(0, (hasAttr ? tagStr.indexOf(' ') : tagStr.length));
            let attrStr = hasAttr ? tagStr.substring(tagStr.indexOf(' ') + 1, tagStr.length) : '';
            let children = [];

            // 닫힌 태그 처리 <img/> 등
            const isClose = input[cursor - 1] == '/';
            if (isClose) {
                nodeNm = nodeNm.substr(0,nodeNm.length - 1);
                children = null;
            }
            deb && console.log(cursor,', hasAttr=',hasAttr);
            deb && console.log(cursor,', nodeNm=',nodeNm);
            deb && console.log(cursor,', attrStr=',attrStr);

            const tag = {name:nodeNm, type:'NODE', attr:parseAttr(attrStr), children:children};
            cursor++;

            stack.tag.children.push(tag);
            if (!isClose) {
                childrenStacks.push({tag,back:stack}); //현재 태그를 넣고 돌아갈 태그를 스택에 넣음
                isBreak = true;
            }

            deb && console.log(cursor,', input[cursor]=',input[cursor]);
            //let text = input.substring(cursor, input.indexOf('<',cursor)-1);
            //text = input.substring(cursor, input.indexOf('<',cursor)-1);
        } else {
            const stackTagName = stack.tag.name;
            const currTagName = input.substring(cursor + 1, cursor = input.indexOf('>',cursor));
            deb && console.log(cursor, 'stackTagName', stackTagName, 'currTagName', currTagName);
            if (stackTagName == currTagName) {
                stack = stack.back;
            } else {
                console.log('??');
            }
            deb && console.log(cursor,'end tag ==> input[cursor]=',input[cursor],'text=',text);

        }
    } else {
        text += char;
    }
    deb && console.log('==== run result ====\n' ,' cursor=',cursor ,',char=', char ,',text=',text ,'\n========================');

    return {cursor, text, stack, isBreak};
};

const parser = input => {
    const result = {tag:{type:'ROOT',children:[]}};
    const childrenStacks = [];
    let stack = result;
    let cursor = 0;
    
    deb &&  console.log('==== run start ====\n' 
        ,' input=', input
        ,',input.length=', input.length
    ,'\n========================'
    );
    do {
        let text = '';
        while (cursor < input.length) {
            const ele = setElementNode(input, cursor, text, stack, childrenStacks);

            ({cursor, text, stack} = ele);

            if(ele.isBreak) {
                break;
            }

        }
    } while (stack = childrenStacks.pop());

    return result;
};
