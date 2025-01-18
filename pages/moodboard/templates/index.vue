<template>
    <div class="moodboard-dashboard-templates-main">
		<banner
			:imageUrl="require('../../../assets/images/dashboard/templates-design-banner.png')"
			>
				<template slot="bannerContent">
						<div class="heading">
							Get your project off to a great start with 
							our expertly curated templates!		
						</div>
						<div class="subheading">
							Start with hand-picked moodboard templates for your project!
						</div>
						<div class="banner-action">
							<button class="banner-action-btn" @click="onBannerButtonClick">Try Templates</button>
						</div>
				</template>
			</banner>
		<templates-layout/>
    </div>
</template>


<script>
// import { mapActions, mapGetters } from "vuex";
import templatesLayout from "@/components/moodboardDashboard/templatesLayout.vue";
import banner from "@/components/shared/dashboard/banner.vue";

export default {
	components: {
		templatesLayout,
		banner
	},
	middleware: ["initAuth", "authReq"],
	layout: "moodboard-dashboard",
	computed: {},
	data() {
		return {};
	},
	watch: {},
	methods: {
		isProjectMoodboardProject(project) {
			if (project && project.isMBProject) {
				return true;
			}
			return false;
		},
		onBannerButtonClick() {
			const element = document.getElementById("templateLayout");
			element.scrollIntoView({ behavior: "smooth" });
		},
	},
};
</script>

<style lang="scss" scoped>
.moodboard-dashboard-templates-main {
}
</style>
