var md5= require('md5');
var sha256= require('sha256');
var salt='!@#!@#!';
var bkfd2Password = require("pbkdf2-password");
var hasher = bkfd2Password();
var opts = {
    password: "1111"
};

hasher(opts, function(err, pass, salt, hash) {
    console.log(err, pass, salt, hash);
});