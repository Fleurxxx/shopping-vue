export default {
    state: {
        // isCollapse: false,//导航栏是否折叠
        tabList: [
            {
                path: '/home',
                name: 'home',
                label: '首页',
                icon: 's-home',
                url: 'Home/Home'
            },
            {
                path: '/home/favorite',
                name: 'favorite',
                label: '收藏夹',
                icon: 'video-play',
                url: 'MallManage/MallManage'
            },
            {
                path: '/home/goods',
                name: 'goods',
                label: '全部商品',
                icon: 'user',
                url: 'UserManage/UserManage'
            },
            {
                path: 'mine',
                label: '个人主页',
                icon: 'location',
                children: [
                    {
                        path: '/mine/own',
                        name: 'own',
                        label: '我的主页',
                        icon: 'setting',
                        url: 'Other/PageOne'
                    },
                    {
                        path: '/mine/cart',
                        name: 'cart',
                        label: '购物车',
                        icon: 'setting',
                        url: 'Other/PageTwo'
                    },
                    {
                        path: '/mine/modifiedData',
                        name: 'modifiedData',
                        label: '修改资料',
                        icon: 'setting',
                        url: 'Other/PageTwo'
                    }
                ]
            }
        ],//面包屑的数据:点了哪个路由,首页是一定有的
    },
    mutations: {
        // 修改导航栏展开和收起的方法
        // CollapseMenu(state) {
        //     state.isCollapse = !state.isCollapse
        // },
        // 更新面包屑的数据
        SelectMenu(state, item) {
            // 如果点击的不在面包屑数据中,则添加
            const index = state.tabList.findIndex(val => val.name === item.name)
            if (index === -1) {
                state.tabList.push(item)
            }
        }
    }
}
