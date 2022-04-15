/*
 * @Description: 动态生成router 路径
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-02-07 16:51:14
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-02-22 22:51:09
 */
const paths = require('path')
const fs = require('fs')
const util = require('util')
const { parse } = require('@babel/parser')
const traverse = require('@babel/traverse').default
const template = require('@babel/template').default
const t = require('@babel/types')
const generator = require('@babel/generator').default
const prettier = require('prettier')
const { treeErgodic, treeErgodicMap } = require('./utils')
const { createFile, isFileExisted, dirExists } = require('./fileClass')
const { Compare } = require('./compareData')
const preConfig = require(paths.join(__dirname, '../.prettierrc.js'))
const list = require(paths.join(__dirname, '../src/components/menu/resource/index.ts'))
let codeStr = ''
let treeList = []
let addTreeList = []
let compareInstance
let treeDataMap = new Map()

class Conversion {
    options = {}
    constructor(options) {
        this.options = { ...options }
    }
    apply(complier) {
        const fun = () => {
            let list = this.getastconversionscript()
            treeList = treeErgodic(list)
            treeDataMap = treeErgodicMap(list)
            compareInstance = new Compare(paths.join(__dirname, '../src/components/article'), treeDataMap, treeList)
            const compareRes = compareInstance.compareDiff()
            this.astInit(treeList, compareRes)
        }
        fun()
        this.getastconversionscript()
        complier.hooks.watchRun.tap('conversion', async compiler => {
            if (compiler.modifiedFiles && compiler.modifiedFiles.has(`${paths.join(__dirname, '../src/components/menu/resource/index.ts')}`)) {
                fun()
            }
        })
    }
    getastconversionscript() {
        const data = fs.readFileSync(paths.join(__dirname, '../src/components/menu/resource/index.ts'), 'utf-8')
        const ast = parse(data, { sourceType: 'module', plugins: ['typescript'] })
        const strAst = JSON.stringify(ast)
        let codeStr = ''
        this.readFile(strAst)
        traverse(ast, {
            ArrayExpression: function (path) {
                if (path.parentPath && path.parentPath.node && path.parentPath.node.id && path.parentPath.node.id.name === 'list') {
                    const { code } = generator(path.node, data)
                    codeStr = code
                }
            }
        })
        const dataTemp = `function test(value){return ${codeStr}}`
        let funcTest = new Function('return ' + dataTemp)
        let res = funcTest()()
        return res
    }
    async astInit(treeList, compareRes) {
        const temp = `const childrenRouter = []; 
        export default childrenRouter `
        await dirExists(paths.join(__dirname, '../src/router/children'))
        const initfun1 = async () => {
            try {
                await isFileExisted(paths.join(__dirname, '../src/router/children/index.ts'))
            } catch (error) {
                /***********占位标识 */
            }
            fs.writeFileSync(paths.join(__dirname, '../src/router/children/index.ts'), prettier.format(temp, { ...preConfig, parser: 'typescript' }))
        }
        await initfun1()
        const data = fs.readFileSync(paths.join(__dirname, '../src/router/children/index.ts'), 'utf-8')
        codeStr = data
        const ast = parse(data, { sourceType: 'module', plugins: ['typescript'] })
        this.addRouter(ast, treeList, compareRes)
    }
    readFile(strAst) {
        if (fs.existsSync('ast')) {
            fs.writeFile('ast/ast.json', strAst, function (err) {
                if (err) {
                    throw new Error(err)
                } else {
                    console.log('💪🏻写入ast.json 成功')
                }
            })
        } else {
            fs.mkdir('ast', function (err) {
                if (err) {
                    throw new Error(err)
                } else {
                    console.log('💪🏻创建ast 文件夹')
                    fs.writeFile('ast/ast.json', strAst, function (err) {
                        if (err) {
                            throw new Error(err)
                        } else {
                            console.log('💪🏻写入ast.js 成功')
                        }
                    })
                }
            })
        }
    }
    addRouter(ast, routerRes, compareRes) {
        traverse(ast, {
            ArrayExpression: function (path) {
                if (path.parentPath.node.id.name === 'childrenRouter') {
                    const elements = path.node.elements
                    routerRes.forEach(item => {
                        elements.push(
                            t.objectExpression([
                                t.objectProperty(t.identifier('path'), t.stringLiteral(`/${item.value}`)),
                                t.objectProperty(t.identifier('name'), t.stringLiteral(item.value)),
                                t.objectProperty(
                                    t.identifier('component'),
                                    t.identifier(`() => import('../../components/article/${item.parent}/${item.value}.vue')`)
                                )
                            ])
                        )
                    })
                }
            }
        })
        createFile(treeDataMap, compareRes)
        const { code } = generator(ast, codeStr)
        const result = prettier.format(code, { ...preConfig, parser: 'typescript' })
        fs.writeFileSync(paths.join(__dirname, '../src/router/children/index.ts'), result)
        this.dealMainRouter()
    }
    dealMainRouter() {
        const data = fs.readFileSync(paths.join(__dirname, '../src/router/index.ts'), 'utf-8')
        const ast = parse(data, { sourceType: 'module', plugins: ['typescript'] })
        const strAst = JSON.stringify(ast)
        this.readFile(strAst)
        traverse(ast, {
            Program: function (path) {
                const flag = path.node.body.find(item => {
                    return item.type === 'ImportDeclaration' && item.specifiers[0].local.name === 'childrenRouter'
                })
                if (!flag) {
                    const ast = template.ast('import childrenRouter from "./children/index.ts"')
                    path.node.body.unshift(ast)
                }
            },
            ArrayExpression: function (path) {
                if (path.parentPath.node.id.name === 'routes') {
                    const elements = path.node.elements
                    const flag = elements.find(item => {
                        return item.type === 'SpreadElement' && item.argument.name === 'childrenRouter'
                    })
                    if (!flag) {
                        elements.push(t.identifier('...childrenRouter'))
                    }
                }
            }
        })
        const { code } = generator(ast, codeStr)
        const result = prettier.format(code, { ...preConfig, parser: 'typescript' })
        fs.writeFileSync(paths.join(__dirname, '../src/router/index.ts'), result)
        console.log('💪🏻vue-router 修改完成')
    }
}
module.exports = { Conversion }
