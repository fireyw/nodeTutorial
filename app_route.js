var express=require('express');
var app=express();

var p1=require('./routes/p1')(app,'15'); //require('./routes/p1')가 가리키는건 p1.js 에서 return route이다
                                    //route에서 필요한 변수를 이렇게 넘길 수 있다

app.use('/p1', p1);

var p2=require('./routes/p2')(app);

app.use('/p2', p2);

app.listen(3003, function(){
    console.log('connect 3003 port');
});
