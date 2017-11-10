const getters = {}
const actions = {};
const mutations = {
    setArticleList(state, articleList) {
        state.articleList = articleList;
    },
    setArticleInfo(state, articleinfo) {
        state.articleinfo = articleinfo;
    },
    setArticleTypeList(state, articleTypeList) {
        state.articleTypeList = articleTypeList;
    }
};


export default {
    // 命名空间  局部
    namespaced: true,
    state: {
        articleList: [],
        articleTypeList: [],
        articleinfo: {}
    },
    getters,
    actions,
    mutations
}