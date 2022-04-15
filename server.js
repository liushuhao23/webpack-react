/*
 * @Description:
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2021-11-12 09:16:03
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-04-15 16:29:53
 */
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const history = require('connect-history-api-fallback')
const cors = require('cors')
// import { createProxyMiddleware } from 'http-proxy-middleware'

const app = express()
const config = require('./config/webpack.dev.conf')
const compiler = webpack(config)
app.use(
    cors({
        origin: 'http://localhost:4000',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204,
        credentials: true
    })
)

app.use(history())
app.use(
    webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath,
        // quiet: true,
        stats: 'errors-only'
    })
)
app.use(
    webpackHotMiddleware(compiler, {
        path: '/__webpack_hmr',
        heartbeat: 10 * 1000,
        log: false
    })
)
app.use(history())

// app.get('/__webpack_hmr', function (req, res) {
//     // res.sendFile( __dirname + "/" + "index.htm" );
//     console.log(req, 'req');
//     console.log(res, 'res');
//  })
// 将文件 serve 到 port 3001。
app.listen(3001, function () {
    console.log('app listening on port 3001!\n')
})
