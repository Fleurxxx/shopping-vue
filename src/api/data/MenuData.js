const MenuData= [
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
]

export default MenuData
