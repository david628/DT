const router = require('koa-router')();
const db = require('../utils/db');
router.get('/', async (ctx, next) => {
    await ctx.render('index.less', {
        title: '首页'
    })
});
router.get('/:id', async (ctx, next) => {
    const rs = [];
    const data = await db.query("SELECT * FROM api");
    // await ctx.render('index', {
    //     title: rs
    // })
    ctx.body = {
        title: data
    }
});

module.exports = router;
