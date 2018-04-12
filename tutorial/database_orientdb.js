var OrientDB = require('orientjs');


var server = OrientDB({
    host:       'localhost',
    port:       2424,
    username:   'root',
    password:   '111111',
    name: 'o2'
});

var db = server.use('o2');
console.log('Using Database:', db.name);
/*
var rec = db.record.get('#27:0')
    .then(
        function(record){
            console.log('Loaded Record:', record);
        }
    );
*/

//CRETE
/*var sql='SELECT FROM TOPIC';
db.query(sql).then(function(results){
console.log(results);
});*/
/*db.open().then(function() {
    return db.query('SELECT FROM topic');
}).then(function(res){
    console.log(res.length);
    db.close().then(function(){
        console.log('closed');
    });
});*/
//select

/*var sql='select from topic where @rid=:rid';
var param={
	params:{            //params는 약속으로 바꿀 수 없다
		rid:'#27:0'
}
};
db.query(sql, param).then(function(results){
	console.log(results);
});*/

//insert
/*var sql="insert into topic (javascript, npm) values(:v,:n)";
var param = {
params:{
v:'Express',
n:'Express is framework for web'
}
}
db.query(sql, param).then(function(results){
console.log(results);
});*/

//UPDATE
/*var sql="update topic set Javascript=:j where @rid=:rid";
var param = {
params:{
j:'update javascript',
rid:'#28:0'
}
}

db.query(sql, param).then(function(results){
console.log(results);
});*/

//delete
var sql = "delete from topic where @rid=:rid";
var param={
params:{
rid:'#28:0'
}
}

db.query(sql, param).then(function(results){
console.log(results);
});


