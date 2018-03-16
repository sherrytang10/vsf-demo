export
default [{
    path: '/',
    name: 'article',
    component: require('../views/article/sfArticle.vue')
},{
    path: '/article/:type?',
    name: 'article',
    component: require('../views/article/sfArticle.vue')
}, {
    path: '/articleinfo/:id',
    name: 'articleinfo',
    component: require('../views/article/sfArticleInfo.vue')
}, {
    path: '/articleclassify/:type',
    name: 'articleclassify',
    component: require('../views/article/sfArticleClassify.vue')
}, {
    path: '/articlelist/:type/:id',
    name: 'articlelist',
    component: require('../views/article/sfArticleList.vue')
}, {
    path: '/authorlist',
    name: 'authorlist',
    component: require('../views/author/sfAuthorList.vue')
}]