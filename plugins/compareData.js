/*
 * @Description: 比较执行栈
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-02-11 09:53:26
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-02-22 22:51:00
 */
const fs = require('fs')
const path = require('path')
const glob = require('glob')
const util = require('util')
const { deleteFile } = require('./fileClass')

class Compare {
    constructor(filepath, treeDataMap, treeList) {
        this.filepath = filepath
        this.treeDataMap = treeDataMap
        this.treeList = treeList
    }
    getFatherFilesList() {
        const files = fs.readdirSync(this.filepath)
        return files
    }

    getAllFileslist(path) {
        return new Promise(resolve => {
            glob('./src/components/article/**/*.vue', function (er, files) {
                let res = []
                let name = ''
                files.forEach(item => {
                    name = item.replace(/(.*\/)*([^.]+).*/gi, '$2')
                    res.push(name)
                })
                name = ''
                resolve(res)
            })
        })
    }

    async compareDiff() {
        const filesList = this.getFatherFilesList(this.filepath)
        const filesAllList = await this.getAllFileslist()
        let treeListCopy = JSON.parse(JSON.stringify(this.treeList))
        // 判断文件夹
        if (filesList.length > this.treeDataMap.size) {
            const removeList = filesList.filter(item => {
                return !this.treeDataMap.has(item)
            })
            removeList.forEach(item => {
                deleteFile(path.join(__dirname, `../src/components/article/${item}`))
            })
            return false
        }
        const resObj = {
            increase: [],
            reduce: []
        }
        if (filesAllList.length < treeListCopy.length) {
            resObj.increase = treeListCopy.filter(item => {
                return !filesAllList.includes(item.value)
            })
            resObj.reduce = []
        } else if (filesAllList.length > treeListCopy.length) {
            resObj.increase = []
            const res = filesAllList.filter(item => {
                if (!treeListCopy.some(i => item === i.value)) {
                    return item
                }
            })
            const arr = []
            res.forEach(item => {
                arr.push({
                    value: item
                })
            })
            resObj.reduce = arr
        } else {
            const mid = []
            filesAllList.forEach(item => {
                mid.push({
                    value: item,
                    flag: false
                })
            })
            treeListCopy.forEach(item => {
                item.flag = false
            })
            mid.forEach(item => {
                treeListCopy.forEach(i => {
                    if (i.value === item.value) {
                        i.flag = true
                        item.flag = true
                    }
                })
            })
            resObj.increase = treeListCopy.filter(item => !item.flag)
            resObj.reduce = mid.filter(item => !item.flag)
        }
        return resObj
    }
}

module.exports = {
    Compare
}
