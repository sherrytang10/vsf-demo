export default [{
    path: '/',
    component: require('../views/login.vue')
}, {
    path: '/login',
    name: 'login',
    component: require('../views/login.vue')
}, {
    path: '/index',
    component: require('../views/index.vue'),
    children:[{
        path: '/',
        name: 'home',
        component: require('../views/home.vue')
    },{
        path: '/userList',
        name: 'userList',
        component: require('../views/user/user.list.vue'),
    }, {
        path: '/userSave',
        name: 'userSave',
        component: require('../views/user/user.add.vue'),
    }, {
        path: '/articlePulish',
        name: 'articlePulish',
        component: require('../views/article/article.publish.vue'),
    }, {
        path: '/articleList',
        name: 'articleList',
        component: require('../views/article/article.list.vue'),
    }, {
        path: '/articleListAdmin',
        name: 'articleListAdmin',
        component: require('../views/article/article.list.admin.vue'),
    }]
}]