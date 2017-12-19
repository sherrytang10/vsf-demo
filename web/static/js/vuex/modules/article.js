const getters = {}
const actions = {};
const mutations = {
    setArticleList(state, articleList) {
        state.articleList = articleList;
    },
    setArticleInfo(state, articleinfo) {
        state.articleinfo = articleinfo;
    },
    setArticleClassify(state, articleClassify) {
        state.articleClassify = articleClassify;
    }
};


export default {
    // 命名空间  局部
    namespaced: true,
    state: {
        articleList: [],
        articleClassify: [],
        articleinfo: {}
    },
    getters,
    actions,
    mutations
}