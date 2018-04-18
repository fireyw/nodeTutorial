var express= require('express');
var bodyParser = require('body-parser'); //post방식에서 body tag  사용을 위함
var fs= require('fs');  //파일 입출력

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
app.locals.pretty = true; //source pretty align
app.set('view engine', 'jade');
app.set('views', './views_orientdb'); //render 설정
//app.use(bodyParser.urlencoded()); //use 기능을 붙인다고 생
app.use(express.static('public')); //public 폴더를 정적인 파일이 위치하는 곳으로

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/topic/add', function(req, res){
    var sql="select from topic";
    db.query(sql).then(function(topics){
        if (topics.length===0) {
            console.log('There is no record');
            res.status(500).send('Internal Server Error');
        }
        res.render('add', {topics:topics});
    });
});

app.post('/topic/add', urlencodedParser, function(req, res){
    var title=req.body.title;
    var des= req.body.des;
    var author= req.body.author;
    var sql="insert into topic(title, des, author) values(:title, :des, :author)";

    db.query(sql, {params: {
            title: title,
            des: des,
            author: author
            }
    }).then(function(results){
        if(results===0){
            console.log('No insert');
        }
        console.log(results);
        //res.redirect('/topic/'+ encodeURIComponent(results[0]['@rid']));
        res.send(results);
    })
})

app.get('/topic/:id/edit', function(req, res) {
    console.log('edit get');
    var sql= "select from topic"
    var id = req.params.id;

    db.query(sql).then(function(topics){
        var sql = "select from topic where @rid=:rid";
        db.query(sql, {params: {rid: id}}).then(function (topic) {
            res.render('edit', {topics: topics, topic:topic[0]});
        })
    })
})

app.post('/topic/:id/edit', urlencodedParser, function(req, res) {
    console.log('edit post2');

    var sql="update topic set title=:title, des=:des, author=:author where @rid=:rid";
    var title=req.body.title;
    var des=req.body.des;
    var author=req.body.author;
    var id=req.params.id; //get방식에서 사용하는것으로 Post에서도 사용 가능
    console.log(id);
      db.query(sql, {params: {
              title: title,
              des: des,
              author: author,
              rid:id
          }
      }).then(function(topics){
          if(topics===0){
              console.log('No update');
          }
          res.redirect('/topic/'+encodeURIComponent(id));
      })
})

app.get('/topic/:id/delete', function(req, res){
    var sql= "select from topic"
    var id = req.params.id;

    db.query(sql).then(function(topics){
        var sql = "select from topic where @rid=:rid";
        db.query(sql, {params: {rid: id}}).then(function (topic) {
            res.render('delete', {topics: topics, topic:topic[0]});
        })
    })
 /*   var sql="delete from topic where @rid=:rid";
    var id=req.params.id;
    console.log('delete start id : ' + id );

    db.query(sql, {param: {rid:id}}).then(function(results){
        if(results===0){
            console.log('No delete');
        }
        res.redirect('/topic');
    })*/
})

app.post('/topic/:id/delete', urlencodedParser, function(req, res){
    var sql="delete from topic where @rid=:rid";
    var id=req.params.id;
    console.log('delete start id : ' + id );

    db.query(sql, {params: {rid:id}}).then(function(results){
        if(results===0){
            console.log('No delete');
        }
        res.redirect('/topic');
    })
})

app.get(['/topic', '/topic/:id'], function(req, res){
	var sql="select from topic"

	db.query(sql).then(function(results){

		var id = req.params.id;
		if(id){
            var sql="select from topic where @rid=:rid";
            db.query(sql, {params:{rid:id}}).then(function(topic){
                res.render('view', {topics:results, topic:topic[0]});
            });
		}else{
            res.render('view', {topics:results, id:id});
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


app.get('/topic/:id/:mode', function(req, res){
	res.send(req.params.id + ',' + req.params.mode);
});


app.get('/template', function(req, res){
	res.render('temp', {time:Date(), title:'jade test'}); //객체 전달
});


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







