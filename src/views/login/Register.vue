<template>
    <div class="register-body">
        <div class="register-main">
            <div class="register-left-box">
                <img class="left-box-img1" src="../../assets/images/img/注册.png">
                <el-form ref="registerForm" :model="registerForm" :rules="registerRules">
                    <div class="left-box-info">
                        <img class="left-box-img2" src="../../assets/images/vectorgraph/logo3.png">
                        <el-form-item prop="username">
                            <el-input type="text"
                                      class="inps"
                                      ref="username"
                                      auto-complete="off"
                                      prefix-icon="User"
                                      v-model="registerForm.username"
                                      placeholder="请输入邮箱"/>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input type="password"
                                      class="inps"
                                      ref="password"
                                      auto-complete="off"
                                      prefix-icon="Lock"
                                      v-model="registerForm.password"
                                      placeholder="请输入6～12个字母或者数字"/>
                        </el-form-item>
                        <el-form-item prop="pwdagain">
                            <el-input type="password"
                                      class="inps"
                                      ref="pwdagain"
                                      auto-complete="off"
                                      prefix-icon="Lock"
                                      v-model="registerForm.pwdagain"
                                      placeholder="请再次确认密码"/>
                        </el-form-item>
                        <el-form-item prop="identifyCode">
                            <el-input style="width: 177px;margin-left: 75px;"
                                      ref="identifyCode"
                                      type="text"
                                      maxlength="6"
                                      auto-complete="off"
                                      v-model="registerForm.identifyCode"
                                      placeholder="请输入验证码"/>{{"\xa0\xa0\xa0"}}
                            <el-button>获取验证码</el-button>
                        </el-form-item>
                        <el-button class="register-but" type="primary" @click="regForm">注册</el-button>
                    </div>
                    <div class="register-return">
                        <a style="color: #c9c9c9">已有帐号{{"\xa0\xa0\xa0"}}</a>
                        <router-link to="/">直接登录</router-link>
                    </div>
                </el-form>
            </div>
            <div class="register-right-box">
                <img class="right-box-logo" src="../../assets/images/vectorgraph/logo4.png">
            </div>

        </div>
    </div>

</template>

<script>
    import {ref, reactive, defineComponent, onMounted, watch, unref, toRefs} from 'vue'
    import {validateEmail, validateNull} from "@/utils/validate";
    import api from '@/api/api'

    export default {
        name: "Register",
        data(){
            const validatePass1 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else if (value.length < 6) {
                    callback(new Error('密码不能小于6位数'))
                }else{
                    // if (this.registerForm.password !== '') {
                    //     this.$refs.registerForm.validateField('confirmPwd');
                    // }
                    callback();
                }
            };
            const validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.registerForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return{
                registerForm:{
                    username:'',
                    password:'',
                    pwdagain:'',
                    identifyCode:'',
                    // 验证码的key，因为前后端分离，这里验证码不能由后台存入session，所以交给vue状态管理
                    codeToken: ""
                },
                registerRules:{
                    username: [{required: true, trigger: 'blur', validator: validateEmail}],
                    password: [{required: true, trigger: ["blur", "change"], validator: validatePass1}],
                    pwdagain:[{required:true,trigger:["blur", "change"], validator:validatePass2}],
                    identifyCode:[{required:true,trigger:'blur',validator:validateNull}]
                }
            };
        },
        methods: {
            regForm: function(){
                this.$refs.registerForm.validate((valid) => {
                    if (!valid) {
                        return
                    } else {
                        const params = new URLSearchParams();
                        params.append('username', this.registerForm.username)
                        params.append('password', this.registerForm.password)
                        console.log(params);
                        let data = {
                            email: this.registerForm.username,
                            password: this.registerForm.password
                        }
                        api.reg(data).then(res => {
                            console.log(res)
                            if (res.state === 200) {
                                this.$message.success('注册成功')
                                window.sessionStorage.setItem('token', res.token)
                                this.$router.push('/')
                            } else {
                                this.$message.error('注册失败')
                            }
                        }).catch(err => console.log(err))
                    }
                })
            }
        }

    }
</script>

<style lang='less' scoped>
     /*整体布局*/
    .register-body{
        margin:0 auto;
        padding : 0;
        background-color: #100e0e;
        overflow: hidden;
        position : absolute;
        width : 100%;
        height : 100%;

    }
    .register-main{
        margin-top: 80px;
        margin-left: 100px;
        margin-right: -250px;
    }
    .register-left-box{
        /*position:relative;*/
        background-color: rgb(64, 64, 64);
        width: 680px;
        height: 400px;
        float: left;
    }
    .register-right-box{
        background-color: #bc0105;
        /*overflow: hidden;*/
        width: 400px;
        height: 400px;
        float: right;
        margin-right: 335px;
        flex:1;
    }
    .right-box-logo{
        width:159px;
        margin-top: 121px;
    }
    /****左盒子注册内容****/
    /* 注册标*/
     .left-box-img1{
         width: 145px;
         margin-left: 80px;
         margin-top: 162px;
         float: left;
     }
     /*猫猫*/
     .left-box-img2{
         width:52px;
         margin-bottom: -6px;
         margin-left: -6px;
     }
    .left-box-info{
        margin-top: 65px;
    }
    .inps{
        /*font-size: 12px;*/
        width: 290px;
        margin-left: 75px;
    }
    .register-but{
        width: 291px;
        margin-left: 210px;
    }
    .register-return{
        float:right;
        font-size:14px;
        margin-top: 12px;
        margin-right: 170px;
    }
     /deep/ .el-form-item__error {
         padding-left: 86px;
     }
</style>