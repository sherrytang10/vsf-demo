const getters = {
}
const actions = {
};
const mutations = {
    setAuthorInfo( state, authorInfo){
        console.log(authorInfo)
        state.authorInfo = authorInfo;
        console.log(state)
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


