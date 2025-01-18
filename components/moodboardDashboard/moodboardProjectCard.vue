<template>
		<moodboard-content-card
		:thumbnailUrl="cardDetails.properties.thumbnail"
		:onHoverText="onCardHoverText"
		:cardStyle="'outlined'"
		:cardDetails="cardDetails"
		:leftTextKey="'name'"
		@onOverlayBtnCLick="onProjectOverlayBtnCLick"
		>
			<template slot='bottomRightContent'>
				<div class="project-card-options-container" @mouseenter="onProjectCardOptions" @mouseleave="onProjectCardOptionsMouseLeave">
					<div class="project-card-options-icon">
						<svg xmlns="http://www.w3.org/2000/svg" width="4" height="13" viewBox="0 0 4 13" fill="none">
							<circle cx="1.87872" cy="1.43536" r="1.43536" fill="#222021"/>
							<circle cx="1.87872" cy="6.22003" r="1.43536" fill="#222021"/>
							<circle cx="1.87872" cy="11.0042" r="1.43536" fill="#222021"/>
						</svg>
					</div>
					<div class="options-list-wrapper">
						<div v-for="option in optionsList" class="list-option" @click="onOptionsCLick(option)">
							{{ option }}
						</div>
					</div>
				</div>
			</template>
		</moodboard-content-card>
</template>

<script>
import { mapMutations } from "vuex";
import moodboardContentCard from "@/components/moodboardDashboard/moodboardContentCard.vue";
export default {
	data() {
		return {
			slideWidth: 0,
			sliderTrack: null,
			optionsList: ["delete", "clone", "rename"],
		};
	},
	components: {
		moodboardContentCard,
	},
	mounted() {},
	methods: {
		...mapMutations("moodboardDashboard", [
			"setshowDeleteConfirmation",
			"setselectedProjectForActions",
			"setcloneProject",
			"setshowRename",
		]),
		onOptionsCLick(option) {
			this.setselectedProjectForActions(this.cardDetails);
			switch (option) {
				case "delete":
					this.setshowDeleteConfirmation(true);
					break;
				case "clone":
					this.setcloneProject(true);
					break;
				case "rename":
					this.setshowRename(true);
					break;
			}
		},
		onProjectCardOptions(e){
			const optionsList = e.target.querySelector('.options-list-wrapper')
			// const optionIcon = document.querySelector('.project-card-options-container')
			const boundingClientOfOptionsListWrapper = e.target.getBoundingClientRect()
			// console.log(boundingClientOfOptionsListWrapper)
			optionsList.style.top = `${boundingClientOfOptionsListWrapper.top + boundingClientOfOptionsListWrapper.height}px`
			optionsList.style.left = `${boundingClientOfOptionsListWrapper.left + boundingClientOfOptionsListWrapper.width}px`
		},
		onProjectCardOptionsMouseLeave(e){
			// console.log(e)
			const optionsList = e.target.querySelector('.options-list-wrapper')
			optionsList.style.top = `-999999999px`
			optionsList.style.left = `-999999999px`
		},
		onProjectOverlayBtnCLick(cardDetail){
			this.$emit('onProjectOverlayBtnCLick', cardDetail)
		}
	},
	props: {
		cardDetails: {
			type: Object,
			required: true,
		},
		onCardHoverText: {
			type: String,
			required: false,
			default: "open moodboard",
		},
	},
};
</script>

<style lang="scss" scoped>
.project-card-options-container {
	height: 100%;
	width: 1.5rem;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
}
.options-list-wrapper {
	z-index: 1;
	position: fixed;
	top: 999999999px;
	left: 9999999999px;
	width: 6.25rem;
	border: 1px solid #d8e1f3;
	background: $color-white;
	box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.05);
	border-radius: 0.3125rem;
	transform: translateX(-90%);
	.list-option {
		padding: 0.625rem 1.25rem;
		border-bottom: 1px solid #d8e1f3;
		text-transform: capitalize;
		&:hover {
			background: rgba(216, 225, 243, 0.5);
		}
		&:last-child {
			border: none;
		}
	}
}
</style>
