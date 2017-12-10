export
default [{
    path: '/',
    name: 'article',
    component: require('../components/article/sfArticle.vue')
}, {
    path: '/articleinfo/:id',
    name: 'articleinfo',
    component: require('../components/article/sfArticleInfo.vue')
}, {
    path: '/articletype',
    name: 'articletype',
    component: require('../components/article/sfArticleType.vue')
}, {
    path: '/articlelist/:id',
    name: 'articlelist',
    component: require('../components/article/sfArticleList.vue')
}]