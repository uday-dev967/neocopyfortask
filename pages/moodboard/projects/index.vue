<template>
    <div class="project-container">
		<div class="projects-grid-wrapper">
			<div class="add-new-project" @click="createNewProject">
				<div class="new-project-icon">
					<svg xmlns="http://www.w3.org/2000/svg" width="37" height="36" viewBox="0 0 37 36" fill="none">
						<path fill-rule="evenodd" clip-rule="evenodd" d="M17.8288 35.552C16.7719 35.552 15.915 34.9423 15.915 34.1901V1.50823C15.915 0.75616 16.7719 0.146484 17.8288 0.146484C18.8858 0.146484 19.7427 0.75616 19.7427 1.50823V34.1901C19.7427 34.9423 18.8858 35.552 17.8288 35.552Z" fill="#E9BEB3"/>
						<path opacity="0.8" fill-rule="evenodd" clip-rule="evenodd" d="M36.01 18.3274C36.01 19.3843 35.4003 20.2412 34.6481 20.2412H1.96624C1.21417 20.2412 0.604492 19.3843 0.604492 18.3274C0.604492 17.2704 1.21417 16.4136 1.96624 16.4136H34.6481C35.4003 16.4136 36.01 17.2704 36.01 18.3274Z" fill="#E9BEB3"/>
					</svg>
				</div>
				<div class="new-project-text">
					Create New MoodBoard
				</div>
			</div>
			<moodboard-project-card
			v-for="project in moodboardProjects"
			:key="project._id"
			:cardDetails="project"
			:onCardHoverText="'Open Moodboard'"
			@onProjectOverlayBtnCLick="openMoodboardProject"
			/>
		</div>
    </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import moodboardProjectCard from "@/components/moodboardDashboard/moodboardProjectCard.vue";
import MoodboardDashboardMixin from "@/mixins/moodboardDashboardMixin";

export default {
	components: { moodboardProjectCard },
	layout: "moodboard-dashboard",
	middleware: ["initAuth", "authReq"],
	data() {
		return {};
	},
	mixins: [MoodboardDashboardMixin],
	computed: {
		// ...mapGetters("moodboardDashboard", ["moodboardProjects"]),
		...mapGetters("Moodboard", ["moodboardProjects"]),
	},
	watch: {},
	methods: {
		...mapMutations("moodboardDashboard", ["setNewProject"]),
		createNewProject() {
			this.onCreateMoodBoardButtonClick();
		},
		openMoodboardProject(cardDetails) {
			this.openProject(cardDetails._id);
			// console.log(cardDetails);
			// window.open(
			// 	// window.location.origin + `/moodboard?project=${res.id}`
			// 	`https://neostaging.foyr.com/moodboard/?project=${
			// 		cardDetails._id
			// 	}`
			// );
		},
	},
};
</script>
<style lang="scss" scoped>
.projects-grid-wrapper {
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	grid-auto-rows: 10rem * 1.22;
	gap: 1rem;
}
</style>
