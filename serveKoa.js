/*
 * @Description: 
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2021-11-25 23:25:29
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-02-22 22:54:32
 */
const Koa = require('koa');
//Applications
const app = new Koa();

// 中间件1
app.use((ctx, next) => {
  console.log(1);
  next();
  console.log(2);
});

// 中间件 2 
app.use((ctx, next) => {
  console.log(3);
  next();
  console.log(4);
});

app.listen(9000, '0.0.0.0', () => {
    console.log(`Server is starting`);
});