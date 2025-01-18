<template>
	<div class="main-layout-container">
    	<div class="moodboard-dash-lay">
			<navbar id="nav"/>
			<a-side id="aside"/>
			<div class="moodboard-dashboard-main-wrapper">
				<nuxt id="main"/>
			</div>
		</div>
		<add-new-project-popup/>
		<delete-project-popup/>
		<clone-project-popup/>
		<rename-project-popup/>
		<moodboard-basic-paywall></moodboard-basic-paywall>
		<cancelConfirmationPopup></cancelConfirmationPopup>
	</div>
  </template>
  
  <script>
import navbar from "@/components/moodboardDashboard/moodboardNav.vue";
import aSide from "@/components/moodboardDashboard/moodboardAside.vue";
import deleteProjectPopup from "@/components/moodboardDashboard/projects/deleteProjectPopup.vue";
import renameProjectPopup from "@/components/moodboardDashboard/projects/renameProjectPopup.vue";
import cloneProjectPopup from "@/components/moodboardDashboard/projects/cloneProjectPopup.vue";
import addNewProjectPopup from "@/components/moodboardDashboard/projects/addNewProjectPopup.vue";
import moodboardBasicPaywall from "@/components/shared/popups/moodboardBasicPaywall.vue";
import cancelConfirmationPopup from "@/components/shared/popups/cancelConfirmationPopup.vue";
import { mapActions, mapGetters } from "vuex";
export default {
	components: {
		navbar,
		aSide,
		addNewProjectPopup,
		deleteProjectPopup,
		cloneProjectPopup,
		renameProjectPopup,
		moodboardBasicPaywall,
		cancelConfirmationPopup
	},
	data() {
		return {};
	},
	computed: {},
	mounted() {
		this.getMoodboardProjects();
		this.getTemplatesInspirationType();
		this.getTemplatesRoomType();
		this.fetchProjects();
	},
	methods: {
		...mapActions("moodboardDashboard", [
			"getMoodboardProjects",
			"getTemplatesInspirationType",
			"getTemplatesRoomType",
		]),
		...mapActions("Moodboard", ["fetchProjects"]),
	},
};
</script>
<style lang="scss" scoped>
.main-layout-container {
	overflow: hidden;
	height: 100vh;
	.moodboard-dash-lay {
		display: grid;
		grid-template-columns: 6.25rem * 1.22 auto;
		grid-template-rows: minmax(3.75rem, max-content) auto;
		grid-template-areas:
			"nav nav"
			"aside main";
		@include respond(phone) {
			// width < 900px?
			grid-template-columns: max-content;
		}
		#nav {
			// height: 100%;
			grid-area: nav;
		}

		#aside {
			grid-area: aside;
		}
		.moodboard-dashboard-main-wrapper {
			height: calc(100vh - 3.75rem * 1.22);
			overflow: hidden;

			& > div,
			section {
				grid-area: main;
				background: $color-white;
				z-index: 0;
				padding: 1.5625rem 2.1875rem 2.1875rem 1.5625rem;
				overflow-y: auto;
				height: 100%;
			}
			// #main {
			// }
		}
	}
}
</style>

<style lang="scss">
.moodboard-dashboard-main-wrapper {
	.cta-banner-wrapper.banner-wrapper {
		background: $color-white;
		border: 1px solid #e8e8e8;
		border-radius: 0.25rem * 1.22;
		margin: 0rem;
		background: linear-gradient(
			93.74deg,
			rgba(233, 190, 179, 0.1) 0.04%,
			rgba(233, 190, 179, 0) 32.31%
		);
		.heading {
			font-weight: 700;
			font-size: 1.25rem * 1.22;
			width: auto;
			margin-top: 1rem;
		}
		.subheading {
			font-weight: 400;
			font-size: 0.75rem * 1.22;
			width: auto;
		}
		.banner-action {
			font-weight: 600;
			font-size: 0.6875rem * 1.22;
		}
		.banner-action {
			margin-bottom: 1rem;
			button {
				background: #e9beb3;
				border-radius: 0.25rem;
				font-weight: 600;
				font-size: 0.6875rem * 1.22;
				color: #232121;
			}
		}

		.image-wrapper {
			margin: 0rem;
			height: 100%;
			width: 60%;
			position: relative;
			&::before {
				content: "";
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background: radial-gradient(
					78.94% 377.32% at 54.88% 33%,
					rgba(217, 217, 217, 0) 0%,
					$color-white 100%
				);
			}
			& img {
				display: block;
				width: 100%;
				height: auto;
			}
		}

		.content-wrapper {
			padding-left: 3.75rem;
		}
	}
}
.add-new-project {
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background: radial-gradient(
		139.03% 139.03% at 50% 174.74%,
		$color-second 0%,
		rgba(233, 190, 179, 0) 100%
	);
	border: 0.956905px dashed #d19788;
	border-radius: 9.56905px;
	cursor: pointer;
}
</style>
