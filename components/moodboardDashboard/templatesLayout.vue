<template>
	<div id="templateLayout">
		<div v-if="selectedFilteredList && selectedFilteredList.length" class="inspiration-types-container">
			<slider
			:slidesDataForSlider="selectedFilteredList"
			:noOfSlidesInView="5"
			:thumbnailKey="selectedFilter.length > 0 ? 'image':'thumbnail'"
			:leftTextKey="selectedFilter.length > 0 ? 'title':'_id'"
			:rightTextKey="selectedFilter.length > 0 ? '': 'count'"
			:slidesToMovesOnArrowCLick = "1"
			:onCardHoverText="selectedFilter.length > 0 ? 'Use This Template' :'View Style'"
			:showSliderArrow="selectedFilteredList.length > 5 ? true : false"
			:showSeeAll="selectedFilteredList.length > 5 ? true : false"
			@onOverlayBtnCLick="handleStylesOverlayClick"
			@onSeeAllCLick="redirectToTemplatePage"
			>
			<template slot="sliderHeaderx">
				<div class="inspiration-types-header">
					<!-- {{`Room Moodboard Templates${totalNumberOfRoomTypeTemplates}`}} -->
					<div class="header-text">
						{{`Styles`}}
					</div>
				</div>
			</template>
			<template slot="belowHeadingSection">
				<div class="filter-wrapper">
					<div v-for="(filter, index) in stylesFilterList" :key="index" class="filter-options" :class="filter == selectedFilter ? 'selected' : ''" @click="handleFilterCLick(filter)">
						{{ filter }}
					</div>
				</div>
			</template>
		</slider>
		</div>

		<div class="room-types-container" v-if="roomTypesGroupedTempaltes">
			<div v-for="rooms in roomTypesGroupedTempaltes" :key="rooms._id" class="room-types-wrapper">
				<slider
				:slidesDataForSlider="rooms.templates"
				:noOfSlidesInView="5"
				:thumbnailKey="'image'"
				:leftTextKey="'title'"
				:pathDataForSeeAll="rooms._id"
				:slidesToMovesOnArrowCLick = "1"
				onCardHoverText="Use This Template"
				:showSeeAll="rooms.templates.length > 5"
				:showSliderArrow="rooms.templates.length > 5"
				@onOverlayBtnCLick="createProjectFromTemplate"
				@onSeeAllCLick="redirectToSubTemplatePage"
				>
				<template slot="sliderHeaderx">
					<div class="room-types-header">
						<div class="header-text">
							{{`${rooms._id} Room Templates`}} <span class="header-text-counts">{{ rooms.templates.length }}</span>
						</div>
					</div>
				</template>
			</slider>
			</div>
		</div>
	</div>
</template>


<script>
import { mapGetters, mapActions, mapState, mapMutations } from "vuex";
import slider from "@/components/moodboardDashboard/slider.vue";
import MoodboardDashboardMixin from "@/mixins/moodboardDashboardMixin";

export default {
	components: {
		slider,
	},
	mixins: [MoodboardDashboardMixin],
	data() {
		return {
			selectedFilter: "",
			selectedFilteredList: [],
		};
	},
	computed: {
		...mapGetters("moodboardDashboard", [
			"inspirationTypesGroupedTempaltes",
			"roomTypesGroupedTempaltes",
			"stylesFilterList",
		]),
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
			switchToMoodboard: state => state.User.switchToMoodboard,
			moodboardProjects: state => state.Moodboard.projects,
		}),
	},
	mounted() {
		this.selectedFilteredList = this.inspirationTypesGroupedTempaltes;
	},
	watch: {
		inspirationTypesGroupedTempaltes: {
			handler(newValue, oldValue) {
				console.log("watcher");
				if (newValue) {
					this.selectedFilteredList = this.inspirationTypesGroupedTempaltes;
					console.log(this.selectedFilter, "test");
				}
			},
			deep: true,
		},
	},
	methods: {
		...mapActions("moodboardDashboard", ["createProjectBasedOnTemplates"]),
		...mapMutations({
			setShowMoodboardBasicPaywall: "Dash/setShowMoodboardBasicPaywall",
		}),
		handleFilterCLick(filter) {
			console.log(
				this.selectedFilter.length > 0 &&
					this.$route.name == "moodboard-templates"
			);
			if (this.selectedFilter == filter) {
				this.selectedFilter = "";
				this.selectedFilteredList = this.inspirationTypesGroupedTempaltes;
				// console.log(this.selectedFilter);
			} else {
				this.selectedFilter = filter;
				const filteredInspiration = this.inspirationTypesGroupedTempaltes.filter(
					inspiration => inspiration._id == filter
				);
				this.selectedFilteredList = filteredInspiration[0].templates;
				// console.log(this.selectedFilter);
			}
		},
		handleStylesOverlayClick(template, hoverText) {
			// console.log(template, hoverText);
			if (hoverText == "View Style") {
				this.handleFilterCLick(template._id);
			} else if (hoverText == "Use This Template") {
				// this.openProject(template._id);
				console.log({
					templateId: template,
				});
				this.createProjectFromTemplate(template);
				// window.open(
				// 	// window.location.origin + `/moodboard?project=${res.id}`
				// 	`https://neostaging.foyr.com/moodboard/?project=${
				// 		template._id
				// 	}`
				// );
			}
		},
		createProjectFromTemplate(template, hoverText) {
			// console.log(template, hoverText);
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
			this.createProjectBasedOnTemplates({
				templateId: template._id,
			}).then(res => {
				if (res.statusCode == 200) {
					this.openProject(res.id);
					// window.open(
					// 	// window.location.origin + `/moodboard?project=${res.id}`
					// 	`https://neostaging.foyr.com/moodboard/?project=${
					// 		res.id
					// 	}`
					// );
				}
			});
		},
		redirectToTemplatePage() {
			this.$router.push({
				path: `/moodboard/templates`,
			});
		},
		redirectToSubTemplatePage(data) {
			this.$router.push({
				path: `/moodboard/templates/${data}`,
			});
		},
	},
};
</script>

<style lang="scss" scoped>
#templateLayout {
	padding-top: 1rem * 1.22;
}
.header-text {
	font-weight: 700;
	font-size: 0.9375rem * 1.22;
	color: #222021;
}
.inspiration-types-container {
	// margin-top: 1.75rem * 1.22;
	// margin-bottom: 1.875rem * 1.22;
	.filter-wrapper {
		display: flex;
		flex-wrap: wrap;

		// grid-auto-flow: column;
		// grid-template-rows: 1fr;
		// gap: 1rem;
		.filter-options {
			display: flex;
			cursor: pointer;
			align-items: center;
			justify-content: center;
			text-align: center;
			padding: 0.3125rem 0.625rem;
			border: 1px solid rgba(233, 190, 179, 0.5);
			border-radius: 4px;
			font-weight: 500;
			font-size: 0.5625rem * 1.22;
			color: #0e0e0e;
			margin-right: 0.75rem;
			margin-bottom: 0.5rem;
			&:hover,
			&.selected {
				background-color: rgba(233, 190, 179, 0.2);
			}
		}
	}
}
.inspiration-types-header {
	display: flex;
	width: 100%;
	.header-text {
		margin-right: 1rem;
	}
}

.room-types-header {
	.header-text {
		display: flex;
		align-items: center;
		.header-text-counts {
			padding: 0.25rem * 1.22 0.5rem * 1.22;
			// width: 1.9375rem;
			// height: 1.9375rem;
			background: #e9beb3;
			border-radius: 0.25rem * 1.22;
			font-weight: 500;
			font-size: 0.625rem * 1.22;
			color: #232121;

			margin-left: 0.25rem * 1.22;
			display: flex;
			justify-content: center;
			align-items: center;
			line-height: 1;
		}
	}
}

.room-types-container {
	.room-types-wrapper {
		margin-bottom: 1.875rem * 1.22;
	}
}
</style>

 <style lang="scss">
.inspiration-types-container {
	.slider-container {
		height: auto;
		.slider-arrow {
			top: 60%;
		}
		.header {
			margin-bottom: 0.5rem;
			.see-all {
				white-space: nowrap;
				// align-self: flex-start;
			}
		}
		.slider-content {
			height: 15.2rem;
		}
	}
}
</style>
