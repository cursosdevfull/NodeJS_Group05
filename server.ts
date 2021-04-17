import * as http from 'http';

const server = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'plain/text' });
  response.write('Hola');
  response.write('Buen día, qué desea?');
  response.end();
});

server.listen(4600, () => console.log('App is running on port 4600'));
