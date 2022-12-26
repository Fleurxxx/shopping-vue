<template>
    <div>
<!--        <h2>修改资料</h2>-->
        <el-form ref="modifyForm" :model="modifyForm" :rules="modifyRules">
            <div class="parent">
                <div class="left-box-info">
                    <el-form-item prop="username" label="昵称" :required="true" style="margin-left: 30px">
                        <el-input type="text"
                                  class="inps"
                                  ref="username"
                                  auto-complete="off"
                                  v-model="modifyForm.username"
                                  placeholder="请输入昵称"
                        />
                    </el-form-item>
                    <el-form-item prop="phone" label="手机号" :required="true" style="margin-left: 30px">
                        <el-input type="text"
                                  ref="phone"
                                  auto-complete="off"
                                  style="margin-left: -8px;"
                                  v-model="modifyForm.phone"
                                  placeholder="请输入手机号"/>
                    </el-form-item>
                    <el-form-item label="性别" prop="gender" :required="true" style="margin-left: 30px">
                        <div class="select-sex">
                            <el-radio-group v-model="modifyForm.gender" class="ml-4">
                                <el-radio label="男" size="large">男</el-radio>
                                <el-radio label="女" size="large">女</el-radio>
                            </el-radio-group>
                        </div>
                    </el-form-item>
                    <el-form-item  label="生日" :required="true" style="padding-left: 30px">
                        <el-form-item prop="birthday" style="margin-bottom: 10px;margin-left: 30px;width: 100%;">
                            <el-date-picker
                                    placeholder="选择日期时间"
                                    type="date"
                                    value-format="YYYY-MM-DD HH:mm:ss"
                                    format="YYYY-MM-DD HH:mm:ss"
                                    :picker-options="pickerOptions"
                                    v-model="modifyForm.birthday"
                                    style="width:100%"></el-date-picker>
                        </el-form-item>
                    </el-form-item>
                    <el-form-item prop="introduce" label="个人简介"  style="text-align:right;margin-left: 30px">
                        <el-input type="textarea"
                                  class="inps"
                                  ref="introduce"
                                  auto-complete="off"
                                  v-model="modifyForm.introduce"
                                  placeholder="请输入个人介绍"/>
                    </el-form-item>
                    <el-button class="modify-but" type="primary" @click="modifybut"> 确认修改 </el-button>
                </div>
                <div class="right-box-info">
                    <el-form-item label="头像"  prop="goodsImage" :required="true" style="text-align:right;">
                        <el-upload
                                class="avatar-uploader"
                                action="http://localhost:8088/users/uploadImg"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl" :src="imageUrl" style="width: 150px; height: 150px" class="avatar">
<!--                            <i  v-else class="el-icon-plus avatar-uploader-icon"></i>-->
                            <el-icon v-show="shopShow" style="width: 150px; height: 150px" class="avatar-uploader-icon"><Plus /></el-icon>
                        </el-upload>
                    </el-form-item>
                </div>
            </div>
        </el-form>
    </div>
</template>

<script>
    import {personReq} from '@/api/request'
    export default {
        name: "ModifiedData",
        data(){
            return{
                imageUrl:'',
                shopShow: true, //默认内容不显示
                modifyForm:{
                    uid:'',
                    username:'',
                    phone:'',
                    birthday:'',
                    gender:'',
                    image:'',
                    introduce:''
                },
                modifyRules:{
                    username: [{ required: true, message: '该项不能为空', trigger: 'blur' }],
                    birthday: [{ required: true, message: '该项不能为空', trigger: 'blur' }],
                    phone: [{ required: true, message: '该项不能为空', trigger: 'blur' }],
                    gender: [{ required: true, message: '该项不能为空', trigger: 'blur' }],
                    image: [{ required: true, message: '该项不能为空', trigger: 'blur' }],
                    introduce: [{ required: true, message: '该项不能为空', trigger: 'blur' }],
                },
                pickerOptions: {
                    //设置禁用状态，参数为当前日期
                    disabledDate(time) {
                        // return time.getTime() < Date.now(); //当天不可选
                        return time.getTime() < new Date().getTime() - 86400000; //  - 86400000是否包括当天
                    },
                    //控制时分秒不可选
                    selectableRange: (() => {
                        let data = new Date();
                        let hour = data.getHours();
                        let minute = data.getMinutes();
                        let second = data.getSeconds();
                        return [`${hour}:${minute}:${second} - 23:59:59`];
                    })()
                },
            }
        },
        mounted() {
            // console.log("用户的id:"+data.uid)
            this.getMinInfo();
        },
        methods:{
            //表单提交
            modifybut(){
                console.log(this.modifyForm.image)
                let data = {
                    uid: window.sessionStorage.getItem("uid"),
                    username: this.modifyForm.username,
                    phone: this.modifyForm.phone,
                    birthday: this.modifyForm.birthday,
                    gender:this.modifyForm.gender,
                    image:this.modifyForm.image,
                    introduce:this.modifyForm.introduce
                }
                console.log(data)
                personReq.changeInfo(data).then((res) => {
                    console.log(res)
                    this.$message.success('修改成功！')
                    this.$router.push('own')
                }).catch(err => console.log(err))
            },
            //获取本人全部信息
            getMinInfo(){
                let data = {
                    uid: window.sessionStorage.getItem("uid")
                }
                personReq.getUserInfo(data).then((res) => {
                    console.log("查询全部信息：")
                    console.log(res)
                    this.modifyForm.username = res.data.username
                    this.modifyForm.phone = res.data.phone
                    this.modifyForm.birthday = res.data.birthday
                    this.modifyForm.gender = res.data.gender
                    // this.imageUrl = `http://localhost:8088/static/${res.data.image}` //不会显示头像
                    this.modifyForm.introduce = res.data.introduce
                }).catch(err => console.log(err))
            },
            //头像显示
            handleAvatarSuccess(res, file) {
                console.log("头像显示：")
                console.log(file)
                console.log(res)
                console.log(file.raw)
                console.log(URL.createObjectURL(file.raw))
                this.imageUrl = URL.createObjectURL(file.raw);
                // imageUrl.value = res.message
                if(this.shopShow===true){
                    this.shopShow = !this.shopShow //使false变为true显示
                }
                // console.log("图表显示："+this.shopShow )
                let pos = res.message.lastIndexOf("/");//'/所在的最后位置'
                let str = res.message.slice(pos+1);//截取文件名称字符串
                this.modifyForm.image = str;
            },
            //上传头像
            beforeAvatarUpload(file) { // 上传前的方法,限制上传的大小,还有格式
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                    this.$message.error('图片大小不能超过2MB!')
                    return false
                }else if(file.type!=='image/jpg'&&file.type!=='image/png'){
                    ElMessage.error('请选择图片类型的文件！')
                    return false
                }
                return true
            },
        }

    }
</script>

<style lang="less" scoped>
    ::v-deep .el-input__wrapper {
        padding: 0;
    }
    /deep/.el-upload {
        border: 2px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .parent {
        padding: 50px 90px 50px 90px;
        display: flex;
        justify-content: space-between;
    }
    .right-box-info{
        padding-top:10px;
    }
    .select-sex{
        padding: 13px 0 0 30px;
        margin-bottom: -10px;
    }
    .modify-but{
        height: 38px;
        width: 110px;
    }
</style>
