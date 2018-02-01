let Block;
{
    const c, f
    Block = class{
    }
}
//위와 같은 경우는 스코프를 위해서 익명함수 할당이 필요없다. //c,f 를 외부로 부터 감췄음..
//const 인경우는 이게 안된다.
const Block = (_=>{
    const Block = class{

    }
    return Block;
})();
//웬만하면 무조건 const... let이라고 의심되면 두번 세번 고민하라.. 아마 아닐 것이다...