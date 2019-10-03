const router = require('koa-router')()
const db = require('../utils/db');

router.prefix('/dashboard')

router.get('/', function (ctx, next) {
  ctx.body = 'dashboard: list'
})

router.get('/list', async function (ctx, next) {
  const data = await db.query("SELECT * FROM dashboard");
  ctx.body = {
    data: data
  }
})

router.post('/save', async function (ctx, next) {
  const { name, status } = ctx.request.body;
  const data = await db.insert("INSERT INTO dashboard (name, status) VALUES (?, ?) ", [name, status]);
  ctx.body = {
    data: data
  }
})

router.delete('/delete', async function (ctx, next) {
  const { id } = ctx.request.body;
  const data = await db.del("DELETE FROM dashboard WHERE id = ? ", [id]);
  ctx.body = {
    data: data
  }
})

router.get('/get', function (ctx, next) {
  ctx.body = 'dashboard: get'
})

module.exports = router
