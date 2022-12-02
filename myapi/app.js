const Koa = require('koa');
const {koaBody} = require('koa-body');
const cors = require('@koa/cors');

const app = new Koa();


app.use(cors());
app.use(koaBody());
let accounts = require('./accounts.js');

app.use(accounts.routes()).use(accounts.allowedMethods);
//Hello World Sample
// app.use(async ctx => {
//     ctx.body = 'Hello World';
// });

app.listen(3001);