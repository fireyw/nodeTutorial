var express= require('express');
var session = require('express-session');
var FileStore = require('session-file-store')(session); //require 하면서 인자로 session 전달

var bodyParser= require('body-parser');
var app = express();

app.use(session({
    store: new FileStore(),
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser);

app.get('/auth/logout', function(req, res){
    delete req.session.displayName;  //session delete (js command)

    res.send(`<h1>welcome</h1>
                  <a href="/auth/login">login</a>  
        `);
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
        res.redirect('/welcome');
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


app.listen(3003, function(){
    console.log('3003 port start');
});