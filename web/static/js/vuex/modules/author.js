const getters = {
}
const actions = {
};
const mutations = {
    setAuthorInfo( { state, dispatch, commit, getters, rootGetters}, authorInfo ){
        console.log(state)
        state.authorInfo = authorInfo;
    }
};


export default {
    // 命名空间  局部
    namespaced: true,
    state: {
        authorInfo: {}
    },
    getters,
    actions,
    mutations
}


