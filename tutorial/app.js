var express= require('express');
var app = express();
app.locals.pretty = true; //source preey align
app.set('view engine', 'jade');
app.set('views', './views');
app.use(express.static('public')); //public 폴더를 정적인 파일이 위치하는 곳으로

app.get('/topic/:id', function(req, res){
	var topics=['javascript is ',
	'node js is',
	'express is'];

	var output =`
		<a href='/topic?id=0'>javascript</a><br>
		<a href='/topic?id=1'>node</a><br>
		<a href='/topic?id=2'>express</a><br>
		${topics[req.params.id]}
		`;

	res.send(output);
});

app.get('/topic/:id/:mode', function(req, res){
	res.send(req.params.id + ',' + req.params.mode);
});


app.get('/template', function(req, res){
	res.render('temp', {time:Date(), title:'jade test'}); //객체 전달
});


app.get('/', function(req, res){
	res.send('Hello home page');
});

app.get('/dynamic', function(req, res){
	var lis='';
	for(var i=0;i<5;i++){
		lis = lis + '<li>conding</li>';
	}
	var time = Date();
	var output = `
				<!doctype html>
				<html>
					<body>
						dynamic test222
						<ul>
						${lis} ${time}
						</ul>
					</body>
				</html>
				`
	res.send(output);
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







