/*
 * @Description:
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-02-07 14:39:44
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-03-29 10:41:57
 */
const shell = require('shelljs')
const Rsync = require('rsync')
const path = require('path')
if (shell.exec('yarn install').code !== 0) {
    shell.echo('Error: yarn install failed')
    shell.exit(1)
}

if (shell.exec('yarn build').code !== 0) {
    shell.echo('Error: yarn build failed')
    shell.exit(1)
}
const rsync = Rsync.build({
    source: path.join(__dirname, '../dist/*'),
    destination: 'root@59.110.227.202:/root/vue_test/dist',
    flags: 'avz',
    shell: 'ssh'
})

rsync.execute((err, code, cmd) => {
    console.log(err, code, cmd)
})
