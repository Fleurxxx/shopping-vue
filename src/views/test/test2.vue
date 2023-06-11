<template>
<!--    三级分类-->
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品分类</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片视图区域 -->
        <el-card>
            <!-- 添加分类区域 -->
            <el-row>
                <el-col>
                    <el-button type="primary" @click="showAddCateDialog">添加分类</el-button>
                </el-col>
            </el-row>

            <!-- 表格区域 -->
            <!-- data 表格各行的数据 Array -->
            <!-- columns 表格各列的配置 Array -->
            <!-- selection-type 是否为多选类型表格 Boolean -->
            <!-- expand-type 是否为展开行类型表格（为 True 时，需要添加名称为 '$expand' 的作用域插槽, 它可以获取到 row, rowIndex) Boolean -->
            <!-- show-index 是否显示数据索引  Boolean -->
            <!-- show-row-hover 鼠标悬停时，是否高亮当前行 Boolean-->
            <tree-table :data='catelist' :columns='columns' :selection-type='false' :expand-type='false' border show-index :show-row-hover='false'>
                <!-- 作用域插槽 -->
                <!-- slot 作用域插槽名称 -->
                <!-- 是否有效 -->
                <!--                <template slot="isok" slot-scope="scope">-->
                <!--                    <i class="el-icon-success" v-if="scope.row.cat_deleted === false" style="color: lightgreen;"></i>-->
                <!--                    <i class="el-icon-error" v-else style="color: red;"></i>-->
                <!--                </template>-->

                <!--                &lt;!&ndash; 排序 &ndash;&gt;-->
                <!--                <template slot="order" slot-scope="scope">-->
                <!--                    <el-tag size="mini" v-if="scope.row.cat_level === 0 ">一级</el-tag>-->
                <!--                    <el-tag size="mini" type="success" v-else-if="scope.row.cat_level === 1">二级</el-tag>-->
                <!--                    <el-tag size="mini" type="warning" v-else>三级</el-tag>-->
                <!--                </template>-->

                <!-- 操作 -->
                <template slot="opt" slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row)">编辑</el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeCate(scope.row.cat_id)">删除</el-button>
                </template>

            </tree-table>

            <!-- 分页区域 -->
            <!-- size-change pageSize 改变时会触发 每页条数 -->
            <!-- current-change currentPage 改变时会触发 当前页 -->
            <!-- current-page 当前页数，支持 .sync 修饰符 number -->
            <!-- page-sizes 每页显示个数选择器的选项设置 number[] -->
            <!-- layout 组件布局，子组件名用逗号分隔 String -->
            <!-- total 总条目数 number -->
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="querInfo.pagenum"
                    :page-sizes="[3, 5, 10, 15]"
                    :page-size="querInfo.pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </el-card>

        <!-- 添加分类的对话框 -->
        <!-- visible 是否显示 Dialog，支持 .sync 修饰符 boolean -->
        <el-dialog title="添加分类" :visible.sync="addDialogVisible" width="50%" @close='addCateDialogClosed'>
            <!-- 添加分类的表单 -->
            <!-- model 表单数据对象 object -->
            <!-- rules 表单验证规则 object -->
            <el-form :model="addCateForm" :rules="addCateRules" ref="addCateRef" label-width="100px">
                <!-- prop 表单验证规则中 对应的字段 -->
                <el-form-item label="分类名称" prop="cat_name">
                    <el-input v-model="addCateForm.cat_name"></el-input>
                </el-form-item>

                <el-form-item label="父级分类：">
                    <!-- Cascader 级联选择器 -->
                    <!-- expand-trigger 次级菜单的展开方式 string click / hover -->
                    <!-- options 指定数据源，键名可通过 props 属性配置  array -->
                    <!-- props 用来指定配置对象 -->
                    <!-- v-model 绑定值 boolean / string / number -->
                    <!-- @change 当绑定值变化时触发的事件  当前值 -->
                    <!-- clearable 是否支持清空选项 boolean -->
                    <!-- change-on-select 是否允许选择任意一级的选项 boolean -->
                    <el-cascader
                            expand-trigger="hover"
                            :options="parentCateList"
                            :props="cascaderProps"
                            v-model="selectedKeys"
                            @change="parentCateChanged"
                            clearable
                            :change-on-select='true
                            '>
                    </el-cascader>
                </el-form-item>
            </el-form>
            <!-- 底部区域 -->
            <span slot="footer" class="dialog-footer">
                    <el-button @click="addDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addCate">确 定</el-button>
                </span>
        </el-dialog>

        <!-- 修改分类对话框 -->
        <el-dialog title="修改分类" :visible.sync="editDialogVisible" width="50%">
            <!-- 修改表单 -->
            <el-form :model="editCateForm" :rules="editCateRules" ref="editCateRef" label-width="100px" class="demo-ruleForm">
                <el-form-item label="分类名称" prop="cat_name">
                    <el-input v-model="editCateForm.cat_name"></el-input>
                </el-form-item>
            </el-form>
            <!-- 底部区域 -->
            <span slot="footer" class="dialog-footer">
                    <el-button @click="editDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="editCate">确 定</el-button>
                </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                // 查询条件
                querInfo: {
                    // 值：1，2，3 分别表示显示一层二层三层分类列表
                    //【可选参数】如果不传递，则默认获取所有级别的分类
                    type: 3,
                    // 当前页码值
                    pagenum: 1,
                    // 每页显示多少条数据
                    pagesize: 5
                },
                // 商品分类的数据列表，默认为空
                catelist: [],
                // 总数据条数
                total: 0,
                // 为table 指定列的定义
                columns: [
                    {
                        label: '分类名称',
                        prop: 'cat_name'
                    },
                    {
                        label: '是否有效',
                        // 表示，将当前列定义为模板列
                        type: 'template',
                        // 表示当前这一列使用模板名称
                        template: 'isok'
                    },
                    {
                        label: '排序',
                        // 表示，将当前列定义为模板列
                        type: 'template',
                        // 表示当前这一列使用模板名称
                        template: 'order'
                    },
                    {
                        label: '操作',
                        // 表示，将当前列定义为模板列
                        type: 'template',
                        // 表示当前这一列使用模板名称
                        template: 'opt'
                    }
                ],
                // 控制添加分类对话框的显示与隐藏
                addDialogVisible: false,
                // 添加分类的表单数据对象
                addCateForm: {
                    // 将要添加的分类名称
                    cat_name: '',
                    // 父级分类的Id
                    cat_pid: 0,
                    // 分类等级，默认要添加的是1级分类
                    cat_level: 0
                },
                // 添加分类的表单数据验证规则对象
                addCateRules: {
                    cat_name: [
                        {required: true, message: '请输入分类名称', trigger: 'blur'}
                    ]
                },
                // 父级分类的列表数据 （级联选择器）
                parentCateList: [],
                // 指定级联选择器的配置对象
                cascaderProps: {
                    // 选项的值
                    value: 'cat_id',
                    // 选项标签 显示的值
                    label: 'cat_name',
                    // 选项的子选项 （父子嵌套）
                    children: 'children'
                },
                // 选中的父级分类的Id数组
                selectedKeys: [],
                // 控制添加分类对话框的显示与隐藏
                editDialogVisible: false,
                // 修改分类的表单数据对象
                editCateForm: {
                    // 分类ID
                    cat_id: '',
                    // 分类名称
                    cat_name: ''
                },
                // 修改分类的表单数据验证规则对象
                editCateRules: {
                    cat_name: [
                        {required: true, message: '请输入分类名称', trigger:'blur'}
                    ]
                }
            }
        },
        created() {
            // 调用 获取商品分类的数据方法
            this.getCateList();
        },
        methods: {
            // 获取商品分类的数据
            async getCateList() {

                // 发送请求
                const {data: res} = await  this.$http.get('categories', {params: this.querInfo});

                // 请求失败
                if(res.meta.status !== 200) return this.$message.error('获取商品分类失败！');

                // 请求成功
                this.$message.success('获取商品分类成功！');
                // 把数据列表，赋值给 catelist
                this.catelist = res.data.result;
                // 为总数据条数赋值
                this.total = res.data.total;

            },
            // 监听 pagesize 每页条数改变事件
            handleSizeChange(newSize) {
                // 将最新的当前页数赋值给 querInfo.pagesize
                this.querInfo.pagesize = newSize;
                // 重新获取数据列表
                this.getCateList();
            },
            // 监听 pagenum 当前页改变事件
            handleCurrentChange(newPage) {
                // 将最新的当前页码值赋值给 querInfo.pagenum
                this.querInfo.pagenum = newPage;
                // 重新获取数据列表
                this.getCateList();
            },
            // 点击 添加分类 按钮，显示 添加分类对话框
            showAddCateDialog() {
                // 先获取 父级分类的数据列表
                this.getParentCateList();
                // 再显示 添加分类对话框
                this.addDialogVisible = true;
            },
            // 获取父级分类的数据列表（级联选择器）
            async getParentCateList() {
                // type: 2 只获取 前两级
                const {data: res} = await this.$http.get('categories', {params: {type: 2 }});

                if(res.meta.status !== 200) return this.$message.error('获取父级分类数据失败！');

                this.parentCateList = res.data;
                console.log(res.data);
            },
            // 选择项发生变化触发这个函数
            parentCateChanged() {
                console.log(this.selectedKeys);

                // 如果 selectedKeys 数组中的 length 大于 0， 证明选中的父级分类
                // 反之，就说明没有选中任何父级分类
                if(this.selectedKeys.length > 0) {
                    // 父级分类的Id
                    this.addCateForm.cat_pid = this.selectedKeys[this.selectedKeys.length - 1 ]

                    // 为当前分类的等级赋值
                    this.addCateForm.cat_level = this.selectedKeys.length
                    return
                }else {
                    // 父级分类的Id
                    this.addCateForm.cat_pid = 0
                    // 为当前分类的等级赋值
                    this.addCateForm.cat_level = 0
                }

            },
            // 点击按钮，添加新的分类
            addCate() {
                // 预验证表单数据
                this.$refs.addCateRef.validate( async valid => {
                    // 如果内容为空，不发送请求
                    if(!valid) return

                    // 验证通过，发送请求
                    const {data: res} = await this.$http.post('categories', this.addCateForm);

                    if(res.meta.status !== 201) {
                        return this.$message.error('添加分类失败！');
                    }

                    this.$message.success('添加分类成功！');
                    // 刷新数据列表
                    this.getCateList();
                    // 关闭对话框
                    this.addDialogVisible = false;
                });
            },
            // 监听 添加分类对话框 关闭事件，重置表单数据
            addCateDialogClosed() {
                // 通过resetFields() 重置表单数据
                this.$refs.addCateRef.resetFields();
                // 将 级联选择器 绑定的数组 重置为空数组
                this.selectedKeys = [];
                this.addCateForm.cat_pid = 0;
                this.addCateForm.cat_level = 0;
            },
            // 点击 修改按钮，展示修改对话框
            showEditDialog(row) {
                // 点击 编辑按钮， 将传递的数据，赋值给 editCateForm对象
                this.editCateForm.cat_id = row.cat_id;
                this.editCateForm.cat_name = row.cat_name;
                console.log(this.editCateForm);
                this.editDialogVisible = true;
            },
            // 点击按钮，修改分类名称
            editCate() {
                this.$refs.editCateRef.validate( async valid => {

                    if(!valid) return

                    // 发送请求
                    const {data: res} = await this.$http.put('categories/'+ this.editCateForm.cat_id, {params: this.editCateForm.cat_name});

                    console.log(res);

                    if(res.meta.status !== 200)
                        return this.$message.error('修改分类名称失败！');

                    this.$message.success('修改分类名称成功！');
                    // 重新刷新数据列表
                    this.getCateList();
                    // 关闭修改对话框
                    this.addDialogVisible = false;
                });
            },
            // 删除操作
            async removeCate(id) {
                const confirm = await this.$confirm('此操作将永久删除当前数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).catch(err => err);

                if(confirm !== 'confirm') {
                    return this.$message.info('你取消了删除操作！');
                }

                // 确定删除，发送请求
                const {data: res} = await this.$http.delete(`categories/${id}`);

                if(res.meta.status !== 200) return this.$message.error('删除数据失败！');

                this.$message.success('删除数据成功！');
                // 刷新数据列表
                this.getCateList();
            }
        }
    }
</script>


<style lang="less" scoped>
    .el-row {
        margin-bottom: 15px;
    }

    // 级联选择器
    .el-cascader {
        width: 100%;
    }



</style>
