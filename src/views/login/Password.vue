<template>
    <div class="register-body">
        <div class="register-main">
            <div class="register-left-box">
                <a class="left-box-title1">密码</a>
                <a class="left-box-title2">找回</a>
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
                            <el-button @click="sendCode" v-bind:disabled="dis">
                                <span class="num_green"
                                      v-show="showNum"
                                      v-bind:class="{num:wait_timer>0}">{{this.wait_timer + "s "}}</span>
                                <span class="span_number"
                                      v-bind:class="{gray_span:wait_timer>0}">{{ getCodeText() }}</span>
                            </el-button>
                        </el-form-item>
                        <el-button class="register-but" type="primary" @click="regForm">确认修改</el-button>
                    </div>
                    <div class="register-return">
                        <a style="color: #c9c9c9">想起来了！{{"\xa0\xa0"}}</a>
                        <router-link to="/">返回登录</router-link>
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
    import {personReq} from '@/api/request'

    export default {
        name: "Password",
        data(){
            const validatePass1 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else if (value.length < 6) {
                    callback(new Error('密码不能小于6位数'))
                }else{
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
                },
                showNum: false,
                wait_timer: false,
                dis: false
            };
        },
        methods: {
            sendCode: function(){
                let data = {
                    email:this.registerForm.username
                }
                this.showNum = true;
                this.dis = true;
                this.wait_timer = 60;
                var that = this;
                var timer_interval = setInterval(function() {
                    if (that.wait_timer > 0) {
                        that.wait_timer--;
                    } else {
                        clearInterval(timer_interval);
                    }
                }, 1000);
                personReq.getCode(data).then(res => {
                    console.log(res)
                    if (res.state === 200) {
                        console.log("验证码已发送")
                    } else {
                        if(res.message===null){
                            this.$message.error("验证码发送失败")
                        } else{
                            this.$message.error(res.message)
                        }
                    }
                })
            },
            getCodeText: function() {
                if (this.wait_timer > 0) {
                    return "已发送";
                }
                if (this.wait_timer === 0) {
                    this.dis = false;
                    this.showNum = false;
                    return "重新获取";
                }
                if (this.wait_timer === false) {
                    return "获取验证码";
                }
            },
            regForm: function(){
                this.$refs.registerForm.validate((valid) => {
                    if (!valid) {
                        return
                    } else {
                        let data = {
                            email: this.registerForm.username,
                            password: this.registerForm.password,
                            code: this.registerForm.identifyCode
                        }
                        personReq.changepwd(data).then(res => {
                            console.log(res)
                            if (res.state === 200) {
                                this.$message.success('密码设置成功！')
                                this.$router.push('/')
                            } else {
                                this.$message.error(res.message)
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
    /* 找回密码 */
    .left-box-title1{
        width: 145px;
        margin-left: 80px;
        margin-top: 219px;
        float: left;
        color: #f9f9f9;
        font-weight: bold;
        font-size:50px;
        display:block
    }
    .left-box-title2{
        float: left;
        font-weight: bold;
        font-size:50px;
        margin-top:161px;
        margin-left:-122px;
        color: #f9f9f9;
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
