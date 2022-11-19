<template>
    <div class="login-main">
        <div class="login-main-left" >
            <img class="Logo" src="../../assets/images/vectorgraph/logo1.png" alt="">
        </div>
        <img class="login-img1" src="../../assets/images/img/天猫形象2.png">
        <div class="login-info" style="margin: 150px auto; ">
            <div class="login-wrap">
                <ul class="tab-item">
                    <li class="tab-item-title">
                        <a  href="#" style="font-size:32px;font-weight:bold"  class="current">欢迎登录</a>
                    </li>
                </ul>
            </div>
            <div class="login-tab-info" style="margin-top: 50px">
                <el-form :model="loginForm" :rules="loginRules" ref="loginForm" class="login-ruleForm">
                    <div class="tab-info">
                        <el-form-item prop="username">
                            <el-input  class="inps"
                                       ref="username"
                                       v-model="loginForm.username"
                                       placeholder="邮箱"
                                       name="username"
                                       type="text"
                                       style="width:70%;margin-left: 16px;margin-right: 20px;"
                                       tabindex="1"
                                       auto-complete="on"
                                       prefix-icon="User" clearable >
                            </el-input>

                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input :key="passwordType"
                                      ref="password"
                                      v-model="loginForm.password"
                                      :type="passwordType"
                                      placeholder="密码"
                                      name="password"
                                      tabindex="2"
                                      style="width:70%;margin-left: 16px;margin-right: 20px;"
                                      auto-complete="on"
                                      @keyup.enter.native="handleLogin"
                                      prefix-icon="Lock"
                                      show-password>
                                <i slot="prefix" class="iconfont icon-3701mima"></i>
                            </el-input>

                        </el-form-item>
                    </div>
                    <!--   验证码   -->
                    <div class="login-center-input">
                        <el-form-item prop="identifyCode">
                            <el-input  class="identifiy-input"
                                       id="identifyCode"
                                       ref="identifycode"
                                       type="text"
                                       maxlength="4"
                                       placeholder='点击图片更换验证码'
                                       auto-complete="off"
                                       @keyup.enter.native="handleLogin"
                                       v-model="loginForm.identifyCode"/>
                            <div class="identifyBox" @click="refreshCode">
                                <Sidentify :identifyCode="identifyCode"></Sidentify>
                            </div>
                        </el-form-item>
                    </div>
                </el-form>
                <!--  登录按钮  -->
                <el-form-item style="margin-top:55px;">
                    <el-button type="primary"
                            round
                            class="submitBtn"
                            @click="submitForm">登录</el-button>
                </el-form-item>
                <div style="font-size:12px; float:right; margin-top: -15px;">
                    <router-link  to="/forgetpwd">忘记密码{{"\xa0\xa0\xa0"}}</router-link>
                    <router-link to="/register">点击注册</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script >
    import {ref, reactive, defineComponent, onMounted, watch, unref, toRefs} from 'vue'
    import { Avatar,User, Lock } from "@element-plus/icons-vue"
    import {validUsername}  from '../../utils/validate.js'
    import Sidentify from '../../components/identifyCode.vue'
    import {validateEmail, validateNull} from "@/utils/validate";
    import api from '@/api/api'
    export default {
        name: "Login",
        components: {
            // AlarmClock
            Avatar, User, Lock, Sidentify
        },
        data(){
            const validateUsername = (rule, value, callback) => {
                if (!validUsername(value)) {
                    callback(new Error('请输入正确的用户名'))
                } else {
                    callback()
                }
            }
            const validatePassword = (rule, value, callback) => {
                if (value.length < 6) {
                    callback(new Error('密码不能小于6位数'))
                } else {
                    callback()
                }
            }
            return {
                loginForm: {
                    username: '',
                    password: '',
                    oldPassword: '',
                    identifyCode: ''
                },
                loading: false,
                checkedPwd: false,
                redirect: undefined,
                passwordType: 'password',
                loginRules: {
                    username: [{required: true, trigger: 'blur', validator: validateEmail}],
                    password: [{required: true, trigger: 'blur', validator: validatePassword}],
                    identifyCode:[{required:true,trigger:'blur',validator:validateNull}]
                },
                identifyCode: '',
            }
        },
        methods: {
            submitForm: function () {
                this.$refs.loginForm.validate((valid) => {
                    if (!valid) {
                        return
                    } else {
                        const params = new URLSearchParams();
                        params.append('username', this.loginForm.username)
                        params.append('password', this.loginForm.password)
                        console.log(params);
                        api.login(params).then((res) => {
                            console.log(res)
                            if (res.state === 200) {
                                this.$message.success('登陆成功')
                                // 1、将登录成功之后的token，保存到客户端的sessionStorage中
                                window.sessionStorage.setItem('token', res.token)
                                // 2、项目中出现登录以外的其他api接口，必须在登陆之后访问
                                // 3、token只在当前网站打开期间生效，所以将token保存在sessionStorage中
                                // 4、通过编程式导航跳转到主页，路由地址为/home
                                this.$router.push('home')
                            } else {
                                this.$message.error('登录失败')
                            }
                        }).catch(err => console.log(err))
                    }
                })
            },
            refreshCode(){
                let identifyCodes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
                this.identifyCode = '';
                for (let i = 0; i < 4; i++) {
                    this.identifyCode += identifyCodes[Math.floor(Math.random() * identifyCodes.length)];
                }
            }
        }
    }

</script>

<style lang='less' scoped>
    li{
        list-style:none;
        margin: 30px;
    }
    .login-main{
        background:url("../../assets/images/img/背景1.png");
        width:100%;
        height:100%;
        position:fixed;
        background-size:100% 100%; /*防止重复*/
    }
    .Logo{
        float: left;
        margin-top: 40px;
        margin-left: 80px;
        width:240px;
    }
    /*小猫咪*/
    .login-img1{
        width:56px;
        margin-top: 60px;
        margin-left: -310px;
    }
    .login-info{
        width: 308px;
        height: 221px;
        position: absolute;
        top: -70px;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        padding: 50px 40px 40px 40px;
        box-shadow: -15px 15px 15px rgba(161, 179, 189, 0.7);
        opacity: 1;
        border-block-color: #242424;
        background-color: #ffffff;
        /*background: linear-gradient(*/
        /*        230deg,*/
        /*        rgba(142, 37, 37, 0.7) 0%,*/
        /*        rgba(130, 33, 33, 0.97) 100%*/
        /*);*/
    }
    .tab-item-title{
        position: relative;
        margin-top: -28px;
        margin-bottom: -30px;
        margin-left: -2px;
    }
    .inps input {
        border: none;
        color: #fff;
        background-color: transparent;
        font-size: 12px;
    }
    .current{
        font-size:30px;
        color:#1a1a1a;
    }
    .tab-info{
        margin: auto;
        width:400px;
        /* 父元素设置相对定位，这样子元素设置绝对定位后就会在父元素的左上角*/
        position: relative;
    }
    .tab-info span {
        /* 默认情况下的样式 */
        position: absolute;
        top: 4%;
        left: 16%;
        padding: 0px 7px;
        display: inline-block;
        margin-top: -0.55%;
        color: #9e9e9e;
        font-size: 14px;
        pointer-events: none;
        height: 40px;
        display: flex;
        align-items: center;
        transition: all 0.3s; /*平移上方时，添加一个过渡效果让其没有那么的不自然，我这边设置了0.3秒执行完这个上移的操作 */
    }
    .submitBtn {
        background-color: transparent;
        margin-left: 23px;
        margin-top: -32px;
        color: #39f;
        width: 358px;
    }

    /*验证码*/
    .identifiy-input{
        width:60%;
        margin-top: -2px;
        margin-left: 16px;
        margin-right: 20px;
    }

    /deep/ .el-form-item__error{
        padding-left: 17px;
    }
    /deep/.el-form-item__content {
        line-height: 0px;
    }

</style>