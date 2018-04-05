var express= require('express');
var app = express();
app.use(express.static('public')); //public 폴더를 정적인 파일이 위치하는 곳으로

app.get('/', function(req, res){
	res.send('Hello home page');
});

app.get('/route', function(req, res){
	res.send('Hello Router, <img src="/public.jpg".>');
});

//get 메소드를 라우터라고 부르고 하는역할이 라우팅(길을 찾는다는말)
app.get('/login', function(req, res){
	res.send('<h1>Login please</h1>');
});


app.listen(3000, function(){
	console.log('Conneted 3000 port!');
});







