<template>
    <div class="xtx-pagination">
        <a @click="changePage(false)" href="javascript:;" :class="{ disabled: currentPage === 1 }">上一页</a>
        <span v-if="currentPage > 3">...</span>
        <a
                @click="changePage(item)"
                href="javascript:;"
                :class="{ active: currentPage === item }"
                v-for="item in list"
                :key="item"
        >{{ item }}</a
        >
        <span v-if="currentPage < pages - 2">...</span>
        <a @click="changePage(true)" href="javascript:;" :class="{ disabled: currentPage === pages }">下一页</a>
    </div>
</template>
<script>
    import { computed, ref } from 'vue'
    export default {
        name: 'Pagination',
        props: {
            total: {
                type: Number,
                default: 0
            },
            pagesize: {
                type: Number,
                default: 10
            }
            // 初始默认页码
            // page: {
            //   type: Number,
            //   default: 1
            // }
        },
        setup(props, { emit, attrs }) {
            // 动态计算中间的页码信息
            // 依赖于父组件的total
            // 每页的条数
            // const pagesize = 8
            // 当前页
            const currentPage = ref(attrs.page || 1)
            // 计算总页数(向上取整)
            // 初始值total是0
            // 因为setup只执行一次，这里的pages就不会重新计算
            // 所有，要在计算属性重新计算
            const pages = computed(() => Math.ceil(props.total / props.pagesize))
            const list = computed(() => {
                // 当父组件传递给total发生变化时，计算属性重新计算
                // pages = Math.ceil(props.total / props.pagesize)
                const result = []
                // 总页码在小于等于5；大于5
                if (props.pagesize <= 5) {
                    // 总页码小于等于5的情况
                    for (let i = 1; i <= pages.value; i++) {
                        result.push(i)
                    }
                } else {
                    // 总页码大于5

                    if (currentPage.value <= 2) {
                        // 左侧临界值
                        for (let i = 1; i <= 5; i++) {
                            result.push(i)
                        }
                    } else if (currentPage.value >= pages.value - 1) {
                        // 右侧临界值
                        for (let i = pages.value - 4; i <= pages.value; i++) {
                            result.push(i)
                        }
                    } else {
                        // 中间临界值
                        for (let i = currentPage.value - 2; i <= currentPage.value + 2; i++) {
                            result.push(i)
                        }
                    }
                    //
                }
                return result
            })
            const changePage = type => {
                // 页面是左右两侧时，禁止点击操作
                if (type === false) {
                    // 上一页
                    // 页面第一个页时，禁止
                    if (currentPage.value === 1) return
                    if (currentPage.value > 1) {
                        currentPage.value -= 1
                    }
                } else if (type === true) {
                    // 下一页
                    // 最后一页时禁止
                    if (currentPage.value === pages.value) return
                    if (currentPage.value < pages.value) {
                        currentPage.value += 1
                    }
                } else {
                    // 点击页码
                    currentPage.value = type
                }
                emit('change-page', currentPage.value)
            }
            return { list, currentPage, pages, changePage }
        }
    }
</script>
<style scoped lang="less">
    .xtx-pagination {
        display: flex;
        justify-content: center;
        padding: 30px;
        > a {
            display: inline-block;
            padding: 5px 10px;
            border: 1px solid #e4e4e4;
            border-radius: 4px;
            margin-right: 10px;
            &:hover {
                color: #9e9e9e;
            }
            &.active {
                background: #9e9e9e;
                color: #fff;
                border-color: #9e9e9e;
            }
            &.disabled {
                cursor: not-allowed;
                opacity: 0.4;
                &:hover {
                    color: #333;
                }
            }
        }
        > span {
            margin-right: 10px;
        }
    }
</style>