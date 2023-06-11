<template xmlns:>
    <div class="message">
        <!--        <h1>商品管理</h1>-->
        <el-dialog
                v-model="dialogVisible"
                title="插入商品信息"
                width="35%"
                :before-close="closeDialog">
            <!-- 表单Form -->
            <!-- ref=form:为了通过this.$refs调用组件的方法 -->
            <el-form :inline="true" :model="form" :rules="rules" ref="form" label-width="90px" >
                <!-- 每一项表单域:el-form-item -->
                <el-form-item label="商品图片"  prop="goodsImage" :required="true" style="text-align:left;">
                    <el-upload
                            class="avatar-uploader"
                            action="http://192.168.47.164:8080/user/uploadImg"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" style="width: 100px; height: 100px" class="avatar">
                        <!--                            <i  v-else class="el-icon-plus avatar-uploader-icon"></i>-->
                        <el-icon style="width: 100px; height: 100px" class="avatar-uploader-icon"><Plus /></el-icon>
                    </el-upload>
                    <!--                    <el-image-->
                    <!--                            style="width: 100px; height: 100px"-->
                    <!--                            :src="form.goodsImage"-->
                    <!--                    ></el-image>-->
                    <!--                    <div class="goods-img">-->
                    <!--                        <img  alt="" class="dispalyimg" >-->
                    <!--                        <input type="file"  class="upinput"  ref="file" @change="showimg"><i class="el-icon-plus" id="changes" @click="changeimg"></i>-->
                    <!--                    </div>-->
                </el-form-item>
                <el-form-item label="名称" prop="goodsTitle">
                    <el-input placeholder="请输入商品名称" v-model="form.goodsTitle"></el-input>
                </el-form-item>
                <el-form-item label="单一售价" prop="goodsPrice">
                    <el-input placeholder="请输入商品售价" v-model="form.goodsPrice"></el-input>
                </el-form-item>
                <el-form-item label="新品与否" prop="isNew" :required="true" style="text-align:left">
                    <div class="mb-2 flex items-center text-sm">
                        <el-radio-group v-model="form.isNew" class="ml-4">
                            <el-radio label="1" size="large">是</el-radio>
                            <el-radio label="0" size="large">不是</el-radio>
                        </el-radio-group>
                    </div>
                </el-form-item>
                <el-form-item label="规格" prop="isSpec" :required="true" style="text-align:left">
                    <div class="mb-2 flex items-center text-sm">
                        <el-radio-group v-model="form.isSpec" class="ml-4">
                            <el-radio label="0" size="large">单一规格</el-radio>
                            <el-radio label="1" size="large" >多种规格</el-radio>
                        </el-radio-group>
                    </div>
                </el-form-item>
                <el-form-item label="规格标签"  label-width="80px" prop="models" v-if="form.isSpec == 1" :required="true" style="text-align:left">
                    <li v-for="(item, index) in form.models" :key="index" style="width: 150px; display: inline-block;">
                        <el-input v-model="item.value" :maxlength="4" style="width: 120px; display: inline-block;" />
                        <el-input-number v-model="form.stocks" :min="1" :max="9999" @change="handleChange" style="width: 120px;margin-top:5px"/>
                        <i class="iconfont icon-jianshao" @click.prevent="removeDomain(item)" style="margin-left: 5px; font-size: 10px" />
                    </li>
                    <i class="iconfont icon-tianjia" v-if="form.models && form.models.length <=10" @click="addDomain" style="font-size: 10px" />
                </el-form-item>
                <el-form-item label="库存数量" prop="stocks" v-if="form.isSpec == 0">
                    <el-input-number v-model="form.stocks" :min="1" :max="10" @change="handleChange" />
                </el-form-item>
                <el-form-item label="是否上架" prop="goodsStatus" :required="true" style="text-align:left">
                    <el-select v-model="form.goodsStatus" placeholder="请选择规格">
                        <el-option label="是" :value="1"></el-option>
                        <el-option label="不是" :value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item v-if="form.goodsStatus" label="上架时间" :required="true" style="text-align:left;margin-left: 30px">
                    <el-form-item prop="audit_time">
                        <el-date-picker
                                placeholder="选择日期时间"
                                type="datetime"
                                value-format="YYYY-MM-DD HH:mm:ss"
                                format="YYYY-MM-DD HH:mm:ss"
                                :picker-options="pickerOptions"
                                v-model="form.audit_time"
                                style="width:100%"></el-date-picker>
                    </el-form-item>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeDialog">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </div>
        </el-dialog>
        <div class="manage-header">
            <div class="goods-msg-but">
                <!-- 新增按钮  -->
                <el-button type="primary" @click="handlecreate">新 增</el-button>
<!--                <el-button type="primary" @click="allList">全 部</el-button>-->
<!--                <el-button type="primary" @click="upList">已上架</el-button>-->
<!--                <el-button type="primary" @click="downList">已下架</el-button>-->
            </div>
            <!-- 搜索模块-->
            <div class="goods-msg-search">
                <el-form :model="searchForm" :rules="searchForm" ref="searchForm" :inline="true">
                    <el-form-item>
                        <el-input v-model="searchForm.name" placeholder="请输入名称"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="search">查询</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="common-table">
            <!-- 商品数据Table -->
            <el-table :data="tableData" stripe style="width: 98%" height="90%" @select="select">
                <!--                <el-table-column prop="uid" label=""-->
                <!--                                 type="selection"-->
                <!--                                 :selectable="selected">-->
                <!--                </el-table-column>-->
                <el-table-column align="center" prop="image" label="图片" width="140">
                    <template #default="scope" >
                        <img :src="`${$store.getters.getUser.name}${scope.row.goodsImage}`" alt="" width="90" height="90">
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="goodsTitle" label="名称" width="140">
                </el-table-column>
                <el-table-column align="center" prop="goodsPrice" label="单一售价">
                </el-table-column>
                <el-table-column align="center" prop="isSpec" label="规格" width="90">
                </el-table-column>
                <el-table-column align="center" prop="stocks" label="库存" width="110">
                </el-table-column>
                <el-table-column align="center" prop="goodsStatus" label="状态">
                      <template #default="scope" >
                    <el-switch v-model="scope.row.goodsStatus"
                               @click="changeSwitch(scope.row)"
                               inline-prompt
                               active-text="上架"
                               inactive-text="下架"/>
                </template>
                </el-table-column>
                <el-table-column  align="center" prop="auditTime" label="上架时间">
                </el-table-column>
                <!-- 自定义列 -->
                <el-table-column align="center" label="操作" >
                    <template #default="scope" >
                        <!--                        <el-button style="padding-left: 15px" type="primary" @click="handleEdit()">编辑</el-button>-->
                        <el-button style="padding-right: 15px" type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 分页 -->
        <div class="pager">
            <el-pagination  background
                            layout="prev, pager, next"
                            :page-size="5"
                            :total="total"
                            @current-change="handlePage"/>
        </div>
    </div>
</template>

<script >
    import {ref, reactive, defineComponent, computed} from "vue";
    import {personReq} from "@/api/request";
    import { ElMessage } from 'element-plus'
    import { Plus } from '@element-plus/icons-vue'
    const imageUrl = ref('')//图片回显值
    export default {
        name: "GoodsManage",
        data() {
            return {
                // 表单是否打开
                dialogVisible: false,
                // 列表数据
                tableData: [],
                // 打开表单:新建0,编辑1
                modalType: 0,
                imageUrl:'',
                total:0, //当前数据总条数
                pageData:{
                    page:1,
                    limit:5
                },
                form: {
                    goodsTitle: '',
                    goodsPrice: '',
                    isNew:'1',
                    isSpec: '0', //规格（判断）
                    models: [{
                        value:'',
                    }], //规格
                    stocks: '',//库存
                    goodsStatus: '', //是否上架 0待审核，1上架，2下架
                    audit_time: '', //上架时间
                    goodsImage: '',//上传图片
                    merchantId: '', //店铺id
                },
                // 表单验证规则
                rules: {
                    goodsTitle: [{ required: true, message: '请输入商品名', trigger: 'blur' }],
                    goodsPrice: [{ required: true, message: '请输入价格', trigger: 'blur' }],
                    models: [{ required: true, message: '请录入对应规格', trigger: 'blur' }],
                    stocks: [{ required: true, message: '请录入对应库存', trigger: 'blur' }],
                    goodsStatus: [{ required: true, message: '该项不能为空', trigger: 'blur' }],
                    goodsImage: [{ required: true, message: '请选择一张商品图片', trigger: 'blur' }],
                    audit_time: [{ required: true, message: '请选择上架时间', trigger: 'blur' }],
                },
                // 搜索框表单
                searchForm: {
                    name: ''
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
        watch: {
            //监听input输入，不能输入空格
            "form.models" (val) {
                if (typeof (val) === "string") {
                    this.form.models.value = val.replace(/\s/g, "");
                }
            },
        },
        mounted() {
            this.getGoodsList();
        },
        methods: {
            handleAvatarSuccess(res, file) {
                console.log(file)
                console.log(res)
                this.imageUrl = URL.createObjectURL(file.raw);
                imageUrl.value = res.data
                console.log("头像路径"+res.data)
                let pos = res.data.lastIndexOf("/");//'/所在的最后位置'
                let str = res.data.slice(pos+1);//截取文件名称字符串
                console.log(str)
                this.form.goodsImage = str;
            },
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
            getAssetsImages(name){
                return new URL(`/static/${name}`, import.meta.url).href; //本地文件路径
            },
            // 预览图片
            showimg () {
                const that = this
                console.log(that.$refs.file.files[0])
                var fr = new FileReader()
                fr.readAsDataURL(that.$refs.file.files[0])
                fr.onload = function () {
                    that.form.goodsImage = fr.result
                }
            },
            // 更换图片
            changeimg () {
                this.$refs.file.dispatchEvent(new MouseEvent('click'))
            },
            // 创建按钮
            handlecreate() {
                this.modalType = 0
                this.openForm()
            },
            // 编辑按钮
            handleEdit(index) {
                this.modalType = 1
                this.openForm()
                // 深拷贝
                this.form = JSON.parse(JSON.stringify(index))
            },
            // 打开表单
            openForm() {
                this.dialogVisible = true
            },
            handleDelete(index){
                console.log(index.goodsId)
                let data={
                    goodsId:index.goodsId

                }
                this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // 删除操作:根据后端接口,参数是对象,id是唯一标识符{
                    personReq.deleteGoods(data).then((res) => {
                        console.log(res)
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        })
                        this.getGoodsList();
                    }).catch(err => console.log(err))
                }).catch(() => {
                    // 点击取消:不删除了
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },
            // 表单提交
            submit() {
                // 要用箭头函数,若用function会报错,不知道为什么
                this.$refs.form.validate((valid) => {
                    // 符合校验
                    if (valid) {
                        let formData = {
                            goodsTitle:this.form.goodsTitle,
                            goodsPrice:this.form.goodsPrice,
                            isNew: this.form.isNew,
                            isSpec: this.form.isSpec, //规格（判断）
                            // models: [{ //规格
                            //     value:this.form.models.value,
                            // }],
                            stocks: this.form.stocks,//库存
                            goodsStatus: this.form.goodsStatus, //是否上架 0待审核，1上架，2下架
                            audit_time: this.form.audit_time, //上架时间
                            goodsImage: this.form.goodsImage,//上传图片
                            merchantId: window.sessionStorage.getItem("merchantId"),
                            uid: window.sessionStorage.getItem("uid")
                        }
                        // 提交数据
                        if (this.modalType === 0) {
                            console.log(formData)
                            // 新增
                            personReq.addGoods(formData).then((res) => {
                                console.log(res)
                                if (res.code === 200) {
                                    this.getGoodsList();
                                    this.$message.success('商品添加成功')
                                } else {
                                    if(res.message===null){
                                        this.$message.error("商品添加失败")
                                    }else{
                                        this.$message.error(res.message)
                                    }
                                }
                            }).catch(err => console.log(err))
                            // 清空,关闭
                            this.closeDialog()
                        } else {
                            // 编辑
                            personReq.updateGoods(this.form).then((res) => {
                                console.log(res)
                                if (res.code === 200) {
                                    this.getGoodsList();
                                    this.$message.success('商品编辑成功')
                                } else {
                                    if(res.message===null){
                                        this.$message.error("商品编辑失败")
                                    }else{
                                        this.$message.error(res.message)
                                    }
                                }
                            }).catch(err => console.log(err))
                        }
                        // 清空,关闭
                        this.closeDialog()
                        this.imageUrl = ''
                    }
                })
            },
            //搜索
            search(){
                this.getGoodsList();
            },
            //所有商品
            allList(){
                this.getGoodsList();
            },
            //所有上架商品
            upList(){
                let data = {
                    merchantId: window.sessionStorage.getItem("merchantId"),
                    page : this.pageData.page,
                    limit : 5,
                    key : this.searchForm.name
                }
                personReq.getUpGoodsInShop(data).then((res) => {
                    console.log(res)
                    if (res.code === 200){
                        for(var i=0; i<res.data.records.length; i++){
                            if(res.data.records[i].isSpec === 1){
                                res.data.records[i].isSpec = '多种规格'
                            }else{
                                res.data.records[i].isSpec = '单一规格'
                            }

                            if(res.data.records[i].isNew === 1){
                                res.data.records[i].isNew = '是'
                            }else {
                                res.data.records[i].isNew = '不是'
                            }
                            if(res.data.records[i].goodsStatus === 1){
                                res.data.records[i].goodsStatus = true
                            }else {
                                res.data.records[i].goodsStatus = false
                            }
                            res.data.records[i].goodsImage = res.data.records[i].goodsId+res.data.records[i].goodsImage
                            // console.log(res.data.records[i].goodsImage)
                        }
                        this.tableData = res.data.records
                        this.total = res.data.total || 0
                        this.searchForm.name = ''
                    } else{
                        this.$message.error("加载失败")
                    }
                }).catch(err => console.log(err))
            },
            //所有下架商品
            downList(){
                let data = {
                    merchantId: window.sessionStorage.getItem("merchantId"),
                    page : this.pageData.page,
                    limit : 5,
                    key : this.searchForm.name
                }
                personReq.getDownGoodsInShop(data).then((res) => {
                    console.log(res)
                    if (res.code === 200){
                        for(var i=0; i<res.data.list.length; i++){
                            if(res.data.list[i].isSpec === 1){
                                res.data.list[i].isSpec = '多种规格'
                            }else{
                                res.data.list[i].isSpec = '单一规格'
                            }

                            if(res.data.list[i].isNew === 1){
                                res.data.list[i].isNew = '是'
                            }else {
                                res.data.list[i].isNew = '不是'
                            }
                            if(res.data.list[i].goodsStatus === 1){
                                res.data.list[i].goodsStatus = true
                            }else {
                                res.data.list[i].goodsStatus = false
                            }

                        }
                        this.tableData = res.data.list
                        this.total = res.data.total || 0
                        this.searchForm.name = ''
                    } else{
                        this.$message.error("加载失败")
                    }
                }).catch(err => console.log(err))
            },
            getGoodsList(){
                let data = {
                    uid:  parseInt(window.sessionStorage.getItem("uid")),
                    page : this.pageData.page,
                    limit : 5,
                    key : this.searchForm.name
                }
                console.log("关键字："+data.key)
                console.log("当前页数："+data.page)
                console.log(data)
                personReq.getGoodsInShop(data).then((res) => {
                    console.log(res)
                    if (res.code === 200){
                        for(var i=0; i<res.data.records.length; i++){
                            if(res.data.records[i].isSpec === 1){
                                res.data.records[i].isSpec = '多种规格'
                            }else{
                                res.data.records[i].isSpec = '单一规格'
                            }

                            if(res.data.records[i].isNew === 1){
                                res.data.records[i].isNew = '是'
                            }else {
                                res.data.records[i].isNew = '不是'
                            }
                            // if(res.data.records[i].goodsStatus === 1){
                            //     res.data.records[i].goodsStatus = true
                            // }else {
                            //     res.data.records[i].goodsStatus = false
                            // }
                            // res.data.records[i].goodsImage = res.data.records[i].goodsId+res.data.records[i].goodsImage
                            // console.log(res.data.records[i].goodsImage)
                        }
                        this.tableData = res.data.records
                        // console.log("===============================")
                        // console.log(res.data.total)
                        this.total = res.data.total || 0
                        // this.searchForm.name = ''
                    } else{
                        this.$message.error("加载失败")
                    }
                }).catch(err => console.log(err))
            },
            //当前页数
            handlePage(val){
                console.log(val)
                this.pageData.page = val
                this.getGoodsList()
            },
            // 关闭对话框
            closeDialog() {
                // 先重置
                this.$refs.form.resetFields()
                // 后关闭
                this.dialogVisible = false
            },
            removeDomain(item) {
                let index = this.form.models.indexOf(item)
                if (index !== -1) {
                    this.form.models.splice(index, 1)
                }
            },
            addDomain() {
                this.form.models.push({
                    value: '',
                })
            },
            changeSwitch(item){
                //调用后台修改接口
                console.log(item.goodsStatus);
                if(item.goodsStatus===true){ //要上架
                    // item.goodsStatus=0;
                    personReq.goodsStatus(item).then((res) => {
                        console.log(res)
                        this.getGoodsList();
                        // this.downList();
                    }).catch(err => console.log(err))
                }else{ //要下架
                    // item.goodsStatus=1;
                    personReq.goodsStatus(item).then((res) => {
                        console.log(res)
                        this.getGoodsList();
                        // this.upList();
                    }).catch(err => console.log(err))
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .message {
        height: 90%;

        .manage-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 30px 0 30px;
        }

        .common-table {
            height: 90%;
            position: relative;

            .pager {
                position: absolute;
                right:20px;
                bottom: 0;
            }
        }
        .goods-img{
            position:relative;
            width:100px;
            height:100px;
            background-color: #9e9e9e;
            background:url("../../assets/images/vectorgraph/上传图片.png") no-repeat center/cover;
            margin-top: -1px;
            margin-left: 11px;
            input{
                width: 100%;
                height: 100%;
                opacity: 0;
            }
            img{
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;left: 0;
            }
        }
    }
    /deep/.el-upload {
        border: 2px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .el-upload:hover { //触碰到以后边框变颜色（暂时没用
        border: #409EFF;
    }
    .pager{
        padding-left: 320px;
        padding-top: 30px;
        padding-bottom: 0px;
    }
</style>
