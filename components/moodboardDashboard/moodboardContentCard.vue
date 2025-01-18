<template>
    <div class="card-container" :class="cardStyle">
        <div class="card-thumbnail"
        :class="cardStyle">
			<div class="hover-overlay">
				<div class="overlayt-content" @click="$emit('onOverlayBtnCLick',cardDetails,onHoverText)">
					<div class="overlay-icon">
						<svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 9 9" fill="none">
							<path d="M6.68067 2.76916L0.942667 8.50716L0 7.5645L5.73733 1.8265H0.680667V0.493164H8.014V7.8265H6.68067V2.76916Z" fill="#141B35"/>
						</svg>
					</div>
					<div class="overlay-text">
						{{ onHoverText }}
					</div>
				</div>
			</div>
			<div class="thumbnail-wrapper">
				<img v-if="thumbnailUrl" :src="thumbnailUrl" alt="">  
			</div>
		</div>
        <div class="card-info" :class="cardStyle">
            <div class="bottom-left-content">
                <slot name="bottomLeftContent">
					 {{ cardDetails && cardDetails[leftTextKey] ?  cardDetails[leftTextKey] :  ""}}
				</slot>
            </div>
            <div class="bottom-right-content">
                <slot name="bottomRightContent">
					{{ cardDetails && cardDetails[rightTextKey] ?  `${cardDetails[rightTextKey]} items` :  ""}}
				</slot>
            </div>
        </div>
    </div>
</template>
<script>
export default {
	props: {
		thumbnailUrl: {
			type: String,
			required: true,
		},
		cardStyle: {
			// plain or outlined
			type: String,
			required: false,
			default: "plain",
			// default: "outlined",
		},
		onHoverText: {
			type: String,
			required: false,
			default: "open moodboard",
		},
		cardDetails: {
			type: Object,
			required: false,
		},
		leftTextKey: {
			type: String,
			required: false,
			default: "name",
		},
		rightTextKey: {
			type: String,
			required: false,
			default: "",
		},
	},
};
</script>
<style lang="scss" scoped>
.card-container {
	height: 100%;
	width: 100%;
	background: $color-white;
	&.outlined {
		border: 1px solid #dddddd;
		border-radius: 10px;
		&:hover {
			box-shadow: 0rem 0.3125rem 0.625rem rgba(0, 0, 0, 0.15);
		}
	}
}
.card-thumbnail {
	height: 80%;
	position: relative;
	&.plain {
		border: 1px solid #e8e8e8;
		border-radius: 10px;
		overflow: hidden;
	}
	&.outlined {
		.thumbnail-wrapper {
			overflow: hidden;
			border-radius: 9px 9px 0 0;
		}
	}
	.thumbnail-wrapper {
		height: 100%;
		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
}
.hover-overlay {
	position: absolute;
	opacity: 0;
	height: 100%;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	background: rgba(#212021, 0.5);
	border-radius: 9px 9px 0 0;
	&:hover {
		opacity: 1;
	}
	.overlayt-content {
		cursor: pointer;
		display: flex;
		align-items: center;
		padding: 10px;
		background: $color-white;
		border: 1px solid rgba(233, 190, 179, 0.5);
		border-radius: 164px;
		text-align: center;
		text-transform: capitalize;
		.overlay-icon {
			display: flex;
			margin-right: 0.3125rem;
		}
		.overlay-text {
			font-weight: 500;
			font-size: 0.5625rem * 1.22;
			color: #141b35;
		}
	}
}
.card-info {
	display: flex;
	width: 100%;
	height: 20%;
	align-items: center;
	justify-content: space-between;
	color: #0e0e0e;
	&.outlined {
		padding: 0 0.9375rem;
	}
	.bottom-left-content {
		text-transform: capitalize;
		font-weight: 700;
		font-size: 0.75rem * 1.22;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		max-width: 13rem;
	}
	.bottom-right-content {
		font-weight: 400;
		font-size: 0.75rem * 1.22;
	}
}
</style>
