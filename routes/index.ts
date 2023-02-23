import api from './api';
import expess from "express";
const app = expess();
app.use('/api',()=>{console.log("api")})
module.exports = app;