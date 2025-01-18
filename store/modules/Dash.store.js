const state = {
    video: [],
    moodboardVideos: [],
    renders: [],
    getFreeDemoShow_Desk: false,
    showMoodboardSignupPopup: false,
    showMoodboardBasicPaywall: false,
    showMoodboardCancelConfirmationPopup: false,
    cancellationPopupButtonCB: {
        postConfirmationCallback: null,
        postRejectionCallback: null,
    }
}

const getters = {
    showMoodboardSignupPopup: state => state.showMoodboardSignupPopup,
    showMoodboardBasicPaywall: state => state.showMoodboardBasicPaywall,
    showMoodboardCancelConfirmationPopup: state => state.showMoodboardCancelConfirmationPopup,
    cancellationPopupButtonCB: state => state.cancellationPopupButtonCB
}

const actions = {
    getVideos({ commit }) {
        const url = `/videos/getDashboardVideos`
        return this.$axios
            .$get(url)
            .then(res => {
                commit('setVideo', res.data)
                return res;

            })
    },
    getMBVideos({ commit }) {
        const url = `/mb/videos/getDashboardVideos`
        return this.$axios
            .$get(url)
            .then(res => {
                commit('setMoodboardVideos', res.data)
                return res;

            })
    },
    getRenders({ commit }) {
        const url = '/samplecontent/getSampleRenders'
        return this.$axios
            .$get(url)
            .then(res => {
                commit('setRender', res.data)
                return res;
            })
    },
    sendOffer({ commit }, payload) {
        const url = '/notify/sendOffer'
        return this.$axios
            .$post(url, payload)
            .then(res => {
                console.log(res)
                return res;
            })
    },
    inviteFriend({ commit }, payload) {
        const url = '/notify/inviteFriend'
        return this.$axios
            .$post(url, payload)
            .then(res => {
                console.log(res)
                return res;
            })
    },
    openCancelSubscriptionPopup({ commit }, {postConfirmationCallback}) {
        commit("setShowMoodboardCancelConfirmationPopup", true);
        commit("setCancellationPopupButtonCB", {postConfirmationCallback});
    }
}

const mutations = {
    setVideo: (state, data) => {
        state.video = data
    },
    setMoodboardVideos: (state, data) => {
        state.moodboardVideos = data
    },
    setRender: (state, data) => {
        state.renders = data
    },
    setGetFreeDemoShow_Desk(state, value) {
        state.getFreeDemoShow_Desk = value;
    },
    setShowMoodboardSignupPopup(state, value) {
        state.showMoodboardSignupPopup = value;
    },
    setShowMoodboardBasicPaywall(state, value) {
        state.showMoodboardBasicPaywall = value;
    },
    setShowMoodboardCancelConfirmationPopup(state, value) {
        state.showMoodboardCancelConfirmationPopup = value;
    },
    setCancellationPopupButtonCB(state, value) {
        state.cancellationPopupButtonCB = value;
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}