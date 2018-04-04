const http= require('http'); //http 모듈이 필요하다
                             //http 모듈일 http 변수에 할당
                             //const 한번 할당되면 변경될수 없다-> 상수

const hostname='127.0.0.1';
const port = 3000;

const server = http.createServer((req, res)=>{
    res.statusCode=200;
res.setHeader('Content-Type', 'text/plain');
res.end('Hello world\n');

});

server.listen(port, hostname, () => {
    console.log(`server running at22  http://${hostname}:${port}/`);
});
