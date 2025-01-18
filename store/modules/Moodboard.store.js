const state = {
  projects: []
};

const getters = {
  moodboardProjects: (state)=> state.projects,
  moodboardProjectsForHomePage: (state)=> state.projects.slice(0,14),
};

const actions = {
  fetchProjects({ commit }) {
    const url = `/mb/projectcommands/get-my-projects`;
    return this.$axios
      .$get(url)
      .then(res => {
        commit("setProjects", res.data);
        console.log("MB projects",res.data)
        return res;
      })
      .catch(err => {
        throw err.response;
      });
  },
  getProject({ commit }, projectId = "6257e140583d0389ff853adb" ) {
    const url = `/mb/projectcommands/getproject/${projectId}`;
    return this.$axios
      .$get(url)
      .then(res => {
        // commit("setProjects", res.data);
        console.log(res);
        return res;
      })
      .catch(err => {
        throw err.response;
      });
  },
  newProject({ commit, dispatch }, payload) {
    const url = `/mb/fp/v2project`;
    return this.$axios
      .$post(url, payload)
      .then(res => {
        dispatch("fetchProjects");
        return res;
      })
      .catch(err => {
        throw err.response;
      });
  }
};

const mutations = {
  setProjects(state, data) {
    state.projects = data;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
