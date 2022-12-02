const Router = require('koa-router');
const {getAllAccounts, getAccount, updateAccount, insertAccount, deleteAccount} = require('./db/accounts');

const router = new Router({
    prefix: '/accounts'
});

//Get All Documens from Account Collection
router.get('/', async (ctx, next) => {
    ctx.body = await getAllAccounts();
    next();
})

//Search Document by ID
router.get('/:id', async (ctx, next) =>{
    
    var res = await getAccount(ctx.params.id);
    if(res != null)
    {
        ctx.response.status = 201;
        ctx.body = res;
        console.log("Get Account by ID");
    }
    else{
        ctx.response.status = 404;
        ctx.body = "User Account not found";
    }
    next();
});

//Insert New Document
router.post('/new', async (ctx, next) => {
    if(!ctx.request.body.id || !ctx.request.body.name || !ctx.request.body.email || !ctx.request.body.password)
    {
        ctx.response.status = 404;
        ctx.body = "Missing fields";
    }
    else
    {
        var res = await insertAccount(ctx.request.body.id, ctx.request.body.name, ctx.request.body.email, ctx.request.body.password);
        if(res)
        {
            console.log("Success Insert");
            ctx.body = "Successfully Added Account";
            ctx.response.status = 201;
        }
    }
    next();
});


//Update Document
router.post('/update', async (ctx, next) => {
    if(!ctx.request.body.id || !ctx.request.body.name || !ctx.request.body.email || !ctx.request.body.password)
    {
        ctx.response.status = 404;
        ctx.body = "Missing fields";
    }
    else
    {
        var res = await updateAccount(ctx.request.body.id, ctx.request.body.name, ctx.request.body.email, ctx.request.body.password);
        if(res)
        {
            ctx.response.status = 201;
            ctx.body = "Successful Update";
            console.log("Success Update");
        }
    }
    next();
});


//Delete a Document
router.post('/delete', async (ctx, next) => {
    if(!ctx.request.body.id)
    {
        ctx.response.status = 404;
        ctx.body = "Missing Fields";
    }
    else
    {
        var res = await deleteAccount(ctx.request.body.id);
        if(res)
        {
            ctx.response.status = 201;
            ctx.body = "Account Deleted";
            console.log("Account Deleted");
        }
    }
    next();
});


module.exports = router;