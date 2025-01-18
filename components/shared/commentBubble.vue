<template>
	<div :ref="'commentBubble' + _uid" class="bubbles-item-wrapper" :class="{
		'show-comment': selectedBubbleId && selectedBubbleId === bubbleId
	}" :style="{
		top: `calc(${topInPixels}px - 1.25rem * 1.22)`,
		left: `calc(${leftInPixels}px - 1.25rem * 1.22)`,
	}" @click.stop="onBubbleClick">
		<div v-if="commentsInfo.newClientComment" class="new-comment-highlight"></div>
		<div :ref="'commentBubbleComment' + _uid" class="comment-wrapper" :style="{
		width: `${width}rem`,
		maxHeight: `${height}rem`,
		...(placeLeft && {
			left: `calc(-${width}rem - 0.5rem)`
		}),
		...(placeTop && {
			transform: `translateY(calc(-100% + (2.5rem * 1.22)))`
		})
	}">
			<div class="comment-heading-section">
				<div class="comments-user-info-container">
					{{
		commentsInfo.isDesigner
			? 'Designer'
			: `${commentsInfo.leadName}`
	}}
				</div>
				<svg @click="onExpandCommentClick" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
					viewBox="0 0 24 24" fill="none">
					<path
						d="M14.5 15.576H9.5C8.8125 15.576 8.25 15.0222 8.25 14.3453V9.42218C8.25 8.74525 8.8125 8.19141 9.5 8.19141H10.5C10.6875 8.19141 10.8125 8.31448 10.8125 8.4991C10.8125 8.68371 10.6875 8.80679 10.5 8.80679H9.5C9.15625 8.80679 8.875 9.08371 8.875 9.42218V14.3453C8.875 14.6837 9.15625 14.9606 9.5 14.9606H14.5C14.8438 14.9606 15.125 14.6837 15.125 14.3453V13.3606C15.125 13.176 15.25 13.0529 15.4375 13.0529C15.625 13.0529 15.75 13.176 15.75 13.3606V14.3453C15.75 15.0222 15.1875 15.576 14.5 15.576Z"
						fill="#9DA1B0" stroke="#9DA1B0" stroke-width="0.4" />
					<path
						d="M15.4375 8.19141H12.9375C12.75 8.19141 12.625 8.31448 12.625 8.4991C12.625 8.68371 12.75 8.80679 12.9375 8.80679H14.6875L11.7812 11.6683C11.6562 11.7914 11.6562 11.976 11.7812 12.0991C11.9062 12.2222 12.0937 12.2222 12.2187 12.0991L15.125 9.23756V10.9606C15.125 11.1453 15.25 11.2683 15.4375 11.2683C15.625 11.2683 15.75 11.1453 15.75 10.9606V8.4991C15.75 8.31448 15.625 8.19141 15.4375 8.19141Z"
						fill="#9DA1B0" stroke="#9DA1B0" stroke-width="0.4" />
				</svg>
			</div>
			<div class="comment-content-section">
				{{ commentsInfo.comment }}
			</div>
			<div class="time-elapse-container">
				<!-- {{ getAgoInfoFromISODate(commentsInfo.createdAt) }} -->
			</div>
		</div>
	</div>
</template>

<script>
// import { mapState } from "vuex";
import CommonUtilities from "@/mixins/commonUtilitiesMixin";

export default {
	mixins: [CommonUtilities],
	created() { },
	mounted() {
		let boundingElement = document.querySelector(
			this.boundingElementSelector
		);
		if (!boundingElement) {
			boundingElement = document.querySelector("body");
		}
		let boundingAreaInfo = boundingElement.getBoundingClientRect();

		let commentBubbleElement = this.$refs["commentBubble" + this._uid];
		let commentBubbleInfo = commentBubbleElement.getBoundingClientRect();

		let remIndicatorBoundingInfo = document
			.getElementById("remIndicator")
			.getBoundingClientRect();

		let completeElementWidthCalc =
			commentBubbleInfo.x + // Comment bubbles left value
			commentBubbleInfo.width + // Comment bubbles width value
			0.25 * remIndicatorBoundingInfo.width + // space between Comment bubbles and comment container width value
			this.width * remIndicatorBoundingInfo.width; // Comment container width value

		let completeElementHeightCalc =
			commentBubbleInfo.y + // Comment bubbles top value
			this.height * remIndicatorBoundingInfo.height; // Comment container height value
		if (
			completeElementWidthCalc >=
			boundingAreaInfo.left + boundingAreaInfo.width
		) {
			this.placeLeft = true;
		}
		if (
			completeElementHeightCalc >=
			boundingAreaInfo.top + boundingAreaInfo.height
		) {
			this.placeTop = true;
		}
	},
	destroyed() { },
	components: {},
	data() {
		return {
			width: 14.75,
			height: 11.75,
			placeLeft: false,
			placeTop: false,
		};
	},
	props: {
		boundingElementSelector: {
			type: String,
			default: "body",
			required: false,
		},
		customerInfo: {
			type: Object,
			default: () => { },
			required: false,
		},
		commentsInfo: {
			type: Object,
			default: () => { },
			required: false,
		},
		topInPercent: {
			type: Number,
			default: -1,
			required: false,
		},
		leftInPercent: {
			type: Number,
			default: -1,
			required: false,
		},
		topInPixels: {
			type: Number,
			default: -1,
			required: false,
		},
		leftInPixels: {
			type: Number,
			default: -1,
			required: false,
		},
		selectedBubbleId: {
			type: String,
			default: "body",
			required: false,
		},
		bubbleId: {
			type: String,
			default: "body",
			required: true,
		},
	},
	watch: {},
	computed: {},
	methods: {
		onBubbleClick() {
			this.$emit("onBubbleClick", this.bubbleId)
		},
		onExpandCommentClick() {
			this.$emit("onExpandCommentClick", this.bubbleId)
		}
	},
};
</script>

<style lang="scss" scoped>
.bubbles-item-wrapper {
	cursor: pointer;
	position: absolute;
	width: 2.5rem * 1.22;
	height: 2.5rem * 1.22;
	border-radius: 2.125rem * 1.22 2.125rem * 1.22 2.125rem * 1.22 0px;
	border: 2px solid $color-white;
	background: $background-10;

	&.show-comment {
		border: 2px solid $background-10;
		background: $background-white;

		.comment-wrapper {
			display: flex;
		}
	}

	.new-comment-highlight {
		position: absolute;
		right: 0;
		top: 0;

		width: .75rem * 1.22;
		height: .75rem * 1.22;
		flex-shrink: 0;

		border-radius: 30px;
		background: $background-18;
		transform: translate(.1875rem * 1.22, -0.1875rem * 1.22);
	}

	.comment-wrapper {
		display: none;
		z-index: 1;
		border-radius: 0.375rem;
		border: 1px solid #b0b0b0;
		background: #232121;
		padding: 1rem;
		position: absolute;
		left: calc(2.5rem * 1.22 + 0.25rem);
		flex-direction: column;

		.comment-heading-section {
			display: flex;
			justify-content: space-between;
			align-items: center;

			color: $color-second;
			font-size: 0.625rem *1.22;
			font-weight: 300;
			margin-bottom: 0.5rem;

			svg {
				display: block;
				height: 1.5rem;
				width: 1.5rem;
			}
		}

		.comment-content-section {
			color: $color-white;
			font-size: 0.875rem;
			overflow: auto;
			margin-bottom: 1.25rem;
		}

		.is-designer-flag {
			margin-top: .6875rem;
			color: color(secondary-light-grey-3);
			font-size: .625rem * 1.22;
			font-style: normal;
			font-weight: 500;
			line-height: normal;
		}

		.time-elapse-container {
			color: $color-head-1;
			font-size: 0.625rem * 1.22;
			font-weight: 500;
			line-height: 1;
		}
	}
}
</style>
