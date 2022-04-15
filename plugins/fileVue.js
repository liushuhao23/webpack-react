/*
 * @Description:
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-02-10 22:39:07
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-04-02 14:47:15
 */
// const template =
const tempFun = name => {
    return `
    <template>
        <div class="index">
            <div class="desc_content">
                <span v-html="title"></span>
            </div>
            <div class="content">
                <editor :value="value">
                    <template #footer>
                        <a-button type="primary" class="submit" @click="submit">提交</a-button>
                    </template>
                </editor>
            </div>
            <div class="resDom" v-if="resFlag">
            <div class="icon_down"  @click="down">
                <DownOutlined />
            </div>
            <div class="res_content">
                <div>
                    <span>测试参数：</span>
                    <span></span>
                </div>
                <span>结果:</span>
                {{ funRes }}
            </div>
        </div>
        </div>
    </template>
    
    <script lang="ts" setup>
    import { ref } from 'vue'
    import { DownOutlined } from '@ant-design/icons-vue'
    const value = ref('const ${name} = () => {}')
    const funRes = ref([])
    const resFlag = ref(false)
    const title = ref('')
    const submit = () => {
        console.log(value.value, 'value')
    }
    const down = () => {
        resFlag.value = false
    }
    
    </script>
    
    <style scoped lang="less"></style>
    `
}
module.exports = tempFun
