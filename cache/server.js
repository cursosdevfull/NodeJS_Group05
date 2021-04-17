"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const app = express_1.default();
// Rutas
app.get('/users', (req, res) => {
    /*   res.writeHead(200, {"content-type": "text/plain"});
    res.write("List of users");
    res.end() */
    res.send('List of users');
});
const server = http_1.default.createServer(app);
server.listen(4000, () => console.log('Server is running on port 4000'));
