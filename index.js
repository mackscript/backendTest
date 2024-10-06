const fs = require('fs');
import fs from 'fs';
const http = require('http');
const url = require('url');

//server
const server = http.createServer((req, res) => {
  const pathName = req.url;
  if (pathName == '/') {
    res.end('Hi Mack How are you');
  } else if (pathName == '/userList') {
    fs.readFile(`${__dirname}/data/user.json`, 'utf-8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-type': 'application/json' });
        res.end(
          JSON.stringify({
            data: null,
            status: {
              isSuccess: false,
              errorMessage: 'data not found',
            },
          })
        );
      }
      const userList = JSON.parse(data);
      res.writeHead(200, { 'Content-type': 'application/json' });
      res.end(
        JSON.stringify({
          data: userList,
          status: {
            isSuccess: true,
            errorMessage: '',
          },
        })
      );
    });
  } else {
    res.writeHead(404, {
      'Content-Type': 'text/html',
      'my-own-header': 'hello-world',
    });
    res.end(`<h1>Page not found!</h1>`);
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('hello world  x');
});
