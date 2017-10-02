export
default [{
    path: '/',
    name: 'home',
    component: require('../views/home.vue')
}, {
    path: '/userList',
    name: 'userList',
    component: require('../views/user/user.list.vue'),
}, {
    path: '/userSave',
    name: 'userSave',
    component: require('../views/user/user.add.vue'),
}, {
    path: '/articlePulish',
    name: 'userSave',
    component: require('../views/article/article.publish.vue'),
}]