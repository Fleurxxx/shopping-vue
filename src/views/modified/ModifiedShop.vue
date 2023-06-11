<template>
    <div class="main">
        <el-form ref="modifyForm" :model="modifyForm" :rules="modifyRules">
            <div class="parent">
                <div class="left-box-info">
                    <el-form-item prop="merchantName" label="店铺名" :required="true"  style="margin-left: 30px">
                        <el-input type="text"
                                  class="inps"
                                  ref="username"
                                  auto-complete="off"
                                  v-model="modifyForm.merchantName"
                                  placeholder="请输入昵称"
                        />
                    </el-form-item>
                    <el-form-item prop="phone" label="手机号" :required="true" style="margin-left: 30px">
                        <el-input type="text"
                                  ref="phone"
                                  auto-complete="off"
                                  v-model="modifyForm.phone"
                                  placeholder="请输入手机号"/>
                    </el-form-item>
                    <el-form-item label="地区" prop="" :required="true" style="margin-left: 30px">
                        <el-cascader style="margin-left: 12px;width:95%;"
                                     :options="options"
                                     v-model="selectedOptions"
                                     placeholder="选择省/市/区"
                                     @change="addressChoose"></el-cascader>
                    </el-form-item>
                    <el-form-item label="详细地址" prop="detailed" :required="true" style="text-align:left">
                        <el-input placeholder="街道门牌、楼层房间号等信息" v-model="modifyForm.detailed"></el-input>
                    </el-form-item>
                    <el-form-item label="邮政编码" prop="postalCode" :required="true" style="text-align:left">
                        <el-input placeholder="邮政编码" v-model="modifyForm.postalCode"></el-input>
                    </el-form-item><br/>
                    <el-button class="modify-but"  @click="returnbut"> 返回 </el-button>
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
    import {
        provinceAndCityData,
        regionData,
        provinceAndCityDataPlus,
        regionDataPlus,
        CodeToText,
        TextToCode
    } from "element-china-area-data";
    import {personReq} from "@/api/request";
    export default {
        name: "ModifiedShop",
        data(){
            return{
                imageUrl:'',
                shopShow: true, //默认内容不显示
                // 省市区级联
                options: regionDataPlus,
                selectedOptions: [],
                modifyForm:{
                    addId:'',
                    merchantId:'',
                    merchantName:'',
                    merchantImage:'',
                    phone:'',
                    address: '',
                    detailed: '',
                    postalCode: '',
                    province:'',
                    city:'',
                    area:'',
                },
                modifyRules:{
                    merchantName: [{ required: true, message: '该项不能为空', trigger: 'blur' }],
                    phone: [{ required: true, message: '该项不能为空', trigger: 'blur' }],
                    detailed: [{ required: true, message: '该项不能为空', trigger: 'blur' }],
                    postalCode: [{ required: true, message: '该项不能为空', trigger: 'blur' }],
                    image: [{ required: true, message: '该项不能为空', trigger: 'blur' }],
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
            this.getShopInfo();
        },
        methods:{
            //获取店铺全部信息
            getShopInfo(){
                let data = {
                    uid: window.sessionStorage.getItem("uid")
                }
                console.log(data.uid)
                personReq.getShopInfo(data).then((res) => {
                    console.log("查询店铺信息为：")
                    console.log(res)
                    this.modifyForm.addId = res.data.addId
                    this.modifyForm.merchantId = res.data.merchantId
                    this.modifyForm.merchantName = res.data.merchantName
                    this.modifyForm.merchantImage = res.data.merchantImage
                    this.modifyForm.phone = res.data.phone
                    this.modifyForm.detailed = res.data.detailed
                    this.modifyForm.postalCode = res.data.postalCode
                }).catch(err => console.log(err))
            },
            //返回按钮
            returnbut(){
                this.$router.push('shopInfo')
            },
            //表单提交
            modifybut(){
                console.log(this.modifyForm.image)
                let data = {
                    uid: window.sessionStorage.getItem("uid"),
                    addId: this.modifyForm.addId,
                    merchantId: this.modifyForm.merchantId,
                    merchantName: this.modifyForm.merchantName,
                    merchantImage: this.modifyForm.merchantImage,
                    phone: this.modifyForm.phone,
                    merchantImage: this.modifyForm.merchantImage,
                    province:this.modifyForm.province,
                    city:this.modifyForm.city,
                    area:this.modifyForm.area,
                    detailed: this.modifyForm.detailed,
                    postalCode: this.modifyForm.postalCode
                }
                console.log(data)
                personReq.changeShopInfo(data).then((res) => {
                    console.log(res)
                    this.$message.success('修改成功！')
                    this.$router.push('shopInfo')
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
                this.modifyForm.merchantImage = str;
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
            /**省市区三级联动 */
            addressChoose(value) {
                console.log(value)
                console.log(this.selectedOptions)
                console.log(
                    "省市区：",
                    CodeToText[value[0]],
                    CodeToText[value[1]],
                    CodeToText[value[2]]
                );
                this.modifyForm.province = CodeToText[value[0]];
                this.modifyForm.city = CodeToText[value[1]];
                this.modifyForm.area = CodeToText[value[2]];
            },
        }
    }
</script>

<style scoped>
    .main{
        padding: 20px 100px 40px 60px; /*上右下左*/
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
