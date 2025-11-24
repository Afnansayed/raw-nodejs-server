"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const confiq_1 = __importDefault(require("./confiq"));
const server = http_1.default.createServer((req, res) => {
    console.log('Server is running ......');
    if (req.url === '/' && req.method === 'GET') {
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(JSON.stringify({
            message: 'Hello from node js with typescript...',
            path: req.url,
        }));
    }
});
server.listen(confiq_1.default.port, () => {
    console.log(`Server is running on port ${confiq_1.default.port}`);
});
