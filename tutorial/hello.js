/*
const http= require('http'); //http 모듈이 필요하다
                             //http 모듈일 http 변수에 할당
                             //const 한번 할당되면 변경될수 없다-> 상수

const hostname='127.0.0.1';
const port = 3000;

//req 요청, res 응답
const server = http.createServer((req, res)=>{
    res.statusCode=200;
res.setHeader('Content-Type', 'text/plain');
res.end('Hello world\n');
});

server.listen(port, hostname, () => {
    console.log(`server running at22  http://${hostname}:${port}/`);
});

//server 객체를 만들고 listen 함수 실행 의미
//function 과 =>는 같은 의미이다
server.listen(port, hostname, function(){
    console.log(`function server running at  http://${hostname}:${port}/`);
});
*/


var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '111111',
    database : 'o2'
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
});

connection.end();
