<template>
    <div class="manage">
        <el-dialog
                v-model="dialogVisible"
                title="修改该用户资料"
                width="40%"
                :before-close="closeDialog">
            <el-form :inline="true" :model="form" :rules="rules" ref="form" label-width="90px" >
                <el-form-item label="昵称" prop="username">
                    <el-input placeholder="请输入昵称" v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                    <el-input placeholder="请输入手机号" v-model="form.phone"></el-input>
                </el-form-item>
                <el-form-item label="账号状态" prop="state" :required="true" style="text-align:left">
                    <el-select v-model="form.state" placeholder="账号状态">
                        <el-option label="正常" :value="0"></el-option>
                        <el-option label="会员" :value="1"></el-option>
                        <el-option label="封号" :value="2"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeDialog">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </div>
        </el-dialog>
        <div class="manage-header">
            <!-- 搜索框 -->
            <div class="search">
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
            <!-- 用户数据Table -->
            <el-table :data="tableData" stripe style="width: 98%" height="90%" @select="select">
<!--                <el-table-column prop="uid" label=""-->
<!--                                 type="selection"-->
<!--                                 :selectable="selected">-->
<!--                </el-table-column>-->
                <el-table-column prop="username" align="center" label="昵称" >
                </el-table-column>
                <el-table-column prop="phone" align="center" label="手机号">
                </el-table-column>
<!--                <el-table-column prop="level" label="会员级别">-->
<!--                </el-table-column>-->
                <el-table-column prop="state" align="center" label="账号状态">
                </el-table-column>
                <el-table-column prop="modifiedTime" align="center" label="登录时间">
                </el-table-column>
                <el-table-column prop="createdTime" align="center" label="注册时间">
                </el-table-column>
                <!-- 自定义列 -->
                <el-table-column label="操作" align="center">
                    <template #default="scope" >
                        <el-button type="primary" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button type="danger" @click="handleDelete(scope.row)">删除</el-button>
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
        <!--            购物车那里偷的分页-->
        <!--            <div style="padding: 10px 0;">-->
        <!--                <el-pagination-->
        <!--                    @size-change="handleSizeChange"-->
        <!--                    @current-change="handleCurrentChange"-->
        <!--                    :current-page="pageNum"-->
        <!--                    :page-sizes="[2,5,10,20]"-->
        <!--                    :page-size="pageSize"-->
        <!--                    layout="total, sizes, prev, pager, next, jumper"-->
        <!--                    :total="total"-->
        <!--                    ></el-pagination>-->
        <!--            </div>-->
    </div>
</template>

<script >
    import { ref } from 'vue'
    import { ElMessageBox } from 'element-plus'
    import {personReq} from "@/api/request";
    import { Delete, Edit, Search, Share, Upload } from '@element-plus/icons-vue'
    // const dialogVisible = ref(false)
    export default {
        name: "UserManage",
        components:{

        },
        data() {
            return {
                // 表单是否打开
                dialogVisible: false,
                form: {
                    uid:'',
                    username: '',
                    phone: '',
                    level: '',
                    state: '',
                    firstTime: '',
                    lastTime: ''
                },
                // 表单验证规则
                rules: {
                    img: [{ required: true, message: '请输入名称', trigger: 'blur' }],
                    name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
                    phone: [{ required: true, message: '请输入年龄', trigger: 'blur' }],
                    state: [{ required: true, message: '请输入性别', trigger: 'blur' }],
                },
                // 列表数据
                tableData: [],
                // 打开表单:新建0,编辑1
                modalType: 0,
                // 搜索框表单
                searchForm: {
                    name: ''
                },
                // 分页的对象
                pageData: {
                    page: 1,
                    limit: 20
                },
                // 分页页数
                total: 0,
            };
        },
        mounted() {
            this.getUserList();
        },
        methods: {
            search(){
                this.getUserList();
            },
            getUserList(){
                let data = {
                    page : this.pageData.page,
                    limit : 12,
                    key : this.searchForm.name
                }
                personReq.getUser(data).then((res) => {
                    console.log(res)
                    for(var i=0; i<res.data.records.length; i++){
                        if(res.data.records[i].state === 0){
                            res.data.records[i].state = '普通用户'
                        }else if(res.data.records[i].state === 1){
                            res.data.records[i].state = '会员用户'
                        }else if(res.data.records[i].state === 2){
                            res.data.records[i].state = '已封号'
                        }else if(res.data.records[i].state === 3){
                            res.data.records[i].state = '已注销'
                        }
                        res.data.records[i].modifiedTime = '2023-06-01 12:03:08'
                        res.data.records[i].createdTime = '2023-01-01 10:38:24'
                    }
                    this.tableData = res.data.records
                    console.log(res.data)
                    this.total = res.data.total || 0
                }).catch(err => console.log(err))
            },
            select(rows, row) {
                // true为选中, 0或false为取消选中
                this.selected = rows.length && rows.indexOf(row) !== -1;
            },
            // 关闭对话框
            closeDialog() {
                // 先重置
                this.$refs.form.resetFields()
                // 后关闭
                this.dialogVisible = false
            },
            submit(){
                // 要用箭头函数,若用function会报错,不知道为什么
                this.$refs.form.validate((valid) => {
                    // 符合校验
                    if (valid) {
                        console.log(this.form.state)
                        if(this.form.state==='普通用户'){
                            this.form.state=0
                        } else if(this.form.state==='会员用户'){
                            this.form.state=1
                        } else if(this.form.state==='已封号'){
                            this.form.state=2
                        } else if(this.form.state==='已注销'){
                            this.form.state=3
                        }
                        let formData = {
                            uid:this.form.uid,
                            username:this.form.username,
                            phone:this.form.phone,
                            state:this.form.state
                        }
                        console.log(formData)
                        // 修改信息
                        personReq.updateUser(formData).then((res) => {
                            console.log(res)
                            if (res.code === 200) {
                                this.getUserList()
                                this.$message.success('信息修改成功')
                            } else {
                                if(res.message===null){
                                    this.$message.error("信息修改失败")
                                }else{
                                    this.$message.error(res.message)
                                }
                            }
                        }).catch(err => console.log(err))
                        // 清空,关闭
                        this.closeDialog()
                    }
                })
            },
            //当前页数
            handlePage(val){
                console.log(val)
                this.pageData.page = val
                this.getUserList()
            },
            // 改变页码
            currentChange(val) {
                this.pageData.page = val
                this.getList()
            },
            // 打开表单
            openForm() {
                this.dialogVisible = true
            },
            // 创建按钮
            handlecreate() {
                this.modalType = 0
                this.openForm()
            },
            // 编辑按钮
            handleEdit(index) {
                this.modalType = 1
                this.form.uid = index.uid
                this.form.username = index.username
                this.form.phone = index.phone
                this.form.state = index.state
                this.openForm()
            },
            // 删除按钮
            handleDelete(index) {
                let data={
                    uid:index.uid
                }
                this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // 删除操作:根据后端接口,参数是对象,id是唯一标识符{
                    personReq.deleteUser(data).then((res) => {
                        console.log(res)
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        })
                        this.getUserList();
                    }).catch(err => console.log(err))
                }).catch(() => {
                    // 点击取消:不删除了
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
        }

    }
</script>
<style lang="less" scoped>
    .manage {
        height: 100%;

        .manage-header {
            /*display: flex;*/
            justify-content: space-between;
            align-items: center;
        }
        .search{
            float: right;

        }
        .common-table {
            height: 90%;
            /*position: relative;*/
            .pager {
                position: absolute;
                right:20px;
                bottom: 0;
            }
        }
    }

    .dialog-footer button:first-child {
        margin-right: 10px;
    }
    /deep/.el-table .cell{
        padding: 0;
    }
    .pager{
        padding-left: 420px;
        padding-top: 30px;
        padding-bottom: 0px;
    }
</style>
