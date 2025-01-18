import { mapActions, mapState, mapMutations, mapGetters } from "vuex";
const MoodboardDashboardMixin = {
	components: {},
	data: () => ({}),
	computed: {
		...mapGetters("Billing", [
			"hasMoodBoardPlanExpired",
			"isMoodBoardPlanCancelled",
			"isUserAMoodboardUser",
		]),
		...mapState({
			usersProjects: state => state.Projects.usersProjects,
			currentSubscription: state => state.Billing.currentSubscription,
			currentMoodboardSubscription: state =>
      state.Billing.currentMoodboardSubscription,
			activeMoodboardRewardPlan: state => state.Billing.activeMoodboardRewardPlan,
			switchToMoodboard: state => state.User.switchToMoodboard,
			moodboardProjects: state => state.Moodboard.projects,
		}),
	},
	mounted() {},
	watch: {},
	methods: {
		...mapMutations("moodboardDashboard", ["setNewProject"]),
		...mapMutations({
			setShowMoodboardBasicPaywall: "Dash/setShowMoodboardBasicPaywall",
		}),
		...mapActions({
			createNewProject: "Moodboard/newProject",
		}),
		addMoodboardProject() {
			if (!this.checkProjectNamePattern(this.projectName)) {
				let projectNameDup = this.projectName;
				var projectsDuplicate = [];
				if (this.moodboardProjects) {
					projectsDuplicate = this.moodboardProjects.filter(function(
						project
					) {
						return project.name === projectNameDup;
					});
				}
				if (projectsDuplicate && projectsDuplicate.length > 0) {
					this.message.error = true;
					// this.message.global = true;
					this.message.value = "Project name already exists.";
					setTimeout(() => {
						this.message.error = false;
						this.message.global = false;
						this.message.value = "";
					}, 2500);
					return;
				}
				this.createNewProject({
					type: ["project"],
					name: this.projectName,
					folder: null,
				})
					.then(res => {
						this.newProject = false;
						this.message.error = false;
						this.message.value = res.message;
						this.message.global = true;
						setTimeout(() => {
							this.message.error = false;
							this.message.global = false;
							this.message.value = "";
						}, 4000);
						localStorage.setItem("newProject", true);
						window.open(
							window.location.origin +
								`/moodboard?project=${res.id}`
						);
					})
					.catch(error => {
						console.log("ERROR", error);
						if (error.data && error.data.err) {
							this.message.global = true;
							// this.message.error = true;
							this.message.value = error.data.err.message;
							setTimeout(() => {
								this.message.error = false;
								// this.message.global = false;
								this.message.value = "";
							}, 2000);
						}
					});
			} else {
				this.message.error = true;
				this.message.global = false;
				// this.message.value = "Please enter project name";
				setTimeout(() => {
					this.message.error = false;
					this.message.global = false;
					this.message.value = "";
				}, 2000);
			}
		},
		checkProjectNamePattern(_projectName) {
			let tempProject = _projectName;
			// const namePattern = /^[A-Za-z0-9_ ]*$/;
			const namePattern = /^[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\u00C0-\u00FFA-Za-z0-9_ ]*$/;
			let error = false;
			let errorType = "";
			if (!tempProject || tempProject.trim("").length <= 0) {
				error = true;
				errorType = "any.empty";
			}
			if (tempProject.trim("") && tempProject.trim("").length > 0) {
				if (tempProject.length >= 50) {
					error = true;
					errorType = "max.limit";
				} else if (tempProject.trim("").length <= 1) {
					error = true;
					errorType = "min.limit";
				} else {
				}
			}
			let testValue = namePattern.test(tempProject);
			if (!testValue) {
				error = true;
				errorType = "string.regex.base";
			}
			switch (errorType) {
				case "any.empty":
					this.message.value = "Name should not be empty!";
					break;
				case "string.min":
					this.message.value = `Name should have at least ${
						err.context.limit
					} characters!`;
					break;
				case "string.max":
					this.message.value = `Name should have at most ${
						err.context.limit
					} characters!`;
					break;
				case "string.regex.base":
					this.message.value = `Name can contain only alphanumeric characters, spaces and underscores.`;
					break;
				case "max.limit":
					this.message.value =
						"Name should have at most 50 characters!";
					break;
				case "min.limit":
					this.message.value =
						"Name should have at least 2 characters!";
					break;
				default:
					break;
			}
			return error;
		},
		openProject(id) {
			if (!this.isUserAMoodboardUser) return;

			let today = new Date().getTime();
			if (
				this.hasMoodBoardPlanExpired ||
				(this.isMoodBoardPlanCancelled && this.currentMoodboardSubscription &&
					this.currentMoodboardSubscription.chargebeeSubscriptionData
						.status !== "non_renewing")
			) {
				this.setShowMoodboardBasicPaywall(true);
				return;
			}
			window.open(
				window.location.origin + `/moodboard?project=${id}`
				// `https://neostaging.foyr.com/moodboard/?project=${id}`
			);
		},
		onCreateMoodBoardButtonClick() {
			if (!this.isUserAMoodboardUser) return;

			let today = new Date().getTime();
			if (
				this.hasMoodBoardPlanExpired ||
				(this.isMoodBoardPlanCancelled && this.currentMoodboardSubscription &&
					this.currentMoodboardSubscription.chargebeeSubscriptionData
						.status !== "non_renewing")
			) {
				this.setShowMoodboardBasicPaywall(true);
				return;
			}
			this.setNewProject(true);
		},
		checkSpecialCharacters(str) {
			var specialCharsPattern = /[!`~@#$%^&*()+\-=[\]{};':"\\|,.<>?]+/;
			return specialCharsPattern.test(str);
		},
	},
};

export default MoodboardDashboardMixin;
