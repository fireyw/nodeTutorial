var express=require('express');
var cookieParser=require('cookie-parser');
var app=express();

app.use(cookieParser());
app.get('/count', function(req, res){
    if(req.cookies.count)
        count=parseInt(req.cookies.count);
    else
        count=0;
    var count=count+1;

    res.cookie('count ', count);
    res.send('count: ' + req.cookies.count);
})

app.listen(3000, function(){
    console.log('3000 call');
})

