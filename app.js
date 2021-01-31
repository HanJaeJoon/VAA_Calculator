const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = process.env.PORT || 80;

const server = http.createServer((req, res) => {
    let url = req.url;

    console.log(url);
    if (url === '/') {
        url = '/index.html';
    }

    if (url === 'favicon.ico') {
        return res.writeHead(404);
    }

    res.writeHead(200);
    res.end(fs.readFileSync(__dirname + url));
});

server.listen(port, hostname, () => {
  console.log(`Server running`);
});