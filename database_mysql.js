var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '111111',
    database : 'o2'
});

connection.connect();

/*
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
});
*/

var sql='select * from topic';

connection.query(sql, function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', fields);
});

connection.end();

