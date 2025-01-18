<template>
	<div ref="slider" class="slider-container">
		<div class="header">
			<div class="slider-header-text">
			<slot name="sliderHeaderx">
				{{ sliderHeaderText }}
			</slot>
			<!-- {{ showSliderArrow }} -->
			</div>
			<div v-if="showSeeAll" class="see-all" @click="$emit('onSeeAllCLick',pathDataForSeeAll)">
				See all
			</div>
		</div>
		<slot name="belowHeadingSection"></slot>
			<div v-if="!hideRightArrow && showSliderArrow" class="slider-arrow slider-right-arrow"  @click="onSliderRightArrowClick">
				<svg xmlns="http://www.w3.org/2000/svg" width="5" height="9" viewBox="0 0 5 9" fill="none">
					<path d="M4.68268 3.88518L1.02019 0.232965C0.787216 0.000519753 0.409481 0.000519753 0.176616 0.232965C-0.0562679 0.465203 -0.0562679 0.841872 0.176616 1.07409L3.41735 4.30574L0.17671 7.53728C-0.0561736 7.76962 -0.0561736 8.14625 0.17671 8.37849C0.409594 8.61082 0.78731 8.61082 1.02029 8.37849L4.68277 4.72621C4.79922 4.61004 4.85737 4.45794 4.85737 4.30576C4.85737 4.15351 4.7991 4.0013 4.68268 3.88518Z" fill="#232121"/>
				</svg>
			</div>
			<div v-if="!hideLeftArrow && showSliderArrow" class="slider-arrow slider-left-arrow"  @click="onSliderLeftArrowClick">
				<svg xmlns="http://www.w3.org/2000/svg" width="5" height="9" viewBox="0 0 5 9" fill="none">
					<path d="M4.68268 3.88518L1.02019 0.232965C0.787216 0.000519753 0.409481 0.000519753 0.176616 0.232965C-0.0562679 0.465203 -0.0562679 0.841872 0.176616 1.07409L3.41735 4.30574L0.17671 7.53728C-0.0561736 7.76962 -0.0561736 8.14625 0.17671 8.37849C0.409594 8.61082 0.78731 8.61082 1.02029 8.37849L4.68277 4.72621C4.79922 4.61004 4.85737 4.45794 4.85737 4.30576C4.85737 4.15351 4.7991 4.0013 4.68268 3.88518Z" fill="#232121"/>
				</svg>
			</div>
		<div ref="sliderTrack" class="slider-content">
			<div v-if="showInitialSlide" class="slider-slide" :style="{ width : slideWidth + 'px' }" >
				<slot name="initialSlide">
				</slot>
			</div>
			<div v-for="slide in slidesDataForSlider" :key="slide._id" class="slider-slide" :style="{ width : slideWidth + 'px' }">
				<moodboard-content-card
				v-if="cardTypeForslides === 'contentCard'"
				:thumbnailUrl="getImageUrlFromKey(slide,thumbnailKey) ||''"
				:onHoverText="onCardHoverText"
				:cardDetails="slide"
				:leftTextKey="leftTextKey"
				:rightTextKey="rightTextKey"
				@onOverlayBtnCLick="emitOnOverlayCLick"
				>
				</moodboard-content-card>
				<moodboard-project-card
				v-else-if="cardTypeForslides === 'ProjectCard'"
				:onCardHoverText="onCardHoverText"
				:cardDetails="slide"
				:optionsList="['delete','clone','rename']"
				@onProjectOverlayBtnCLick="onProjectOverlayBtnCLick"
				></moodboard-project-card>
			</div>

		</div>
	</div>
</template>

<script>
import moodboardContentCard from "@/components/moodboardDashboard/moodboardContentCard.vue";
import moodboardProjectCard from "@/components/moodboardDashboard/moodboardProjectCard.vue";
import MoodboardDashboardMixin from "@/mixins/moodboardDashboardMixin";
export default {
	props: {
		sliderHeaderText: {
			type: String,
			required: false,
			default: "",
		},
		slidesDataForSlider: {
			type: Array,
			required: true,
		},
		noOfSlidesInView: {
			type: Number,
			default: 5,
		},
		slidesToMovesOnArrowCLick: {
			type: Number,
			default: 1,
		},
		onCardHoverText: {
			type: String,
			required: false,
			default: "open moodboard",
		},
		thumbnailKey: {
			type: String,
			required: false,
			default: "",
		},
		leftTextKey: {
			type: String,
			required: false,
			default: "",
		},
		rightTextKey: {
			type: String,
			required: false,
			default: "",
		},
		cardTypeForslides: {
			type: String,
			required: false,
			default: "contentCard",
		},
		showSeeAll: {
			type: Boolean,
			required: false,
			default: false,
		},
		showSliderArrow: {
			type: Boolean,
			required: false,
			default: false,
		},
		pathDataForSeeAll: {
			type: String,
			required: false,
			default: "",
		},
		showInitialSlide: {
			type: Boolean,
			required: false,
			default: false,
		},
	},
	mixins:[MoodboardDashboardMixin],
	data() {
		return {
			slideWidth: 0,
			sliderTrack: null,
			hideRightArrow: false,
			hideLeftArrow: false,
		};
	},
	components: {
		moodboardContentCard,
		moodboardProjectCard,
	},
	mounted() {
		this.sliderTrack = this.$refs.sliderTrack;
		const sliderWidth = Math.round(
			this.$refs.slider.getBoundingClientRect().width
		);
		this.slideWidth = sliderWidth / this.noOfSlidesInView;
		// numebr of slides that are not in view
		this.noOfSlidesThatAreNotInView =
			this.slidesDataForSlider.length - this.noOfSlidesInView;
		// number clicks require dto reach last Slide
		this.noOfClicksRequiredToReachLastSlide = Math.ceil(
			this.noOfSlidesThatAreNotInView,
			this.slidesToMovesOnArrowCLick
		);
		this.hideLeftArrow = true;
		this.sliderTrack.addEventListener("scroll", e => {
			const maxScrollLeft =
				this.sliderTrack.scrollWidth - this.sliderTrack.clientWidth - 1;
			if (this.sliderTrack.scrollLeft === 0) {
				this.hideLeftArrow = true;
				this.hideRightArrow = false;
			} else if (this.sliderTrack.scrollLeft >= maxScrollLeft) {
				this.hideRightArrow = true;
				this.hideLeftArrow = false;
			} else {
				this.hideRightArrow = false;
				this.hideLeftArrow = false;
			}
		});
	},
	computed: {
		// hideRightArrow() {
		// 	if (
		// 		this.noOfCLickOnRightArrow ===
		// 		this.noOfClicksRequiredToReachLastSlide
		// 	) {
		// 		return true;
		// 	} else false;
		// },
		// hideLeftArrow() {
		// 	if (this.noOfCLickOnRightArrow === 0) {
		// 		return true;
		// 	} else false;
		// },
	},
	methods: {
		// },
		onSliderRightArrowClick() {
			const distanceByWhichsliderSlides =
				this.slideWidth * this.slidesToMovesOnArrowCLick;
			this.sliderTrack.scrollLeft += distanceByWhichsliderSlides;
			this.noOfCLickOnRightArrow += 1;
			// this.hideSliderArrows();
		},
		getImageUrlFromKey(obj, key) {
			if (key.includes(".")) {
				const keys = key.split(".");
				let value = obj;
				for (const k of keys) {
					value = value[k];
				}
				return value;
			} else {
				return obj[key];
			}
		},
		onSliderLeftArrowClick() {
			const distanceByWhichsliderSlides =
				this.slideWidth * this.slidesToMovesOnArrowCLick;
			this.sliderTrack.scrollLeft -= distanceByWhichsliderSlides;

			// this.hideSliderArrows();
		},
		emitOnOverlayCLick(cardInfo, onHoverText) {
			this.$emit("onOverlayBtnCLick", cardInfo, onHoverText);
		},
		onProjectOverlayBtnCLick(cardDetails){
			this.openProject(cardDetails._id);
			// console.log(cardDetails)
			// window.open(
			// 	// window.location.origin + `/moodboard?project=${res.id}`
			// 	`https://neostaging.foyr.com/moodboard/?project=${cardDetails._id}`
			// );
		}
		// hideSliderArrows() {
		// 	this.maxScrollLeft =
		// 		this.sliderTrack.scrollWidth - this.sliderTrack.clientWidth - 1;
		// 	if (this.sliderTrack.scrollLeft === 0) {
		// 		this.hideLeftArrow = true;
		// 		this.hideRightArrow = false;
		// 	} else if (this.sliderTrack.scrollLeft >= maxScrollLeft) {
		// 		this.hideRightArrow = true;
		// 		this.hideLeftArrow = false;
		// 	} else {
		// 		this.hideRightArrow = false;
		// 		this.hideLeftArrow = false;
		// 	}
		// },
		// hideArrowForSLider() {
		// 	console.log(
		// 		noOfClicksRequiredToReachLastSlide,
		// 		this.noOfSlidesThatAreNotInView,
		// 		this.noOfCLickOnRightArrow
		// 	);
		// 	if (this.noOfCLickOnRightArrow === 0) {
		// 		this.hideLeftArrow = true;
		// 	} else if (
		// 		this.noOfCLickOnRightArrow ===
		// 		noOfClicksRequiredToReachLastSlide
		// 	) {
		// 		this.hideRightArrow = true;
		// 	}
		// 	console.log(this.hideRightArrow);
		// },
	},
};
</script>

<style lang="scss" scoped>
.slider-container {
	position: relative;
	margin: 1rem 0;
	height: 12.5rem * 1.22;
	// max-width: 93vw;
	// padding: 0 1.5rem;
	// overflow: hidden;
}
.header {
	display: flex;
	width: 100%;
	justify-content: space-between;
	align-items: center;
	padding: 0 0.5rem * 1.22;
	.slider-header-text {
		font-weight: 700;
		font-size: 0.9375rem * 1.22;
		color: #0e0e0e;
	}
	.see-all {
		font-weight: 700;
		cursor: pointer;
		font-size: 0.75rem * 1.22;
		color: #222021;
	}
}
.slider-arrow {
	position: absolute;
	height: 1.5625rem;
	width: 1.5625rem;
	z-index: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: $color-white;
	box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.14);
	transform: matrix(-1, 0, 0, 1, 0, 0);
	border-radius: 50%;
	top: 50%;
	transform: translateY(-50%);
	cursor: pointer;
	&.slider-right-arrow {
		right: -0.8%;
	}
	&.slider-left-arrow {
		transform: translateY(-80%) rotate(180deg);
		left: -0.8%;
	}
}
.slider-content {
	// position: absolute;
	// left: 0;
	padding: 1rem 0;
	overflow-x: scroll;
	overflow-y: hidden;
	scroll-behavior: smooth;
	max-width: 100%;
	justify-content: start;
	display: grid;
	grid-auto-flow: column;
	justify-content: start;
	grid-template-rows: 100%;
}
.slider-slide {
	padding-left: 0.5rem * 1.22;
	padding-right: 0.5rem * 1.22;
	// &:not(:last-child) {
	// 	padding-right: 1rem;
	// }
}
.slider-content {
	height: 100%;
	img {
		padding-right: 1rem * 1.22;
		width: 100%;
		height: auto;
		display: block;
		// object-fit: cover;
	}
}
</style>
