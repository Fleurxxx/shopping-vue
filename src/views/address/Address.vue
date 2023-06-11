<template>
    <div>
        <div>
            <el-dialog
                    v-model="dialogVisible"
                    title="填写收货地址信息"
                    width="30%"
                    :before-close="closeDialog">
                <el-form :inline="true" :model="form" :rules="rules" ref="form" label-width="90px" >
                    <el-form-item label="姓名" prop="rename">
                        <el-input placeholder="收货人姓名" v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="电话" prop="phone">
                        <el-input placeholder="收货人手机号" v-model="form.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="地区" prop="" :required="true" >
                        <el-cascader style="width:100%;"
                                     :options="options"
                                     v-model="selectedOptions"
                                     placeholder="选择省/市/区"
                                     @change="addressChoose"></el-cascader>
                    </el-form-item>
                    <el-form-item label="详细地址" prop="detailed" :required="true" style="text-align:left">
                        <el-input placeholder="街道门牌、楼层房间号等信息" v-model="form.detailed"></el-input>
                    </el-form-item>
                    <el-form-item label="邮政编码" prop="postalCode" :required="true" style="text-align:left">
                        <el-input placeholder="邮政编码" v-model="form.postalCode"></el-input>
                    </el-form-item><br/>
                    <el-form-item label="设为默认收货地址" prop="prime"  label-width="180px">
                        <el-switch
                                v-model="form.prime"
                                class="ml-2"
                                style="--el-switch-on-color: orangered; --el-switch-off-color: #ffffff"
                        />
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button class="but formbt" @click="closeDialog">取 消</el-button>
                    <el-button class="but formbt" type="primary"  @click="submit">确 定</el-button>
                </div>
            </el-dialog>
        </div>
        <div class="add-header">
            <!-- 新增按钮  -->
            <el-button class="but" type="primary" @click="createAddress">新 增</el-button>
        </div>
        <div class="add-table">
            <!-- 用户数据Table -->
            <el-table :data="tableData" stripe style="width: 98%" height="90%" @select="select">
                <el-table-column prop="name" align="center" label="收件人" width="100px">
                </el-table-column>
                <el-table-column prop="phone" align="center" label="手机号" width="120px">
                </el-table-column>
                <el-table-column prop="postalCode" align="center" label="邮政编码" width="90px">
                </el-table-column>
                <el-table-column prop="address" align="center" label="地址">
                </el-table-column>
                <!-- 自定义列 -->
                <el-table-column label="操作" align="center">
                    <template #default="scope" >
                        <el-button class="but" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button class="but" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
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
        name: "AddressManage",
        data() {
            return {
                // 表单是否打开
                dialogVisible: false,
                // 省市区级联
                options: regionDataPlus,
                selectedOptions: [],
                // 列表数据
                tableData: [],
                // 打开表单:新建0,编辑1
                modalType: 0,
                form: {
                    receName: '',
                    phone: '',
                    address: '',
                    detailed: '',
                    postalCode: '',
                    prime: false,
                    province:'',
                    city:'',
                    area:'',
                    addId:''
                },
                // 表单验证规则
                rules: {
                    receName: [{ required: true, message: '该项不能为空', trigger: 'blur' }],
                    phone: [{ required: true, message: '该项不能为空', trigger: 'blur' }],
                    detailed: [{ required: true, message: '该项不能为空', trigger: 'blur' }],
                    postalCode: [{ required: true, message: '该项不能为空', trigger: 'blur' }],
                },

            };
        },
        mounted() {
            this.getAddress();
        },
        methods: {
            getAddress(){
                let data = {
                    uid: window.sessionStorage.getItem("uid")
                }
                personReq.findAddress(data).then((res) => {
                    console.log(res)
                    this.tableData = res.data
                    console.log(this.tableData.length)
                    this.total = this.tableData.length || 0
                }).catch(err => console.log(err))
            },
            // 关闭对话框
            closeDialog() {
                // 先重置
                this.$refs.form.resetFields()
                // 后关闭
                this.dialogVisible = false
            },
            submit(){
                this.$refs.form.validate((valid) => {
                    // 符合校验
                    if (valid) {
                        let isPrime = ''
                        if(this.form.prime===true){
                            isPrime = 1
                        }else{
                            isPrime = 0
                        }
                        let data = {
                            uid: window.sessionStorage.getItem("uid"),
                            addId: this.form.addId,
                            name:this.form.name,
                            phone:this.form.phone,
                            province:this.form.province,
                            city:this.form.city,
                            area:this.form.area,
                            detailed:this.form.detailed,
                            postalCode:this.form.postalCode,
                            prime:isPrime
                        }
                        console.log(data.rename)
                        // 提交数据
                        if (this.modalType === 0) {
                            // 新增地址
                            personReq.addAddress(data).then((res) => {
                                console.log(res)
                                if (res.code === 200) {
                                    this.getAddress();
                                    this.$message.success('添加成功')
                                } else {
                                    if(res.message===null){
                                        this.$message.error("添加失败")
                                    }else{
                                        this.$message.error(res. c )
                                    }
                                }
                            }).catch(err => console.log(err))
                            this.closeDialog()
                        }else{
                            // 修改地址
                            personReq.updateAddress(data).then((res) => {
                                console.log(res)
                                if (res.code === 200) {
                                    this.getAddress();
                                    this.$message.success('修改成功')
                                } else {
                                    if(res.message===null){
                                        this.$message.error("修改失败")
                                    }else{
                                        this.$message.error(res.message)
                                    }
                                }
                            }).catch(err => console.log(err))
                            this.closeDialog()
                        }
                    }
                })

            },
            // 打开表单
            openForm() {
                this.dialogVisible = true
            },
            //新增按钮
            createAddress(){
                this.modalType = 0
                this.openForm()
            },
            // 编辑按钮
            handleEdit(index) {
                console.log(index)
                this.modalType = 1
                this.form.receName = index.receName
                this.form.phone = index.phone
                this.form.postalCode = index.postalCode
                this.form.detailed = index.detailed
                this.form.addId = index.addId
                if(index.prime===1){
                    this.form.prime=true
                }else{
                    this.form.prime=false
                }
                this.openForm()
            },
            // 删除按钮
            handleDelete(index) {
                let data={
                    uid: window.sessionStorage.getItem("uid"),
                    addId: index.addId,
                }
                this.$confirm('此操作将永久删除该地址, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // 删除操作:根据后端接口,参数是对象,id是唯一标识符{
                    personReq.deleteAddress(data).then((res) => {
                        console.log(res)
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        })
                        this.getAddress();
                    }).catch(err => console.log(err))
                }).catch(() => {
                    // 点击取消:不删除了
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
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
                this.form.province = CodeToText[value[0]];
                this.form.city = CodeToText[value[1]];
                this.form.area = CodeToText[value[2]];
            },
        }
    }
</script>

<style lang="less" scoped>
    ::v-deep .el-input__wrapper {
        padding: 0;
    }
    .add-header{
        text-align:right;
        padding-top:10px;
        padding-right: 35px;
        padding-bottom: 20px;
    }
    .but{
        height: 38px;
    }
    .formbt{
        width: 150px
    }
</style>
