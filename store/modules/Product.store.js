const state = {
  trendingProducts: null
};

const actions = {
  fetchTrending({ commit }) {
    const url = `/products/groupbytrend`;
    return this.$axios
      .$get(url)
      .then(res => {
        commit("setTrendingProducts", res.data);
      })
      .catch(err => {
        throw err.response;
      });
  },
  
  
};

const mutations = {
  setTrendingProducts: (state, data) => {
    state.trendingProducts = data.filter(element=>element._id === "trending")[0].products;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
