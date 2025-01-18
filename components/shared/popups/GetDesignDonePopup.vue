<template>
	<div class="get-design-done-popup-wrapper">
		<div class="popup-content-wrapper">
			<svg
				@click="setIsDFUPopupVisible(false)"
				class="close-popup"
				xmlns="http://www.w3.org/2000/svg"
				width="55"
				height="55"
				viewBox="0 0 55 55"
				fill="none"
			>
				<circle cx="27.5" cy="27.5" r="27.5" fill="#292929" />
				<path
					d="M18.2314 17.6452C17.4935 18.3832 17.4935 19.5795 18.2314 20.3175L25.0057 27.0918L18.2314 33.8662C17.4935 34.6041 17.4935 35.8005 18.2314 36.5384C18.9693 37.2763 20.1657 37.2763 20.9036 36.5384L27.6779 29.764L34.4524 36.5384C35.1902 37.2763 36.3867 37.2763 37.1246 36.5384C37.8624 35.8005 37.8624 34.6041 37.1246 33.8662L30.3501 27.0918L37.1246 20.3175C37.8624 19.5796 37.8624 18.3832 37.1246 17.6453C36.3865 16.9073 35.1902 16.9073 34.4524 17.6453L27.6779 24.4195L20.9036 17.6452C20.1657 16.9073 18.9693 16.9073 18.2314 17.6452Z"
					fill="white"
				/>
			</svg>
			<div class="image-wrapper">
				<img
					src="~assets/images/get-design-done-popup-hero-section.png"
					alt=""
				/>
			</div>
			<div class="header">
				<span>
					{{ $t("getDesignDonePopup.header[0]") }}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="182"
						height="6"
						viewBox="0 0 182 6"
						fill="none"
					>
						<path
							d="M1 4.9996C76.5048 -0.211348 116.175 -0.469121 181 4.9996"
							stroke="#CC4040"
							stroke-width="2"
							stroke-linecap="round"
						/>
					</svg> </span
				>{{ $t("getDesignDonePopup.header[1]") }}
			</div>
			<div class="subHeader">
				{{ $t("getDesignDonePopup.subHeader") }}
			</div>
			<div class="process-wrapper">
				<div class="process">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="14"
						height="14"
						viewBox="0 0 14 14"
						fill="none"
					>
						<circle cx="7" cy="7" r="7" fill="#3A393A" />
					</svg>
					{{ $t("getDesignDonePopup.process[0]") }}
				</div>
				<div class="process">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="14"
						height="14"
						viewBox="0 0 14 14"
						fill="none"
					>
						<circle cx="7" cy="7" r="7" fill="#3A393A" />
					</svg>
					{{ $t("getDesignDonePopup.process[1]") }}
				</div>
				<div class="process">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="14"
						height="14"
						viewBox="0 0 14 14"
						fill="none"
					>
						<circle cx="7" cy="7" r="7" fill="#3A393A" />
					</svg>
					{{ $t("getDesignDonePopup.process[2]") }}
				</div>
			</div>
			<div class="request-now-button" @click="handleButtonClick">
				{{ $t("getDesignDonePopup.requestNow") }}
			</div>
		</div>
	</div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
	props: {},
	data() {
		return {};
	},
	computed: {
		...mapGetters("Projects",["DFUTypeFormLink"])
	},
	methods: {
		...mapMutations("Projects", ["setIsDFUPopupVisible"]),
		handleButtonClick() {
			if (window.analytics) {
				window.analytics.track(
					"Click Request on DB",
					{
						title: "Click Request on DB",
					},
					{
						integrations: {
							Amplitude: { session_id: new Date().getTime() },
						},
					},
					{ timestamp: new Date().getTime() }
				);
			}
			window.open(this.DFUTypeFormLink, '_blank')
			this.setIsDFUPopupVisible(false);
		},
	},
};
</script>

<style lang="scss" scoped>
.get-design-done-popup-wrapper {
	height: 100%;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	background: rgba(46, 45, 46, 0.2);
	position: fixed;
	top: 0;
	left: 0;

	.popup-content-wrapper {
		width: 31.25rem * 1.22;
		background-color: $background-white;
		border-radius: 25px;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;

		.close-popup {
			cursor: pointer;
			position: absolute;
			right: 0;
			top: 0;
			width: 2rem * 1.22;
			height: 2rem * 1.22;
			flex-shrink: 0;
			transform: translate(50%, -50%);
		}

		.image-wrapper {
			width: 100%;
			margin-bottom: .8125rem * 1.22;
			border-radius: 25px 0 0 0;

			img {
				width: 100%;
				height: auto;
				display: block;
			}
		}

		.header {
			color: $color-black-1;
			font-size: 1rem * 1.22;
			font-style: normal;
			font-weight: 700;
			line-height: normal;
			margin-bottom: 2rem * 1.22;

			span {
				position: relative;
				font-size: inherit;
				color: $color-second-2;

				svg {
					position: absolute;
					bottom: 0;
					left: 0;
					width: 100%;
					transform: translateY(calc(100% + 0.5rem));
				}
			}
		}

		.subHeader {
			max-width: 36rem * 1.22;
			color: $color-second-3;
			text-align: center;
			font-size: .875rem * 1.22;
			font-style: normal;
			font-weight: 500;
			line-height: 137.82%;
			margin-bottom: .8125rem * 1.22;
		}

		.process-wrapper {
			margin-bottom: 1.625rem * 1.22;
			.process {
				display: grid;
				grid-template-columns: max-content 1fr;
				gap: 0 0.5625rem * 1.22;
				align-items: center;
				color: $color-second-3;
				font-size: .75rem * 1.22;
				font-style: normal;
				font-weight: 500;
				line-height: 137.82%;
				margin-bottom: .875rem * 1.22;

				svg {
					width: .375rem * 1.22;
					height: .375rem * 1.22;
				}
			}
		}

		.request-now-button {
			cursor: pointer;
			margin-bottom: 1.8125rem * 1.22;
			border-radius: 5px;
			background: linear-gradient(90deg, #f08e58 0%, #ef5d68 100%);
			color: $color-white;
			font-size: .75rem * 1.22;
			font-style: normal;
			font-weight: 600;
			line-height: normal;
			padding: 0.6875rem * 1.22 2.125rem * 1.22;
		}
	}
}
</style>
