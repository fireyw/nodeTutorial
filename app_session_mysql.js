var express= require('express');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);

var bodyParser= require('body-parser');
var app = express();

var options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '111111',
    database: 'o2'
};

var sessionStore = new MySQLStore(options);  //fileStore와 다르게 options이 꼭 필요하

app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));


var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser);

app.get('/auth/logout', function(req, res){
    delete req.session.displayName;  //session delete (js command)

    req.session.save(function(){ //세션 저장 전에 redirect를 방지하기 위해 삽입
        res.redirect('/welcome');
    });
});

app.post('/auth/login', function(req, res){
    var user= {
        username:'fireyw',
        pwd:'1111',
        displayName:'용우동'
    };

    var uname=req.body.username;
    var pwd= req.body.password;

    if(uname==user.username && pwd==user.pwd){
        req.session.displayName=user.displayName;
        req.session.save(function(){ //세션 저장 전에 redirect를 방지하기 위해 삽입
            res.redirect('/welcome');
        });

    }else {
        res.send('who are you? <a href="/auth/login">login</a>');
    }
});

app.get('/welcome', function(req, res){
    if(req.session.displayName){
        res.send(`<h1>Hello ${req.session.displayName}</h1> 
                  <a href="/auth/logout">logout</a>
                  `);
    }else{
        res.send(`<h1>welcome</h1>
                  <a href="/auth/login">login</a>  
        `);
    }
});

app.get('/auth/login', function(req, res){
   var output=`
   <form action='/auth/login' method='post'>
   <p>
        <input type='text' name='username' placeholder='username'>
   </p>
   <p>
        <input type='password' name='password' placeholder="password">
   </p>
   <p>
        <input type="submit">
    </p>
    </form>
   `;
   res.send(output);
});

app.get('/count', function(req, res){
    if(req.session.count){
        req.session.count++;
    }else{
        req.session.count=1
    }
   res.send('count : ' + req.session.count);
});


app.listen(3000, function(){
    console.log('3000 port start');
});