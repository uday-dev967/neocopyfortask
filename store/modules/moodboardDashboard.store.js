const state = {
	moodboardProjects: null,
	rootFolders: null,
	newProject: false,
	showDeleteConfirmation: false,
	cloneProject: false,
	selectedProjectForActions: null,
	inspirationTypesGroupedTempaltes: [],
	roomTypesGroupedTempaltes: [],
	stylesFilterList: null,
	showRename: false,
	message: {
		value: "",
		global: false,
		error: false,
	},
};

const getters = {
	moodboardProjects: state => state.moodboardProjects,
	rootFolders: state => state.rootFolders,
	newProject: state => state.newProject,
	showDeleteConfirmation: state => state.showDeleteConfirmation,
	cloneProject: state => state.cloneProject,
	selectedProjectForActions: state => state.selectedProjectForActions,
	inspirationTypesGroupedTempaltes: state =>
		state.inspirationTypesGroupedTempaltes,
	roomTypesGroupedTempaltes: state => state.roomTypesGroupedTempaltes,
	stylesFilterList: state => state.stylesFilterList,
	showRename: state => state.showRename,
	message: state => state.message,
};

const actions = {
	getMoodboardProjects({ dispatch, commit }) {
		return new Promise((resolve, reject) => {
			console.log("getprojects");
			dispatch("Projects/fetchFoldersTree", null, { root: true })
				.then(res => {
					commit("setMoodboardProjects", res);
					commit("setRootFolders", res);
					resolve(res);
				})
				.catch(err => {
					reject(err);
				});
		});
	},
	addNewMbProject({}, payload) {
		return new Promise((resolve, reject) => {
			let url = `/mb/fp/v2project`;
			this.$axios
				.$post(url, {
					...payload,
					type: ["project"],
				})
				.then(res => {
					resolve(res);
				})
				.catch(err => {
					reject({
						value: err.response.data.error.message,
						error: true,
						global: false,
					});
				});
		});
	},
	deleteMBProject({ state, dispatch, commit }) {
		return new Promise((resolve, reject) => {
			let preparedURL = `/fp/project/${
				state.selectedProjectForActions._id
			}?isMBProject=true`;
			this.$axios
				.$delete(preparedURL, { isDeleted: true })
				.then(res => {
					resolve(res);
				})
				.catch(err => {
					reject({
						value: err.response.data.error.message,
						error: true,
						global: false,
					});
				});
		});
	},

	cloneMBProject({ state, dispatch }, payload) {
		return new Promise((resolve, reject) => {
			let url = `/fp/v2project/clone/${
				state.selectedProjectForActions._id
			}?isMBProject=true`;
			this.$axios
				.$post(url, {
					...payload,
					id: state.selectedProjectForActions._id,
					folder: state.selectedProjectForActions,
				})
				.then(res => {
					resolve(res);
				})
				.catch(err => {
					console.error("ERROR", err);
					reject({
						value: err.response.data.error.message,
						error: true,
						global: false,
					});
				});
		});
	},
	async getTemplatesInspirationType({ commit }) {
		return new Promise(async (resolve, reject) => {
			const url = "/mb/fp/project/grouped-templates/inspirationType";
			try {
				const data = await this.$axios.$get(url);
				if (data.statusCode == 200) {
					console.log("inspirationType", data.data);
					commit("setInspirationTypeGroupedTempaltes", data.data);
					commit("setStylesFilteredList", data.data);
					resolve(data);
				}
			} catch (err) {
				console.error(err);
				reject(err);
			}
		});
	},

	async getTemplatesRoomType({ commit }) {
		return new Promise(async (resolve, reject) => {
			const url = "/mb/fp/project/grouped-templates/roomType";
			try {
				const data = await this.$axios.$get(url);
				if (data.statusCode == 200) {
					console.log("roomType", data);
					commit("setRoomTypesGroupedTemplates", data.data);
					resolve(data);
				}
			} catch (err) {
				console.error(err);
				reject(err);
			}
		});
	},

	async createProjectBasedOnTemplates({}, payload) {
		return new Promise(async (resolve, reject) => {
			const url = "/mb/fp/v2project/create-project-from-template";
			try {
				const data = await this.$axios.$post(url, payload);
				console.log(data);
				resolve(data);
			} catch (err) {
				console.error(err);
				reject(err);
			}
		});
	},
	renameMBProject({ state }, payload) {
		return new Promise((resolve, reject) => {
			let preparedURL;
			let renamePayload = {
				projectId: state.selectedProjectForActions._id,
				...payload,
			};
			// console.log(renamePayload);
			if (
				renamePayload &&
				renamePayload.projectId &&
				renamePayload.name
			) {
				preparedURL =
					"/fp/project/properties/title/" +
					renamePayload.projectId +
					"?isMBProject=true";
				this.$axios
					.$put(preparedURL, { name: renamePayload.name })
					.then(res => {
						if (res.statusCode === 200) {
							resolve(res);
						}
					})
					.catch(err => {
						// reject(err)
						reject({
							value: err.response.data.error.message,
							error: true,
							global: false,
						});
					});
			} else {
				resolve(); // Resolve immediately if the required payload data is missing
			}
		});
	},
};

const mutations = {
	setMoodboardProjects(state, payload) {
		state.moodboardProjects = payload.projects.filter(
			project => project && project.isMBProject
		);
		console.log(state.moodboardProjects);
	},
	setRootFolders(state, payload) {
		state.rootFolders = payload;
	},
	setNewProject(state, payload) {
		state.newProject = payload;
	},
	setshowDeleteConfirmation(state, payload) {
		state.showDeleteConfirmation = payload;
	},
	setcloneProject(state, payload) {
		state.cloneProject = payload;
	},
	setselectedProjectForActions(state, payload) {
		state.selectedProjectForActions = payload;
	},
	setInspirationTypeGroupedTempaltes(state, payload) {
		state.inspirationTypesGroupedTempaltes = payload;
	},
	setRoomTypesGroupedTemplates(state, payload) {
		state.roomTypesGroupedTempaltes = payload;
	},
	setStylesFilteredList(state, payload) {
		state.stylesFilterList = payload.map(style => style._id);
	},
	setshowRename(state, payload) {
		state.showRename = payload;
	},
	setMessage(state, payload) {
		state.message = payload;
		setTimeout(() => {
			state.message.error = false;
			state.message.global = false;
			state.message.value = "";
		}, 2000);
	},
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
};
