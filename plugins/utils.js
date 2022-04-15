/*
 * @Description: 工具函数
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-02-09 17:26:49
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-02-22 22:51:15
 */
const treeErgodic = tree => {
    let nodeArr = [...tree]
    nodeArr.push(tree)
    let res = []
    while (nodeArr.length) {
        let target = nodeArr.shift()
        if (target.children && target.children.length) {
            for (let i = 0; i < target.children.length; i++) {
                nodeArr.push(target.children[i])
                res.push(target.children[i])
            }
        }
    }
    return res
}

const treeErgodicMap = tree => {
    let result = new Map()
    let nodeArr = [...tree]
    nodeArr.push(tree)
    let res = []
    while (nodeArr.length) {
        let target = nodeArr.shift()
        if (target.children && target.children.length) {
            const arr = []
            for (let i = 0; i < target.children.length; i++) {
                arr.push(target.children[i].value)
                nodeArr.push(target.children[i])
                res.push(target.children[i].value)
            }
            result.set(target.value, arr)
        }
    }
    return result
}
module.exports = { treeErgodic, treeErgodicMap }
