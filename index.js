const tokens = require('./tokens');

console.log('hola mundo');

const userInfo = {
  name: 'sergio',
  lastname: 'hidalgo',
};

console.log(userInfo.name.toUpperCase());
console.log('Tokens', tokens.generateAccessToken('shidalgo', 'admin'));
