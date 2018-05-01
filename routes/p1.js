module.exports =function(app,b){
    var express=require('express');
    var route=express.Router();

    route.get('/r1', function(req, res){
        res.send('Hello p1 route r1 :'+ b);
    });

    route.get('/r2', function(req, res){
        res.send('Hello p1 route r2 ');
    });
    return route;
};