"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
var app = require("../app");
const http_1 = __importDefault(require("http"));
dotenv_1.default.config();
const port = process.env.PORT;
app.set("port", port);
var server = http_1.default.createServer(app);
server.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
