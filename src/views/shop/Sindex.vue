<template>
    <div class="common-layout">
        <el-container>
            <el-aside width="200px" >
                <s-side/>
            </el-aside>
            <el-container class="container">
                <s-header></s-header>
                <el-main>
                    <router-view class="main"></router-view>
                </el-main>
                <el-footer></el-footer>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import SHeader from '../../common/SHeader.vue';
    import SSide from '../../common/Sside.vue';
    export default {
        name: "Sindex",
        components:{
            SHeader,SSide
        },
    }
</script>

<style lang="less" scoped>
    /deep/.el-footer{
        --el-footer-height:0;
    }
    html,
    body {
        margin: 0;
        padding: 0;
        height: 100%;
    }
    #app,.box{
        height: 100%;
    }
    .container{
        height: 100%
    }
</style>
