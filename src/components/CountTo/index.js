/*
 * @Author: Binggan
 * @Date: 2022-03-01 20:40:25
 * @LastEditors: Binggan
 * @LastEditTime: 2022-03-02 10:53:56
 * @Description:
 */
import CountToComponent from "./CountToComponent"
export default {
    install(vue) {
        vue.component("CountTo", CountToComponent)
    }
}
