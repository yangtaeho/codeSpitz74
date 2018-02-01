const Test = (_=>{
    //private 심볼과 메소드를 가가각 두개씩 구현해 보겠다.
    const field1 = Symbol(), field2 = Symbol(), method1 = Symbol();
    return class{
        constructor(a, b) {
            this[field1] = a;
            this[field2] = b;
        }
        [method1](){}
        action(a) {
            this[method1]();
            this[field1] = a;
        }
    }
})()
//private 을 씀으로서 실수를 완전히 막을 수 있따. (악의적인 추출을 막을 수 있는 것은 아니다. 완전한 pirvate 은 weekMap 을 사용함.)


const t = new  Tet(1, 2);
t[Object.getOwnPropertySymbols(t)[0]]; //private 을 깔 수 있는 유일한 방법...


// map 과 weekmap 의 차이. map 은 key를 문자열로 잡으나 weekmap 은 객체를 키로 잡는다.
// weakMap 이 weak가 붙은 이유는 해당 객체를 생성한 인스턴스와 생명주기를 함꼐 하기 때문이다.. 
const Test2 = (_=> {
    const prop = new WeakMap();
    return class{
        constructor(a, b) {
            const p = prop.set(this, {});
            p.a = a;
            p.b = b;
        }
        //여기에서 완전히 a를 굳혔음. //보안 객체들....
        action(a) {
            const p = prop.get(this);
            p.a = a;
        }
    }
})();