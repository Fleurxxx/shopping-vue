<template>
    <div class="common-layout">
        <el-container>
            <el-aside width="200px">
                <a-side/>
            </el-aside>
            <el-container>
<!--                <el-header>-->
                    <a-header></a-header>
<!--                </el-header>-->
                <el-main>
                    <router-view class="main"></router-view>
                </el-main>
                <el-footer></el-footer>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import AHeader from '../../common/AHeader.vue';
    import ASide from '../../common/Aside.vue';
    export default {
        components:{
            AHeader,ASide
        },

    }
</script>

<style lang="less" scoped>
    /deep/.el-footer{
        --el-footer-height:0;
    }

</style>
