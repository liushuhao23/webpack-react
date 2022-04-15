/*
 * @Description:
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2021-03-25 09:59:06
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-04-15 16:27:01
 */
const path = require('path')
const { name } = require('../package')
const htmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WebpackBar = require('webpackbar')
const NODE_ENV = process.env.NODE_ENV

// const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
console.log(NODE_ENV, 'NODE_ENV')
module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, '../src/index.tsx'),

    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/',
        library: `${name}-[name]`,
        libraryTarget: 'umd' // 把微应用打包成 umd 库格式
    },
    module: {
        rules: [
            {
                test: /\.js|jsx$/,
                exclude: /node_modules/, // 不编译node_modules下的文件
                // include: /node_modules[\\/]monaco-editor[\\/]esm/,
                // use: MonacoWebpackPlugin.loader
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true
                    }
                }
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/, // 不编译node_modules下的文件
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            // 指定特定的ts编译配置，为了区分脚本的ts配置
                            configFile: path.resolve(__dirname, '../tsconfig.json'),
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                // exclude: /node_modules/, // 不编译node_modules下的文件
                use: [
                    NODE_ENV === 'development'
                        ? 'style-loader'
                        : {
                              loader: MiniCssExtractPlugin.loader
                          },
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                // exclude: /node_modules/, // 不编译node_modules下的文件
                use: [
                    NODE_ENV === 'development'
                        ? 'style-loader'
                        : {
                              loader: MiniCssExtractPlugin.loader
                          },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                javascriptEnabled: true //允许链式调用的换行
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                // exclude: /node_modules/, // 不编译node_modules下的文件
                type: 'asset/resource'
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                // exclude: /node_modules/, // 不编译node_modules下的文件
                type: 'asset/resource'
            }
        ]
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '../src')
        },
        extensions: ['.tsx', '.ts', '.mjs', '.js', '.jsx', '.json', '.wasm']
    },
    plugins: [
        // new MonacoWebpackPlugin(),
        // new WebpackBar(),
        new htmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html'),
            filename: 'index.html',
            // minify: {
            //   collapseWhitespace: true, // 移除空格
            //   removeComments: true, // 移除注释
            // },
            title: 'webapck5_react'
        })
    ]
}
