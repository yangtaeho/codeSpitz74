// ==== space test ====
let logL = {};
logL.deb = false;
logL.inf = false;
const attrStrTest = 'class= "test clazz" readonly title=test!! class="test clazz" style= "width : 150px ;height:50px"';

//getAttrList(attrStrTest);


const getAttrList = (attrStr) => {
    const TYPE_KEY = 'KEY';
    const TYPE_VALUE = 'VAL';
    const attr = JSON.stringify({key:'',value:''});
    const itemTemp = JSON.stringify({type:'',value:''});
    

    // ==== base method ========

    const setItem = (type,val) => {
        const item = JSON.parse(itemTemp);
        item.type = type;
        item.value = val;
        return item;
    };

    const setKeyStack = (char,text,stack,cursor) => {
        const tempCharList = text.split(' ');
        if(tempCharList.includes("") || tempCharList.length > 1){
            const keyList = tempCharList.filter((val)=>{
                if(val == '') {
                    return false;
                }
                return val;
            },[]);
            keyList.map((val)=>{
                logL.inf && console.log(cursor,'SET KEY s ====> ', char, val);
                stack.push(setItem(TYPE_KEY,val));
            },stack);
        } else {
            logL.inf && console.log(cursor,'SET KEY o ====> ', char, text);
            stack.push(setItem(TYPE_KEY,text));
            //cursor += text;
        }
        text = '';
        return {char,text,stack,cursor};
    };

    /**
     * 제거한 space 갯수만큼 cursor 를 전진시킨다.
     */
    const getCorrectCursor = (str,cursor) => {
        if (str[cursor] !== ' ') {
            //logL.deb && console.log(cursor,'getCorrectCursor throw',str[cursor],str);
            str = str.substring(cursor,str.length);
            return {cursor,str};
        }
        for(let i = cursor; cursor < str.length; i++) {
            //logL.deb && console.log(cursor,'getCorrectCursor befor',str,i,str.length);
            if (str[i] === ' ') {
                const tstr = str.substring(i,str.length);
                //logL.deb && console.log(cursor,'getCorrectCursor ing..',tstr,i);
            } else {
                cursor = i;
                str = str.substring(cursor,str.length);
                //logL.deb && console.log(cursor,'getCorrectCursor break',str,i);
                break;
            }
        }
        //logL.deb && console.log(cursor,'getCorrectCursor done',str);
        return {cursor:cursor,tempT:str};
    };

    const getAttrVal = (cursor,attrStr,delim) => {
        //logL.deb && console.log(cursor,'getAttrVal req',attrStr[cursor],delim,"currAttr",attrStr.substring(cursor));
        const currAttr = attrStr.substring(cursor+1, cursor = attrStr.indexOf(delim,cursor+1));
        //logL.deb && console.log(cursor,'getAttrVal res',attrStr[cursor],delim,currAttr,attrStr.substring(cursor));
        return {cursor,currAttr};
    };

    // ================

    const parseKeyValStack = (attrStr) => {
        let text = '';
        let cursor = 0;
        let stack = [];
        while (cursor < attrStr.length) {
            
            //console.log('attrStr[cursor] : ', attrStr[cursor]);
            
            let char = attrStr[cursor];
            
            if (char === '=') {
                //logL.deb && console.log(cursor,'setKeyStack before', char, text/* , JSON.stringify(stack) */);
                const v = setKeyStack(char,text,stack,cursor);
                ({char,text,stack,cursor} = v);
                //logL.deb && console.log(cursor,'setKeyStack after', char, text/* , JSON.stringify(stack) */);
        
                let nextChar = attrStr[++cursor];
                //logL.deb && console.log(cursor,'get nextChar', nextChar);
        
                // 공백인 경우에 대한 처리
                var tempT, tempAddCursor;
                if (nextChar === ' ') {
                    //공백 문자에 대해 커서 당기는 처리
                    //logL.deb && console.log(cursor,'getCorrectCursor befor',nextChar, attrStr[cursor]);
                    const v = getCorrectCursor(attrStr,cursor);
                    ({cursor} = v);
                    nextChar = attrStr[cursor];
                    //logL.deb && console.log(cursor,'getCorrectCursor after',nextChar, attrStr[cursor]);
                }
        
                if (nextChar === '"' || nextChar === '\'') {
                    //logL.deb && console.log(cursor,'proc.    quotation ====> ', char, nextChar, attrStr.substring(cursor, attrStr.length));
        
                    const v = getAttrVal(cursor,attrStr,nextChar);
                    const currAttr = v.currAttr;
                    cursor = v.cursor;
                    logL.inf && console.log(cursor,'SET VALUE """ ====> ', char, currAttr);
                    stack.push({type:TYPE_VALUE,value:currAttr});
                } else {
                    //logL.deb && console.log(cursor,'proc. no quotation ====> ', char, nextChar, attrStr.substring(cursor, attrStr.length));
        
                    const nextCursor = attrStr.indexOf(' ',cursor);
                    const currAttr = attrStr.substring(cursor, nextCursor);
                    cursor = nextCursor;
                    logL.inf && console.log(cursor,'SET VALUE " " ====> ', char, currAttr);
                    stack.push({type:TYPE_VALUE,value:currAttr});
                }
            } else {
                text += char;
            }
            cursor++;
        }
        return stack;
    };

    const main = (attrStr) => {
        
        let attrs = []; //최종 결과 넣을 곳
        
        const stack = parseKeyValStack(attrStr);
        //console.log(stack);//logL.debug
        for (let i = 0, len = stack.length; i < len; i++) {
            const item = stack[i];
            ////logL.deb && console.log('최종 파스... item', i, item);
            let res = JSON.parse(attr);
            if (item.type == TYPE_VALUE) {
                console.log('아마도 에러..?');
                throw '형이 여기서 왜 나와?';
            }
            if (item.type == TYPE_KEY) {
                res.key = item.value;
                const nextItem = stack[i+1];
                if (nextItem.type == TYPE_VALUE) {
                    res.value = nextItem.value;
                    i++;
                } else {
                    res.value = true; //우항이 없는 속성은 true 처리
                }
            }
            ////logL.deb && console.log('최종 파스...  res', i, res);
            attrs.push(res);
        }
        logL.deb && console.log("result ============\n",attrs);
        return attrs;
    };

    return main(attrStr);
};


const getAttrListSumm = attrStr => {
    /**
	 * https://gist.github.com/hotsummmer/bb0057923026d933ad3ba1dc88d19a94
	 */
	const attrs = attrStr.match(/(\w+)(?:=(["'])(.*?)\2)?/g);
	let res = attrs.reduce((result, attr)=>{
		let key = attr, value = true;
		if(attr.includes("=")) [key, value] = attr.replace(/\"/g, "").split("=");
		result.push({key, value})
		return result;
    }, []);
    
	// FIXME 콜론 혹은 새미 콜론으로 감싸지 않은 속성은 제대로 처리 못함
	// FIXME 띄어쓰기 있는 경우에 대한 처리 안 됨..
    
    return res;
};
const getAttrListHenrik = attrStr => {    
    let res = {};

    /**
     * https://github.com/HenrikJoreteg/html-parse-stringify/blob/master/lib/parse-tag.js
     */
    const attrRE = /([\w-]+)|['"]{1}([^'"]*)['"]{1}/g;
	let key = '';
	let i = 0;
	attrStr.replace(attrRE, function (match) {
		if (i % 2) {
			key = match;
		} else {
			res[key] = match.replace(/['"]/g, '');
		}
		i++;
	});
	// FIXME 우항이 없는 속성에서부터 꼬임
    // FIXME 콜론 혹은 새미 콜론으로 감싸지 않은 속성은 제대로 처리 못함
    
    return res;
};