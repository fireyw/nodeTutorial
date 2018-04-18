var express= require('express');
var bodyParser = require('body-parser'); //post방식에서 body tag  사용을 위함
const util = require('util');

var mysql      = require('mysql');
var db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '111111',
    database : 'o2'
});

db.connect();
/*

var sql='select * from topic';

connection.query(sql, function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', fields);
});

connection.end();

*/
var app = express();
app.locals.pretty = true; //source pretty align
app.set('view engine', 'jade');
app.set('views', './views_mysql'); //render 설정
//app.use(bodyParser.urlencoded()); //use 기능을 붙인다고 생
app.use(express.static('public')); //public 폴더를 정적인 파일이 위치하는 곳으로

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/topic/add', function(req, res){
    var sql="select * from topic";

    db.query(sql, function (error, topics, fields) {
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
    var sql="insert into topic(title, des, author) values(?, ?, ?)";

    console.log('post topic add')
    db.query(sql, [title,des,author],function(error, results, fields){
        console.log(results);
        if(results===0){
            console.log('No insert');
        }
        res.redirect('/topic/'+ results.insertId);
    })
})

app.get('/topic/:id/edit', function(req, res) {
    console.log('edit get');
    var sql= "select * from topic"
    var id = req.params.id;

    db.query(sql, function(err, topics, fields){
        var sql = "select * from topic where id=?";
        db.query(sql, [id],function (err, topic, fields) {
            res.render('edit', {topics: topics, topic:topic[0]});
        })
    })
})

app.post('/topic/:id/edit', urlencodedParser, function(req, res) {
    console.log('edit post2');

    var sql="update topic set title=?, des=?, author=? where id=?";
    var title=req.body.title;
    var des=req.body.des;
    var author=req.body.author;
    var id=req.params.id; //get방식에서 사용하는것으로 Post에서도 사용 가능
    console.log(id);
      db.query(sql,[title, des, author, id], function(err, topics, fields){
          if(topics===0){
              console.log('No update');
          }
          res.redirect('/topic/'+id);
      })
})

app.get('/topic/:id/delete', function(req, res){
    var sql= "select * from topic"
    var id = req.params.id;

    db.query(sql, function(error, topics){
        var sql = "select * from topic where id=?";
        db.query(sql, [id], function (error, topic) {
            res.render('delete', {topics: topics, topic:topic[0]});
        })
    })
})

app.post('/topic/:id/delete', urlencodedParser, function(req, res){
    var sql="delete from topic where id=?";
    var id=req.params.id;
    console.log('delete start id : ' + id );

    db.query(sql, [id], function(error, results, fields){
        if(results===0){
            console.log('No delete');
        }
        res.redirect('/topic');
    })
})

app.get(['/topic', '/topic/:id'], function(req, res){
	var sql="select * from topic"
    var id=req.params.id;

	console.log('mysql id view : ' + id);

	db.query(sql, function (error, results, fields) {

		var id = req.params.id;
		if(id){
            var sql="select * from topic where id=?";
            db.query(sql, [id], function (error, topic) {

                /*console.log('all t : '+util.inspect(topic, false, null))
                console.log('all f: '+util.inspect(fields, false, null))*/

                if(error){
                    console.log(error)
                }else {
                    res.render('view', {topics: results, topic: topic[0]});
                }
            });
		}else{
            res.render('view', {topics:results, id:id});
		}
	})
});


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







