const getters = {}
const actions = {};
const mutations = {
    setArticleInfo(state, articleinfo) {
        state.articleinfo = articleinfo;
    }
};


export default {
    // 命名空间  局部
    namespaced: true,
    state: {
        articleinfo: []
    },
    getters,
    actions,
    mutations
}