const Router = require('koa-router');

const {getAccounts} = require('./api');

const router = new Router({
    prefix: '/accounts'
});


router.get('/', async (ctx, next) => {
    ctx.body = await getAccounts();
})