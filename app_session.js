var express= require('express');
var session= require('express-session');
var bodyParser= require('body-parser');
var sha256=require('sha256');
var bkfd2Password = require("pbkdf2-password");
var hasher = bkfd2Password();
var app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false });
var salt="!@#12312";
app.use(urlencodedParser);
//app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'keyboard cat',
    saveUninitialized: true,
    resave: false
    //cookie: { secure: true }
}));

app.get('/auth/logout', function(req, res){
    delete req.session.displayName;  //session delete (js command)

    res.send(`<h1>welcome</h1>
                  <a href="/auth/login">login</a>  
        `);
});

app.post('/auth/login', function(req, res){
    var user= {
        username:'fireyw',
        pwd:'D8bS8+C+Pj89bMs7N+BDnhgDcIixkqgaRCMVw9buNKckgy1yuI9i+oRsPI3wZcp4v88Bo2o4gRbZTgWYiLI0V3OzzhISC8UdWEF2CwXcc43r8YnMKft4DlAKyfb6/EwqWnbkCwaj2qESh70OgxA5m0iVushg+OxqahXiwcjYXPo=',
        salt: 'sBlEshImGUA6rYL8VughbrRxyojPJAbfMbx9UQ+SlexbwxjWuDeb0AtdPrgL/stoM7fVsUu325mIODbsgpgO0Q==',
        displayName:'용우동'
    };

    var uname=req.body.username;
    var pwd= req.body.password;

    if(uname ==user.username){
        var opts = {
            password: pwd,
            salt:user.salt
        };

        return hasher(opts, function(err, pass, salt, hash) {
           console.log('hash: ' +hash);
           console.log('user.pwd ' + user.pwd);

           if(hash==user.pwd){
                req.session.displayName=user.displayName;
                req.session.save(function(){
                    res.redirect('/welcome');
                });

           }else{
                res.send('/auth/login');
           }
        });
    }

/*    if(uname==user.username && sha256(pwd+user.salt)==user.pwd){
        req.session.displayName=user.displayName;
        res.redirect('/welcome');
    }else {
        res.send('who are you? <a href="/auth/login">login</a>');
    }*/
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