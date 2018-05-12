var express= require('express');
var session = require('express-session');
var FileStore = require('session-file-store')(session); //require 하면서 인자로 session 전달
var bodyParser= require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var app = express();


app.use(session({
    store: new FileStore(),
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser);

app.get('/auth/logout', function(req, res){
    delete req.logout();  //session delete (js command)

    res.send(`<h1>welcome</h1>
                  <a href="/auth/login">login</a>  
        `);
});

var user= {
    username:'fireyw',
    pwd:'1111',
    displayName:'용우동'
};

passport.serializeUser(function(user, done) {
    //done(null, user.id);  //식별자를 전달하는데 여기에선 id 가 없어서 username으로 수정
    console.log("serializeUser", user);
    done(null, user.username);  //done이라는 이름으로 세션에 등록하는 과
});

passport.deserializeUser(function(id, done) {//serialize 함수를 통해 세션에 등록된 정보가 재로그인되면 여기가 호출됨
    console.log("deserializeUser", id);
    if(user.username==id){
        done(null, user);
    }
    /*User.findById(id, function(err, user) {
        done(err, user);
    });*/
});


passport.use(new LocalStrategy(
    function(username, password, done){

        var uname=username;
        var pwd= password;

        if(uname==user.username && pwd==user.pwd){
            console.log("LocalStrategy", user);
            done(null, user); //serialize에서 done이란 함수가 실행되기로 약속되어있따
        }else {
            done(null, false );
        }
    }
));
app.post('/auth/login',
        passport.authenticate('local',
            { successRedirect: '/welcome',
              failureRedirect: '/auth/login',
              failureFlash: false })
);

app.get('/welcome', function(req, res){
    if(req.user&& req.user.displayName){
        res.send(`<h1>Hello ${req.user.displayName}</h1> 
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