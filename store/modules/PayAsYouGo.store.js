const initialState = () => ({
	payAsYouGoTransactions: [],
	isCreditsConfirmationPopupVisible: false,
	confirmationPopupConfig: {
		height: "42rem",
		width: "40.87rem",
		buttonClickCB: undefined,
		headerTextRef: "payAsYouGo.creditsConfirmationPopupHeader",
		bodyTextRef: "payAsYouGo.serviceChargeText",
	},
	payAsYouGoUseageLimits: null,
	payAsYouGoServices: {
		CREATE_NEW_PROJECT: {
			credits: 100,
			required: 1,
			code: "",
		},
	},
	payAsYouGoTransactionsPageTracker: 1
});

const defaultGetters = function () {
	return Object.keys(initialState()).reduce((acc, cv) => {
		acc[cv] = (state) => state[cv];
		return acc;
	}, {});
};

const defaultMutations = function () {
	return Object.keys(initialState()).reduce((acc, cv) => {
		let splitCV = cv.split("");
		splitCV[0] = splitCV[0].toUpperCase();
		acc["set" + splitCV.join("")] = (state, data) => (state[cv] = data);
		return acc;
	}, {});
};

const state = initialState();

const actions = {
	closeConfirmationPopupConfig({ commit }) {
		commit("setIsCreditsConfirmationPopupVisible", false);
		commit(
			"setConfirmationPopupConfig",
			initialState().confirmationPopupConfig
		);
	},
	openConfirmationPopupConfig({ commit }, popupConfig = {}) {
		commit("setIsCreditsConfirmationPopupVisible", true);
		commit(
			"setConfirmationPopupConfig",
			Object.assign(initialState().confirmationPopupConfig, popupConfig)
		);
	},
	async fetchPayAsYouGoUseageLimits({ commit }) {
		const url = "payasyougo/limit";
		return this.$axios
			.$get(url, {})
			.then((res) => {
				if (res)
					commit("setPayAsYouGoUseageLimits", res);
			})
			.catch((err) => {
				throw err.response;
			});
	},
	async updateDoNotShowCreditsPopupForService({ dispatch }, { service }) {
		dispatch( "User/updateProjectDetail", { keyToUpdate: `doNotShowCreditsPopup.${service}`, data: true }, { root: true } );
	},
	async fetchCreditTransactions({ commit, state }, { page=1, limit=10 } = {}) {
		const url = `sb/notifications/all?page=${page}&limit=${limit}`;
		return this.$axios
			.$get(url, {})
			.then((res) => {
				if (res && res.data) {
					if (page === 1) {
						commit("setPayAsYouGoTransactions", res.data);
						commit("setPayAsYouGoTransactionsPageTracker", 1);
					} else {
						commit("setPayAsYouGoTransactions", [ ...state.payAsYouGoTransactions, ...res.data ]);
					}
				}
			})
			.catch((err) => {
				throw err.response;
			});
	},
	refreshCreditsAndUseageLimitsData({ dispatch, rootGetters }) {
		let isUserOnPayAsYouGoPlan =
			rootGetters["Billing/isUserOnPayAsYouGoPlan"];
		let userData = rootGetters["User/user"];
		if (isUserOnPayAsYouGoPlan) {
			dispatch("fetchPayAsYouGoUseageLimits");
			dispatch("Billing/fetchCurrentSub", userData.accountId, {
				root: true,
			});
		}
	},
};

const mutations = {
	...defaultMutations(),
};

const getters = {
	...defaultGetters(),
	showCreditsConfirmationPopupForService: (state, getters, rootState, rootGetters) => {
		return (service) => {
			let productMasterAccountInfo = rootGetters[ "User/productMasterAccountInfo" ];
			if (state.payAsYouGoUseageLimits) {
				switch (service) {
					case "CREATE_NEW_PROJECT": {
						if (
							state.payAsYouGoUseageLimits.freeProjectLimit >
							state.payAsYouGoUseageLimits.createdProjectCount
						) {
							return false;
						}

						break;
					}
				}
			}

			if (
				productMasterAccountInfo &&
				productMasterAccountInfo.doNotShowCreditsPopup &&
				productMasterAccountInfo.doNotShowCreditsPopup[service]
			) {
				return false;
			}

			return true;
		};
	},
	creditsRequiredForService: (state, getters, rootState, rootGetters) => {
		return (service) => {
			let serviceToCheck = state.payAsYouGoServices[service];

			if (serviceToCheck) {
				return serviceToCheck.required || 0;
			}

			return 0;
		};
	},
};

export default {
	namespaced: true,
	state,
	actions,
	mutations,
	getters,
};
