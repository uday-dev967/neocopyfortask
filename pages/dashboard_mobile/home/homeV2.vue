<template>
	<div class="home-v2-wrapper">
		<div class="content-wrapper">
			<mobileProjectsComponent
				:projects="
					(userProjectsWithPagination &&
						userProjectsWithPagination.slice(0, 1)) ||
					[]
				"
				:templates="mobileInspirations"
			>
				<template slot="viewAll">
					<div v-if="userProjectsWithPagination.length === 1"></div>
				</template>
			</mobileProjectsComponent>
		</div>
	</div>
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";
import mobileProjectsComponent from "@/components/shared/mobile/mobileProjectsComponent.vue";
import CommonUtilities from "../../../mixins/commonUtilitiesMixin";
import MobileInspirationMixin from "../../../mixins/mobileInspirationMixin";
export default {
	mixins: [
		CommonUtilities,
		MobileInspirationMixin
	],
	components: {
		mobileProjectsComponent,
	},
	data() {
		return {}
	},
	mounted() {
		// this.addOrRemoveClassToBody({status: true, className: "hide-fresh-chat-widget"})
		if (
			this.userProjectsWithPagination &&
			this.userProjectsWithPagination.length === 0
		) {
			this.fetchProjectsWithPagination();
		}

		if (
			!this.inspirations ||
			(this.inspirations && this.inspirations.length === 0)
		) {
			this.fetchMobileInspirations({
				pageSize: 10,
				pageNum: 1,
				search: "",
				// sortBy: "inspirationUsageCnt",
				mobileInspiration: true
			});
		}
		this.sendEventToTrack('Landed on Mobile DB')
	},
	computed: {
		...mapGetters("Projects", [
			"userProjectsWithPagination",
			"inspirations",
		]),
	},
	methods: {
		...mapActions("Projects", [
			"fetchMobileInspirations",
			"fetchInspirationsV2",
			"fetchProjectsWithPagination",
			// "addOrRemoveClassToBody"
		]),
	},
};
</script>
<style lang="scss" scoped>
.home-v2-wrapper {
	height: 100%;
	width: 100%;
	background: linear-gradient(244deg, #e9beb3 -9.34%, #f6e5e1 115.48%);
	overflow: hidden;

	.content-wrapper {
		background-color: $background-white;
		width: 100%;
		height: 100%;
		flex-shrink: 0;
		border-radius: 20px 20px 0px 0px;
		border: $background-white-9;
		box-shadow: 0px 12px 20px 0px rgba(0, 0, 0, 0.04);
		overflow: auto;
	}
}
</style>
<style lang="scss">
.hide-fresh-chat-widget {
	#fc_frame {
		display: none !important;
	}
}
</style>
