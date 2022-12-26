<template>
  <div class="footer">
    <div class="container">
      <div class="siteinfo">
        <ul class="c0">
          <h3 class="c1">订单服务</h3>
          <ul>
            <li class="c2"><router-link to="/thanks"><a class="c3">购买指南</a></router-link></li>
            <li class="c2"><a class="c3" @click="open4">支付方式</a></li>
            <li class="c2"><a class="c3" @click="open5">送货政策</a></li>
          </ul>
        </ul>
        <ul class="c0">
          <h3 class="c1">天猫保障</h3>
          <ul>
            <li class="c2"><a class="c3" target="_blank" href="">发票报账</a></li>
            <li class="c2"><a class="c3" target="_blank" href="">售后规则</a></li>
            <li class="c2"><a class="c3" target="_blank" href="">物流实时报账</a></li>
          </ul>
        </ul>
        <ul class="c0">
          <h3 class="c1">支付方式</h3>
          <ul>
            <li class="c2"><a class="c3" target="_blank" href="">快捷支付</a></li>
            <li class="c2"><a class="c3" target="_blank" href="">余额宝</a></li>
            <li class="c2"><a class="c3" target="_blank" href="">信用卡</a></li>
          </ul>
        </ul>
        <ul class="c0">
          <h3 class="c1">商家服务</h3>
          <ul>
            <li class="c2"><a class="c3" target="_blank" href="https://rulechannel.tmall.com/tmall#/">天猫规则</a></li>
            <li class="c2"><a class="c3" target="_blank" href="">商家入驻</a></li>
            <li class="c2"><a class="c3" target="_blank" href="">商家中心</a></li>
          </ul>
        </ul>
        <ul class="c0">
          <h3 class="c1">购物指南</h3>
          <ul>
            <li class="c2"><a class="c3" target="_blank" href="http://localhost:8080/#/register">免费注册</a></li>
            <li class="c2"><a class="c3" target="_blank" href="">开通支付宝</a></li>
            <li class="c2"><a class="c3" target="_blank" href="">支付宝充值</a></li>
          </ul>
        </ul>
        <ul class="c0">
          <h3 class="c1">技术应用</h3>
          <ul>
            <li class="c2"><a class="c3" target="_blank" href="https://cn.vuejs.org/guide/essentials/conditional.html">vue</a></li>
            <li class="c2"><a class="c3" target="_blank" href="https://www.iconfont.cn/">iconfont</a></li>
            <li class="c2"><a class="c3" target="_blank" href="https://element-plus.gitee.io/zh-CN/guide/design.html">element</a></li>
          </ul>
        </ul>

        <ul class="c4">
          <li class="tel"><a class="c5" href="http://wpa.qq.com/msgrd?v=3&uin=1012139570&site=qq&menu=yes" target="_blank">984209872</a></li>
          <li class="time">周一至周日 10:00-23:00 (仅限网站维护)</li>
          <li class="online">
            <y-button text="在线帮助" class="button" @btnClick="open3"></y-button>
          </li>
        </ul>
      </div>

      <div class="copyright">
        <h4 class="content-c2">一个虚假的天猫网站</h4>
        <ul class="privacy">
          <li class="content-c1"><a class="content-c0" @click="open1">法律声明</a></li>
          <li class="content-c1"><a class="content-c0" @click="open2">隐私条款</a></li>
          <li class="content-c1"><a class="content-c0" target="_blank" href="">全网举报</a></li>
        </ul>
      </div>
      <div class="cop">
        <a class="content-c3" href="" target="_blank">
          <span class="content-c3">京ICP备18330308号-1</span>
          <span class="content-c3">京ICP证18330308号</span>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
  // import YButton from '/components/YButton'
  // export default {
  //   data () {
  //     return {
  //     }
  //   },
  //   methods: {
  //     open1 () {
  //       this.$notify.info({
  //         title: '法律声明',
  //         message: '此仅为个人练习开源模仿项目，仅供学习参考，承担不起任何法律问题'
  //       })
  //     },
  //     open2 () {
  //       this.$notify.info({
  //         title: '隐私条款',
  //         message: '本网站将不会严格遵守有关法律法规和本隐私政策所载明的内容收集、使用您的信息'
  //       })
  //     },
  //     open3 () {
  //       this.$notify({
  //         title: '离线帮助',
  //         message: '没人会帮助你，请自己靠自己',
  //         type: 'warning'
  //       })
  //     },
  //     open4 () {
  //       this.$notify.info({
  //         title: '支付方式',
  //         message: '支持支付宝、微信等方式捐赠'
  //       })
  //     },
  //     open5 () {
  //       this.$notify({
  //         title: '送货政策',
  //         message: '本网站所有商品购买后不会发货，将用作捐赠',
  //         type: 'warning'
  //       })
  //     }
  //   },
  //   components: {
  //     YButton
  //   }
  // }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .footer {
    padding: 50px 0 20px;
    border-top: 1px solid #e6e6e6;
    background: #fafafa;
    margin-top: 60px;
    height: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .container {
    width: 1220px;
  }

  .siteinfo {
    height: 100px;
    padding: 50px 0 130px;
    border-bottom: 1px solid #e6e6e6;
    position: relative;
  }

  .c0 {
    width: 149px;
    line-height: 1;
    float: left;
  }

  .c1 {
    color: #646464;
    font-size: 12px;
    padding: 0 0 14px;
  }

  .c2 {
    color: #c3c3c3;
    font-size: 12px;
    padding: 6px 0;
  }

  .c3 {
    color: #969696;
  }

  .c4 {
    position: absolute;
    right: 0;
    overflow: hidden;
    line-height: 34px;
  }

  .tel {
    font-size: 30px;
    line-height: 1;
    color: #646464;
    top: -2px;
    right: 40px;
    position: relative;
  }

  .c5 {
    color: #646464;
    right: -70px;
    position: relative;
  }

  .time {
    margin-top: 5px;
    right: 15px;
    position: relative;
    clear: both;
    width: 241px;
    font-size: 12px;
    line-height: 18px;
    color: #c3c3c3;
    text-align: right;
  }

  .online {
    clear: both;
    width: 241px;
    font-size: 12px;
    line-height: 18px;
    color: #c3c3c3;
    text-align: right;
  }

  .button {
    width: 130px;
    height: 34px;
    font-size: 14px;
    color: #5079d9;
    border: 1px solid #dcdcdc;
    margin-top: 8px;
  }

  .copyright {
    color: #434d55;
    font-size: 12px;
    padding: 40px 0 0;
    display: flex;
    /*align-items: left;原本是这个*/
    margin-left: 420px;
    align-items: center;
  }

  .privacy {
    float: left;
    margin: 0 0 0 12px;
  }

  .content-c0 {
    color: #5079d9;
    cursor: pointer;
    text-decoration: none;
    &:hover {
      color: #3A5FCD;
    }
  }

  .content-c1 {
    float: left;
    line-height: 12px;
    padding: 1px 10px 0;
    border-left: 1px solid #ccc;
  }

  .content-c2 {

    float: left;
    height: 15px;
    line-height: 15px;
    color: #757575;
  }

  .cop {
    clear: both;
    padding: 10px 0 0;
    height: 15px;
  }

  .content-c3 {
    margin-right: 20px;
    color: #bdbdbd;
    font-size: 12px;
    height: 12px;
    line-height: 1;
  }
</style>
