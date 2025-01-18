const state = {
	referralPopup: false,
	referralsCount: 0,
	referralsProgressList: [],
	refereeId: "",
	errorMessageState: false,
	errorMessage: "There was an error referring",
	loadingAnimationState: false,
};

const getters = {
	referralPopup: state => state.referralPopup,
	rewardsAvailable: state => state.rewardsAvailable,
	referralsProgressList: state => state.referralsProgressList,
	referralsCount: state => state.referralsCount,
	refereeId: state => state.refereeId,
	errorMessageState: state => state.errorMessageState,
	errorMessage: state => state.errorMessage,
	loadingAnimationState: state => state.loadingAnimationState,
};

const mutations = {
	referralPopupToggle: state => {
		if (state.referralPopup) {
			state.referralPopup = false;
		} else {
			state.referralPopup = true;
		}
	},
	setReferralsCount(state, payload) {
		state.referralsCount = payload;
	},
	setReferralsProgressList(state, payload) {
		state.referralsProgressList = payload;
	},
	setRefereeId(state, payload) {
		state.refereeId = payload;
	},
	showReferralPopupErrorMessage(state, payload) {
		state.errorMessageState = true;
		setTimeout(() => {
			state.errorMessageState = false;
			state.errorMessage = "There was an error referring";
		}, 5000);
		if (payload) {
			state.errorMessage = payload;
		}
	},
	showLoadingAnimation(state) {
		state.loadingAnimationState = true;
	},
	hideLoadingAnimation(state) {
		state.loadingAnimationState = false;
	},
};
const actions = {
	async sendReferralThroughEmail({ commit }, payload) {
		const url = `sb/send-referral-email/${payload}`;
		try {
			const data = await this.$axios.$get(url);
			if (data.statusCode == 200) {
				return { ok: true, data: data };
			}

			return { ok: false, data: null };
		} catch (err) {
			return { ok: false, data: err.response.data };
			// console.error('error sendReferralThroughEmail ->', err)
			// throw err
		}

		// return this.$axios
		//     .$get(url)
		//     .then(res => {
		//         return res
		//     })
		//     .catch(err => {
		//         console.log("Here")
		//         // throw err.response;
		//     });
	},
	getReferralsCount({ commit }) {
		const url = `sb/referrals/count`;
		return this.$axios
			.$get(url)
			.then(res => {
				commit("setReferralsCount", res.count);
			})
			.catch(err => {
				throw err.response;
			});
	},
	getReferralsProgressList({ commit }) {
		const url = `sb/referrals/progress`;
		return this.$axios
			.$get(url)
			.then(res => {
				commit("setReferralsProgressList", res.progress);
			})
			.catch(err => {
				throw err.response;
			});
	},
	async claimReward({}, payload) {
		let url = "sb/referrals/avail-rewards";
		try {
			const data = await this.$axios.$post(url, payload);
			if (data.statusCode == 200) {
				return true;
			}

			return false;
		} catch (err) {
			console.error("error claimReward ->", err);
			throw err;
		}
	},
	async getReferralURL({ rootState }) {
		let url = "sb/shorturl";
		let payload = {
			type: "referral",
			email: rootState.User.user.email,
		};
		try {
			const data = await this.$axios.$post(url, payload);
			if (data.data && data.data.url) {
				return { ok: true, data: data.data.url };
			}

			return { ok: false, data: "" };
		} catch (err) {
			console.error("error claimReward ->", err);
			throw err;
		}
	},
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
};
