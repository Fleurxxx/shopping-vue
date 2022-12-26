<template>
    <div class="manage">
        <div class="manage-header">
            <!-- 搜索框 -->
        </div>
        <div class="common-table">
            <!-- 订单数据Table -->
            <el-table :data="tableData" stripe style="width: 100%" height="90%" @select="select">
                <el-table-column prop="name" label="订单号" type="selection" :selectable="selected">
                </el-table-column>
                <el-table-column prop="age" label="邮政编码">
                </el-table-column>
                <el-table-column prop="sex" label="收货人">
                </el-table-column>
                <el-table-column prop="sex" label="联系方式">
                </el-table-column>
                <el-table-column prop="sex" label="订单状态">
                </el-table-column>
                <!-- 自定义列 -->
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button @click="handleEdit(scope.row)">详情</el-button>
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
        </div>
    </div>
</template>

<script>
    export default {
        name: "OrderManage"
    }
</script>

<style scoped>

</style>
