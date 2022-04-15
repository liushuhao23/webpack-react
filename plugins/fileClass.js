/*
 * @Description: 新建模板文件
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-02-09 15:08:33
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-03-28 22:21:17
 */
const path = require('path')
const fs = require('fs')
const tempFun = require('./fileVue')
const prettier = require('prettier')
const glob = require('glob')
const preConfig = require(path.join(__dirname, '../.prettierrc.js'))

async function createFile(fileList, compareRes) {
    fileList.forEach(async (value, key) => {
        await dirExists(path.join(__dirname, `../src/components/article/${key}`))
        for (let i = 0; i < value.length; i++) {
            try {
                await isFileExisted(path.join(__dirname, `../src/components/article/${key}/${value[i]}.vue`))
            } catch (error) {
                let name = value[i]
                const result = prettier.format(tempFun(name), { ...preConfig, parser: 'vue' })
                fs.writeFileSync(path.join(__dirname, `../src/components/article/${key}/${value[i]}.vue`), result)
            }
        }
    })
    compareRes.then(data => {
        if (data.increase.length) {
            data.increase.forEach(async item => {
                await dirExists(path.join(__dirname, `../src/components/article/${item.parent}`))
                try {
                    await isFileExisted(path.join(__dirname, `../src/components/article/${item.parent}/${item.value}.vue`))
                } catch (error) {
                    let name = item.value
                    const result = prettier.format(tempFun(name), { ...preConfig, parser: 'vue' })
                    fs.writeFileSync(path.join(__dirname, `../src/components/article/${item.parent}/${item.value}.vue`), result)
                }
            })
        }
        if (data.reduce.length) {
            data.reduce.forEach(item => {
                glob(`./src/components/article/**/${item.value}.vue`, function (er, files) {
                    fs.unlinkSync(files[0])
                })
            })
        }
    })

    console.log('💪🏻 文件新建完成')
}

function isFileExisted(filePath) {
    return new Promise(function (resolve, reject) {
        fs.access(filePath, err => {
            if (err) {
                reject(false)
            } else {
                resolve(true)
            }
        })
    })
}

/**
 * 读取路径信息
 * @param {string} path 路径
 */
function getStat(path) {
    return new Promise((resolve, reject) => {
        fs.stat(path, (err, stats) => {
            if (err) {
                resolve(false)
            } else {
                resolve(stats)
            }
        })
    })
}

/**
 * 创建路径
 * @param {string} dir 路径
 */
function mkdir(dir) {
    return new Promise((resolve, reject) => {
        fs.mkdir(dir, err => {
            if (err) {
                resolve(false)
            } else {
                resolve(true)
            }
        })
    })
}

/**
 * 路径是否存在，不存在则创建
 * @param {string} dir 路径
 */
async function dirExists(dir) {
    let isExists = await getStat(dir)
    if (isExists && isExists.isDirectory()) {
        return true
    } else if (isExists) {
        return false
    }
    let tempDir = path.parse(dir).dir
    let status = await dirExists(tempDir)
    let mkdirStatus
    if (status) {
        mkdirStatus = await mkdir(dir)
    }
    return mkdirStatus
}

/**
 * @description: 删除文件夹和文件夹下的所有内容
 * @param {*} path
 * @return {*}
 * @author: liushuhao
 */
const deleteFile = path => {
    let files = []
    if (fs.existsSync(path)) {
        files = fs.readdirSync(path)
        files.forEach(function (file, index) {
            var curPath = path + '/' + file
            if (fs.statSync(curPath).isDirectory()) {
                deleteFile(curPath)
            } else {
                fs.unlinkSync(curPath)
            }
        })
        fs.rmdirSync(path)
    }
}

// export.default = { createFile }

module.exports = { createFile, isFileExisted, deleteFile, dirExists }
