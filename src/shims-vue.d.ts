/*
 * @Description:
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-02-20 19:58:02
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-02-22 22:53:24
 */
/* eslint-disable */
declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}
interface Window {
    __POWERED_BY_QIANKUN__: any
    __CBIM_PLATFORM_APPLICATION_BOOT_DATA__: any
}
interface mountProps {
    application?: any
    container: any
    globalStore?: any
    mountParcel?: any
    name?: string
    onGlobalStateChange?: any
    setGlobalState?: any
    singleSpa?: any
    startMicroCbimAcp?: any
    registry?: any
}
