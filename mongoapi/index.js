const koa = require('koa');
const cors = require('@koa/cors');
const {koaBody} = require("koa-body");
const bodyParser = require('koa-bodyparser');

const api = require('./api');


const app = new koa();

// app.use(cors());

app.use(cors());
app.use(bodyParser());

app.use(api.routes()).use(api.allowedMethods());

app.listen(3002);


const local_app = new koa();


local_app.use(cors());
local_app.use(koaBody());
let local_accounts = require('./local_accounts.js');

local_app.use(local_accounts.routes()).use(local_accounts.allowedMethods);
//Hello World Sample
// app.use(async ctx => {
//     ctx.body = 'Hello World';
// });

local_app.listen(3001, function(){console.log("http://localhost:3001/accounts")});