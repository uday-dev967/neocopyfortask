import Vue from "vue";

const initialState = () => ({
	clientFiltersList: [
		{
			text: "Rohan Singh | 34232423242",
			value: "Rohan Singh | 34232423242",
		},
		{
			text: "Rahul Roshan | 34232423242",
			value: "Rahul Roshan | 34232423242",
		},
		{
			text: "Bharath | 34232423242",
			value: "Bharath | 34232423242",
		},
	],
	notificationsListPageSize: 40,
	notificationsListPageNo: 1,
	notificationsList: [],
	commentsList: [],
	statusMappingByCommentID: {},
	taskManagementStatusesInfo: {},
});

const defaultGetters = function() {
	return Object.keys(initialState()).reduce((acc, cv) => {
		acc[cv] = state => state[cv];
		return acc;
	}, {});
};

const defaultMutations = function() {
	return Object.keys(initialState()).reduce((acc, cv) => {
		let splitCV = cv.split("");
		splitCV[0] = splitCV[0].toUpperCase();
		acc["set" + splitCV.join("")] = (state, data) => (state[cv] = data);
		return acc;
	}, {});
};

export default {
	namespaced: true,
	state: initialState(),
	actions: {
		async fetchTaskManagementCommentList({}, payload = {}) {
			let pageNo = payload.pageNo || 1;
			let pageSize = payload.pageSize || 1000;

			let body = JSON.parse(JSON.stringify(payload));

			delete body.pageNo;
			delete body.pageSize;

			const { data, statusCode } = await this.$axios
				.$post(
					"/ap/taskmanagement/commenttasks" +
						`?pageNo=${pageNo}&pageSize=${pageSize}`,
					body
				)
				.catch(err => {
					return [];
					// throw err.response;
				});
			if (statusCode === 200 && data) {
				return data;
			}

			return [];
		},
		async fetchTaskManagementCommentListV2({}, payload = {}) {
			let body = JSON.parse(JSON.stringify(payload));
			const { data, statusCode } = await this.$axios
				.$post(
					"ap/taskmanagement/v2/commenttasks", 
					body
				)
				.catch(err => {
					return [];
					// throw err.response;
				});
			if (statusCode === 200 && data) {
				return data;
			}

			return [];
		},
		async fetchCommentsByRenderID({ dispatch, commit }, payload = {}) {
			payload = {
				...payload,
				pageNo: 1,
				pageSize: 1000,
			};
			const list = await dispatch(
				"fetchTaskManagementCommentList",
				payload
			);

			commit("setCommentsList", list);
			commit("addStatusMappingByCommentList", list);

			return list;
		},
		async fetchNotificationsList(
			{ dispatch, commit, state },
			payload = {}
		) {
			payload = {
				...payload,
			};
			const list = await dispatch(
				"fetchTaskManagementCommentListV2",
				payload
			);
			
			commit("setNotificationsList", list);	
			
			return list;
		},
		async updateTaskManagementCommentAttributeByID({ commit }, payload) {
			const { status } = await this.$axios
				.$put("/ap/taskmanagement/updatetask", payload)
				.catch(() => {
					return { ok: false };
				});

			if (status === 200) {
				commit("updateStatusMappingByCommentId", payload);

				return { ok: true };
			}
			return { ok: false };
		},
		async updateCommentAttributes( { state, dispatch }, payload = {} ) {

			const { status } = await this.$axios
				.$put("/ap/taskmanagement/updatecomment", payload)
				.catch(() => {
					return { ok: false };
				});

			if (status === 200) {
				return { ok: true };
			}
			return { ok: false };

			// newClientComment

		},
		async getTaskManagementStatusList({ commit }) {
			return this.$axios
				.$get("/ap/taskmanagement/getDesignerTaskCategories")
				.then(res => res["data"])
				.then(data => {
					commit(
						"setTaskManagementStatusesInfo",
						(data && data[0]) || {}
					);
				})
				.catch(err => {
					console.log(err);
				});
		},
		async getAPCustomerLeads({ commit }) {
			return this.$axios
				.$get("/ap/taskmanagement/getapcustomerleads")
				.then(res => res["data"])
				.then(data => {
					commit(
						"setClientFiltersList",
						data || []
					);
				})
				.catch(err => {
					console.log(err);
				});
		},
	},
	mutations: {
		...defaultMutations(),
		addStatusMappingByCommentList(state, data) {
			for (let comment of data) {
				Vue.set(
					state.statusMappingByCommentID,
					comment._id,
					comment.status
				);
			}
		},
		updateStatusMappingByCommentId(state, { _id, status } = {}) {
			Vue.set(state.statusMappingByCommentID, _id, status);
		},
		setClientFiltersList(state, data) {
			state.clientFiltersList = data;
		}
	},

	getters: {
		...defaultGetters(),
		statusFiltersList: state => {
			if (
				state.taskManagementStatusesInfo &&
				state.taskManagementStatusesInfo.statuses
			) {
				return state.taskManagementStatusesInfo.statuses.map(e => {
					return { text: e, value: e };
				});
			}

			return [];
		},
		commentsWithPositionData: state =>
			state.commentsList.filter(
				e => e.commentInfo && e.commentInfo.positionInfo
			),
	},
};
