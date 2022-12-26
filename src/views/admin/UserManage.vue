<template>
    <div class="manage">
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
                <el-table-column prop="username" label="昵称" >
                </el-table-column>
                <el-table-column prop="phone" label="手机号">
                </el-table-column>
<!--                <el-table-column prop="level" label="会员级别">-->
<!--                </el-table-column>-->
                <el-table-column prop="state" label="账号状态">
                </el-table-column>
                <el-table-column prop="modifiedTime" label="登录时间">
                </el-table-column>
                <el-table-column prop="createdTime" label="注册时间">
                </el-table-column>
                <!-- 自定义列 -->
                <el-table-column label="操作">
                    <template #default="scope" >
                        <el-button type="primary" @click="handleEdit()">编辑</el-button>
                        <el-button type="danger" @click="handleDelete()">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <p v-if="selected !== null">
                当前操作为：{{ selected ? "选中行" : "取消选中" }}
            </p>
            <!-- 分页 -->
            <div class="pager">
                <el-pagination layout="prev, pager, next" :total="total" @current-change="currentChange">
                </el-pagination>
            </div>
<!--            购物车那里偷的分页-->
            <div style="padding: 10px 0;">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageNum"
                    :page-sizes="[2,5,10,20]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
                    ></el-pagination>
            </div>
        </div>
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
                    img:'',
                    name: '',
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
            getUserList(){
                personReq.getUser().then((res) => {
                    console.log(res)
                    this.tableData = res.data
                    console.log(this.tableData.length)
                    this.total = this.tableData.length || 0
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
            // 改变页码
            currentChange(val) {
                this.pageData.page = val
                this.getList()
            },
            // 打开表单
            openForm() {
                this.dialogVisible = true
            },
            // 编辑按钮
            handleEdit(index) {
                this.modalType = 1
                this.openForm()
                // 深拷贝
                this.form = JSON.parse(JSON.stringify(index))
            },
            // 删除按钮
            handleDelete(index) {
                this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // 删除操作:根据后端接口,参数是对象,id是唯一标识符
                    deleteUser({ id: index.id }).then(() => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        })
                        this.getList()
                    });
                }).catch(() => {
                    // 点击取消:不删除了
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            search(){
                personReq.searchUser().then((res) => {
                    console.log(res)
                    this.tableData = res.data
                    console.log(this.tableData.length)
                    this.total = this.tableData.length || 0
                }).catch(err => console.log(err))
            }
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
</style>
