const getters = {
}
const actions = {
};
const mutations = {
    setArticleList( state, articleList){
        state.articleList = articleList;
    }
};


export default {
    // 命名空间  局部
    namespaced: true,
    state: {
        articleList: []
    },
    getters,
    actions,
    mutations
}


