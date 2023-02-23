import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
var app = require("../app")
import http from 'http';
dotenv.config();

const port = process.env.PORT;
app.set("port", port);

var server = http.createServer(app);

server.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});