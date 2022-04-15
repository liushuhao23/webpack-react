/*
 * @Description:
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2021-03-27 22:39:53
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-04-15 16:04:06
 */

const { merge } = require('webpack-merge')
const base = require('./webpack.base.conf')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const smp = new SpeedMeasurePlugin()
const webpack = require('webpack')

module.exports = merge(base, {
    mode: 'development',
    devtool: 'source-map',
    entry: [
        'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true', // 必须这么写，这将连接到服务器，以便在包重新构建时接收通知，然后相应地更新客户端
        './src/index.tsx'
    ],
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new FriendlyErrorsWebpackPlugin({ clearConsole: true }),
        // new Conversion(),
        new webpack.DefinePlugin({
            __VUE_OPTIONS_API__: JSON.stringify(true),
            __VUE_PROD_DEVTOOLS__: JSON.stringify(true)
        })
    ]
})
