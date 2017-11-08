export
default [{
    path: '/',
    name: 'article',
    component: require('../components/sfArticle.vue')
}, {
    path: '/articleinfo/:id',
    name: 'articleinfo',
    component: require('../components/sfArticleInfo.vue')
}]