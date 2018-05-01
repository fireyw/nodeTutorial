function _sum(a,b){
    return a+b;
}
//require 는 module.exports 로 약속함
module.exports =  function(a, b){
    return _sum(a,b);
};