const state = {
    projects:[]
}

const getters = {

}

const actions = {
    fetchProjects({ commit }) {
        const url = `/fp/v2project?type=project`;
        return this.$axios
            .$get(url)
            .then(res => {
                commit("setProjects", res.data);
                
                return res;
            })
            .catch(err => {
                throw err.response;
        });
    },
    newProject({ commit, dispatch }, payload) {
        const url = `/fp/v2project`;
        return this.$axios
            .$post(url, payload)
            .then(res => {
                dispatch('fetchProjects');
                return res;
            })
            .catch(err => {
                throw err.response;
            });
    },
}

const mutations = {
    setProjects(state,data){
        state.projects = data;
    }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
