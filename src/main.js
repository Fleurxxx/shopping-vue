import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router"
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/css/global.css'
import './assets/icon/iconfont.css'
import axios from 'axios'
import Vuex from 'vuex'
import qs from 'qs'      //引入qs

// import VueI18n from 'vue-i18n'
// 统一导入el-icon图标
import * as ElIconModules from "@element-plus/icons-vue"




const app = createApp(App);

app.config.globalProperties.$http = axios
app.config.globalProperties.$qs = qs
// 统一注册el-icon图标
for(let iconName in ElIconModules){
    app.component(iconName,ElIconModules[iconName])
}
app.use(router)
    .use(store)
    .use(ElementPlus)
    .use(Vuex)
    .mount('#app')
