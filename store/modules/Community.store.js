const dummyFeedResponse  = require("../../assets/feed.json");

const state = {}

const getters = {}

const actions = {
    communityFeed({ commit }, payload) {
        const url = `/feed/hashtags/foyrdesignchallenge/public?page=1&limit=20`;
        return this.$axios
            .$get(url)
            .then(res => {
                if (res && res.data) return res.data;
            })
            .catch(err => {
                throw err.response;
            });
        // return dummyFeedResponse.data
    },
}

const mutations = {}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}