<template>
    <div>
<!--        <h2>个人中心</h2>-->
        <div class="common-layout">
            <el-container>
                <el-aside width="200px">
                    <MinNav />
                </el-aside>
                <el-main>
                    <router-view class="main"></router-view>
                </el-main>
            </el-container>
        </div>
    </div>
</template>

<script>
    import Aside from '../home/Nav'
    import MinNav from './MinNav'
    export default {
        name: "MinePage",
        components:{
            Aside,MinNav
        }
    }
</script>

<style scoped>

</style>
