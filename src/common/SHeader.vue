<template>
    <div class="header-container">
        <div class="l-content">
            <!--  顶部菜单栏  -->
            <div class="h-6" />

        </div>
        <div class="r-content">
            <!--            头像-->
            <div class="flex-grow" />
            <el-dropdown @command="handleCommand">
                    <span class="el-dropdown-link">
                          <img class="user" src="../assets/images/img/羊羊.jpg">
                    </span>
                <template #dropdown>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="a">用户模式</el-dropdown-item>
                        <el-dropdown-item command="e" divided>退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
    import { ref } from 'vue'

    const activeIndex = ref('1')
    // const activeIndex2 = ref('1')
    // const handleSelect = (key: string, keyPath: string[]) => {
    //     console.log(key, keyPath)
    // })
    export default {
        name: "SHeader"
    }
</script>

<style lang="less" scoped>
    .header-container{
        padding: 0 20px;
        background-color: #ccd3e8;
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .r-content{
            margin-right: 45px;
            .user{
                width: 40px;
                height: 40px;
                border-radius: 50%;
            }
        }
    }
    .el-menu-demo{
        padding: 0;
    }
    .demo-basic {
        text-align: center;
    }
    .demo-basic .sub-title {
        margin-bottom: 10px;
        font-size: 14px;
        color: var(--el-text-color-secondary);
    }
    .demo-basic .demo-basic--circle,
    .demo-basic .demo-basic--square {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .demo-basic .block:not(:last-child) {
        border-right: 1px solid var(--el-border-color);
    }
    .demo-basic .block {
        flex: 1;
    }
    .demo-basic .el-col:not(:last-child) {
        border-right: 1px solid var(--el-border-color);
    }
    /*头像靠右侧*/
    .flex-grow {
        flex-grow: 1;
    }

</style>
