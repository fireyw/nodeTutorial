var express= require('express');
var bodyParser = require('body-parser');
var fs= require('fs');

var OrientDB = require('orientjs');
var server = OrientDB({
    host:       'localhost',
    port:       2424,
    username:   'root',
    password:   '111111',
    name: 'o2'
});
var db = server.use('o2');


var app = express();
app.locals.pretty = true; //source preey align
app.set('view engine', 'jade');
app.set('views', './views_orientdb'); //render 설정
//app.use(bodyParser.urlencoded()); //use 기능을 붙인다고 생
app.use(express.static('public')); //public 폴더를 정적인 파일이 위치하는 곳으로

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/topic/new', function(req, res){
    fs.readdir('data', function(err, files) {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.render('view', {topics:files});
    });
});

app.get(['/topic', '/topic/:id'], function(req, res){
	var sql="select from topic";
	db.query(sql).then(function(results){

		var id = req.params.id;
		if(id){
            var sql="select from topic where @rid=:rid";
            db.query(sql, {params:{rid:id}}).then(function(topic){
                res.render('view', {topics:results, topic:topic[0]});
            });
		}else{
            res.render('view', {topics:results});
		}


	})
});

app.post('/topic', urlencodedParser, function(req, res){
    var title=req.body.title;
    var des= req.body.des;

    fs.writeFile('data/'+title, des, function(err){

        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
		//res.send('success');
		res.redirect('/topic/' + title);
	})
})


app.get('/form', function(req,res){
	res.render('form');
});

app.get('/form_receiver', function(req, res){
	console.log('get');
	var title=req.query.title;
	var des=req.query.descryption;

	res.send('get : ' + title + ',' + des);
});

app.post('/form_receiver', urlencodedParser,function(req, res){
	console.log('post');
	var title=req.body.title;
	var des= req.body.descryption;

	res.send('post : ' + title + ',' + des);
});

/*app.get('/topic/:id', function(req, res){
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
});*/

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







