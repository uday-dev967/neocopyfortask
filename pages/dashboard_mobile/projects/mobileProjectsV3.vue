<template>
	<div class="mobile-projects-wrapper">
		<div class="mobile-content-wrapper">
			<template v-if="doesUserHaveProjects">
				<mobileProjectsComponent
					:projects="userProjectsWithPagination"
					projectsSectionHeader=""
					templatesSectionHeader=""
					:hideStartFromScratchCard="true"
				>
					<template slot="viewAll"> <div></div> </template
				></mobileProjectsComponent>
				<ScrollObserver
					v-if="userProjectsWithPagination.length >= 10"
					v-on:scrolledToEnd="loadMoreProjects"
				/>
			</template>
			<template v-else>
				<!-- <div class="no-projects-container">
					<svg
						class="svg-wrapper"
						xmlns="http://www.w3.org/2000/svg"
						width="25"
						height="24"
						viewBox="0 0 25 24"
						fill="none"
					>
						<path
							d="M12.5 22C18.0228 22 22.5 17.5228 22.5 12C22.5 6.47715 18.0228 2 12.5 2C6.97715 2 2.5 6.47715 2.5 12C2.5 17.5228 6.97715 22 12.5 22Z"
							stroke="#C4C4C4"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M12.5 6V12L16.5 14"
							stroke="#C4C4C4"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
					<div class="text">
						{{ $t("mobileSection.noProjectsText[0]") }}
					</div>
					<div class="text">
						{{ $t("mobileSection.noProjectsText[1]") }}
					</div>
				</div> -->
				<mobileProjectsComponent
					class="no-projects-wrapper"
					:projects="[]"
					:templates="mobileInspirations"
					:hideStartFromScratchCard="true"
					projectsSectionHeader=""
					templatesSectionHeader=""
				>
					<template slot="viewAll"> <div></div> </template
				></mobileProjectsComponent>
			</template>
		</div>
	</div>
</template>
<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
import mobileProjectsComponent from "@/components/shared/mobile/mobileProjectsComponentV2.vue";
import ScrollObserver from "@/components/shared/scrollObserver.vue";
import MobileInspirationMixin from "../../../mixins/mobileInspirationMixin";
export default {
	mixins: [
		MobileInspirationMixin
	],
	components: {
		mobileProjectsComponent,
		ScrollObserver,
	},
	mounted() {
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
	},
	computed: {
		...mapGetters("Projects", [
			"userProjectsWithPagination",
			"inspirations",
			"pageNumber",
		]),
		doesUserHaveProjects() {
			// return false;
			return (
				this.userProjectsWithPagination &&
				this.userProjectsWithPagination.length > 0
			);
		},
	},
	methods: {
		...mapMutations({
			setPageNumber: "Projects/setPageNumber",
			setPageSize: "Projects/setPageSize",
		}),
		...mapActions("Projects", [
			"fetchMobileInspirations",
			"fetchInspirationsV2",
			"fetchProjectsWithPagination",
		]),
		loadMoreProjects() {
			this.setPageNumber(this.pageNumber + 1);
			this.fetchProjectsWithPagination();
		},
	},
};
</script>
<style lang="scss" scoped>
.mobile-projects-wrapper {
	.mobile-content-wrapper {
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
.mobile-projects-wrapper {
	.mobile-content-wrapper {
		.no-projects-wrapper {
			.templates-wrapper {
				&:last-child {
					margin-top: 2rem;
				}
			}
		}
	}
}
</style>
