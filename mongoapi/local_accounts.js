const Router = require('koa-router');

const router = new Router({
    prefix: '/accounts'
});

var id = 100;

let accounts = [
    {id: id++, name: 'Frodo Baggins', email: 'frodo@mail.com', password: "OhSamwiseGamgee"},
    {id: id++, name: 'Bilbo Baggins', email: 'bilbo@mail.com', password: "ItsMyRing"},
    {id: id++, name: 'Meredith Grey', email: 'grey@mail.com', password: "EveryoneIsDying"},
    {id: id++, name: 'Cristina Yang', email: 'yang@mail.com', password: "WhereIsMyShoe"}
];

//Get All
router.get('/', (ctx, next) => {
    ctx.body = accounts;
    next();
});

//Get Next ID
router.get('/ID/GetNextID', (ctx, next) => {
    ctx.body = id;
    next();
});

//Search
router.get('/:id', (ctx, next) => {
    let CurrentAccount = accounts.filter(function(account) {
        if(account.id == ctx.params.id){
            //found
            return true;
        }
    });
    if(CurrentAccount.length > 0)
    {
        ctx.body = CurrentAccount[0];
    }
    else
    {
        ctx.response.status = 404;
        ctx.body = "User Account Not Found";
    }
    next();
});

router.post('/new', (ctx, next) => {
    console.log("New");
    if( !ctx.request.body.name || !ctx.request.body.email || !ctx.request.body.password)
    {
        ctx.response.status = 404;
        ctx.body = "Missing Fields";
    }
    else
    {
        let newAccount = accounts.push({id: id++, name: ctx.request.body.name, email: ctx.request.body.email, password: ctx.request.body.password});
        ctx.response.status = 201;
        ctx.body = "Account Successfulyy Added";
    }
    next();
});

router.put('/update', (ctx, next) => {
    console.log("Update");
    if( !ctx.request.body.id || !ctx.request.body.name || !ctx.request.body.email || !ctx.request.body.password)
    {
        ctx.response.status = 404;
        ctx.body = "Missing Fields";
    }
    else
    {
        var index = users.findIndex(x => x.id == ctx.request.body.id);
        if(index > -1)
        {
            //Found
            users[index].name = ctx.request.body.name;
            users[index].email = ctx.request.body.email;
            users[index].password = ctx.request.body.password;
            ctx.response.status = 201;
            ctx.body = "Account Successfulyy Updated";
        }
    }
    next();
});

router.post('/delete', (ctx, next) => {
    if(!ctx.request.body.id)
    {
        ctx.response.status = 404;
        ctx.body = "Error ID";
    }
    else
    {
        var index = accounts.findIndex(x => x.id == ctx.request.body.id);
        if(index > -1)
        {
            accounts.splice(index, 1);
            ctx.response.status = 200;
            ctx.body = "Success Deletion";
        }
    }
});

module.exports = router;