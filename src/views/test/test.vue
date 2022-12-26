<template>
    <div>
        <h1>测试</h1>
<!--         table卡片 -->
        <el-card style="margin-top: 20px;">
            <el-table :data="TableData" style="width: 100%">
                <!-- 这里的val,key对应的是对象里的 -->
                <el-table-column v-for="(value, key) in TableLabel" :prop="key" :label="value">
                </el-table-column>
            </el-table>
        </el-card>

    </div>
</template>

<script>
    // import TableData from '../../api/mockData/tableData'
    import TableLabel from '../../api/mockData/tableLabel'
    import {personReq} from "@/api/request";

    export default {
        name: "test",
        data() {
            return {
                TableData:[],TableLabel
                // TableData,TableLabel
            }
        },
        mounted(){
            personReq.getData().then((res)=>{
                console.log(res);
                this.TableData=res.data.tableData
            }).catch(err => console.log(err))
        },
        methods:{

        }

    }
</script>

<style scoped>

</style>
