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
  const data = await db.insert("INSERT INTO dashboard (name, status) VALUES (?, ?)", [name, status]);
  ctx.body = {
    data: data
  }
})

router.post('/update', async function (ctx, next) {
  const { id, name } = ctx.request.body;
  const data = await db.insert("UPDATE dashboard SET name = ? WHERE id = ?", [name, id]);
  ctx.body = {
    data: data
  }
})

router.delete('/delete', async function (ctx, next) {
  const { id } = ctx.request.body;
  const data = await db.del("DELETE FROM dashboard WHERE id = ?", [id]);
  ctx.body = {
    data: data
  }
})

router.get('/get', async function (ctx, next) {
  // GET:
  // 是从上下文中直接获取
  // 请求对象ctx.query，返回如 { a:1, b:2 }
  // 请求字符串 ctx.querystring，返回如 a=1&b=2
  // 是从上下文的request对象中获取
  // 请求对象ctx.request.query，返回如 { a:1, b:2 }
  // 请求字符串 ctx.request.querystring，返回如 a=1&b=2。
  // POST:
  // ctx.request.body
  const { id } = ctx.request.query;
  const data = await db.query("SELECT * FROM dashboard WHERE id = ?", [id]);
  ctx.body = {
    data: data[0]
  }
})

module.exports = router
