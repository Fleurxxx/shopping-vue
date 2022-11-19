import VueI18n from 'vue-i18n'
import Vue from 'vue'

//引入element的语言包
import localeLib from 'element-ui/lib/locale'  //本地
import enLocale from "element-ui/lib/locale/lang/en"; //英文
import zhLocale from "element-ui/lib/locale/lang/zh-CN";  //中文

// 引入需要语言包也可是js文件，export default抛出语言包的对象
import en from './lang/saas-en.json'
import zh from'./lang/saas-zh-CN.json'

Vue.use(VueI18n)

//获取本地选择的语言
var lang =
    Cookie.get("bx_user_lang") ||
    navigator.language ||
    navigator.userLanguage ||
    "en";
const i18n = new VueI18n({
    locale: lang, // 语言标识
    fallbackLocale: 'zh-CN',
    silentTranslationWarn: true,// 设置为true 会屏蔽翻译在控制台报出的警告
    messages: {
        en: Object.assign(en, enLocale),
        "zh-CN": Object.assign(zh, zhLocale)
    }
})
// 设置语言
localeLib.i18n((key, value) => i18n.t(key, value))
export default i18n
