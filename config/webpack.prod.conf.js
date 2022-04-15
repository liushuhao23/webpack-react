/*
 * @Description:
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2021-03-27 22:39:53
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-03-28 16:23:42
 */

const { merge } = require('webpack-merge')
const base = require('./webpack.base.conf')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = merge(base, {
    mode: 'production',
    devtool: false,
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                test: /\.js(\?.*)?$/i, //匹配参与压缩的文件
                parallel: true, //使用多进程并发运行
                exclude: /\.min\.js$/,
                terserOptions: {
                    output: { comments: false }
                },
                extractComments: true //将注释剥离到单独的文件中11
            })
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/bundle_[chunkhash:8].css'
        })
    ]
})
