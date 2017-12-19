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
    path: '/articleclassify/:type',
    name: 'articleclassify',
    component: require('../components/article/sfArticleClassify.vue')
}, {
    path: '/articlelist/:type/:id',
    name: 'articlelist',
    component: require('../components/article/sfArticleList.vue')
}]