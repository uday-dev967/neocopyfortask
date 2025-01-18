<template>
	<div class="foyr-services-popup-wrapper">
		<div class="popup-content-wrapper">
			<svg
				@click="onCloseButtonClick"
				class="close-popup"
				width="32"
				height="32"
				viewBox="0 0 32 32"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<circle cx="16" cy="16" r="16" fill="#232121" />
				<path
					d="M21.5 11L10 21.4645"
					stroke="#E8E8E8"
					stroke-width="1.2"
					stroke-miterlimit="10"
					stroke-linecap="round"
				/>
				<path
					d="M21.5992 21.6478L10.1992 11.0916"
					stroke="#E8E8E8"
					stroke-width="1.2"
					stroke-miterlimit="10"
					stroke-linecap="round"
				/>
			</svg>
			<div class="header">
				<div class="title">{{ $t("foyrServicesPopup.title") }}</div>
				<div class="sub-title">
          {{ $t("foyrServicesPopup.subTitle") }}
				</div>
			</div>
			<div class="foyr-services-options-wrapper">
				<div
					v-for="option in options"
					:key="option.id"
					class="option-wrapper"
					@click="onSelectOption(option.id)"
				>
					<div class="left-container">
						<div class="icon-wrapper">
							<!-- v-if="selectedOptionId === option.id" -->
							<svg
								class="selected"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<circle
									cx="11.9996"
									cy="12.0001"
									r="9.1"
									stroke="#E9BEB3"
								/>
								<circle cx="12" cy="12" r="6" fill="#E9BEB3" />
							</svg>
							<svg
								class="not-selected"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<circle
									cx="11.9996"
									cy="12.0001"
									r="9.1"
									stroke="#A6A5A6"
								/>
							</svg>
						</div>
						<div class="option-text-content-wrapper">
							<div class="option">{{ $t(option.option) }}</div>
							<div class="option-tag">{{ $t(option.optionTag) }}</div>
						</div>
					</div>
					<div class="option-icon image-wrapper iwfp">
						<img :src="option.icon" :alt="option.id" />
					</div>
				</div>
			</div>
			<!-- <div class="continue-button" @click="handleButtonClick">
				{{ $t("buttonText.continue") }}
			</div> -->
      <div class="popup-bg-svg iwfp">
        <img src="~/assets/images/foyrServices/foyrServicesBackgroundlines.png" alt="" />
      </div>
		</div>
	</div>
</template>

<script>
import { mapMutations, mapGetters, mapActions, mapState } from "vuex";
export default {
	props: {},
	data() {
		return {
			options: [
				{
					id: "createDesignsForMe",
					option: "foyrServicesPopup.createDesignsForMe",
					optionTag:
						"foyrServicesPopup.createDesignsForMeTag",
					icon: require("~/assets/images/foyrServices/createDesignsForMe.png"),
				},
				{
					id: "createAFloorplanOnNeo",
					option: "foyrServicesPopup.createAFloorplanOnNeo",
					optionTag:
						"foyrServicesPopup.createAFloorplanOnNeoTag",
					icon: require("~/assets/images/foyrServices/createAFloorplanOnNeo.png"),
				},
				/*{
					id: "requestACustomModel",
					option: "foyrServicesPopup.requestACustomModel",
					optionTag:
						"foyrServicesPopup.requestACustomModelTag",
					icon: require("~/assets/images/foyrServices/requestACustomModel.png"),
				},*/
			],
			selectedOptionId: "",
		};
	},
	computed: {
		...mapState("Billing", ["isTrial"])
	},
	methods: {
		...mapActions("typeformPopup", ["openEmbededTypeform"]),
    ...mapActions("neoformPopup", ["openNeoformPopup"]),
		...mapMutations("Projects", ["setShowFoyrServicesPopup"]),
		onSelectOption(id) {
			this.selectedOptionId = id;
			if(id == 'createDesignsForMe') {
				this.openEmbededTypeform({
            formId: 'dC7q0Gex',
            hidden: {
              utm_source: "product",
              utm_medium: "dashboard",
              utm_campaign: "sidepanel",
            },
          })
			} else if ( id == 'createAFloorplanOnNeo' ) {
				if(this.isTrial) {
					this.openEmbededTypeform({
            formId: 'yxklKRmg',
            hidden: {
              utm_source: "neo",
              utm_medium: "dashboard",
              utm_campaign: "sidepanel",
            },
          })
				} else {
          this.openNeoformPopup({
						// neoFormUrl: 'https://neostaging.foyr.com/forms#/'
            neoFormUrl: `${window.location.origin}/forms#/?source=Dashboard+Sidepanel`,
					});
				}
			} else if ( id == 'requestACustomModel' ) {
					this.openEmbededTypeform({
            formId: 't0gioI5f',
            // hidden: {},
          })
			}
			this.handleButtonClick()
		},
		handleButtonClick() {
			this.selectedOptionId = "";
			this.setShowFoyrServicesPopup(false);
		},
    onCloseButtonClick() {
      this.selectedOptionId = ""
      this.setShowFoyrServicesPopup(false)
    }
	},
};
</script>

<style lang="scss" scoped>
.foyr-services-popup-wrapper {
	height: 100%;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
  background: rgba(58, 57, 58, 0.75);
	position: fixed;
	top: 0;
	left: 0;

	.popup-content-wrapper {
		width: 26.5rem * 1.22;
		padding: 2rem * 1.22;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		gap: 1.5rem * 1.22;
		background: $background-white-9;
    .popup-bg-svg {
      position: absolute;
      bottom: 0;
      right: 0;
      z-index: 0;
    }

		.close-popup {
			cursor: pointer;
			position: absolute;
			right: -0.5rem * 1.22;
			top: 0;
			width: 2rem * 1.22;
			height: 2rem * 1.22;
			flex-shrink: 0;
			transform: translate(100%, 0%);
		}

		.header {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			gap: .5rem * 1.22;
			align-self: stretch;
      position: relative;
      z-index: 1;
			.title {
				color: $color-dark-gray-2;
				text-align: center;
				font-size: 1.5rem * 1.22;
				font-weight: 600;
			}
			.sub-title {
				color: $color-light-gray-2;
				text-align: center;
				font-size: .875rem * 1.22;
				font-weight: 400;
			}
		}

		.foyr-services-options-wrapper {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			gap: 1rem * 1.22;
      position: relative;
      z-index: 1;
			.option-wrapper {
				display: flex;
				padding: 1rem * 1.22;
				width: 100%;
				justify-content: center;
				align-items: center;
				gap: .5rem * 1.22;
				border: 1px solid $border-1;
				background: $background-white-9;
				box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.06);
				cursor: pointer;
				.left-container {
					display: flex;
					align-items: center;
					gap: 1rem * 1.22;
					flex: 1 0 0;
					.icon-wrapper {
					}
					.option-text-content-wrapper {
						display: flex;
						flex-direction: column;
						align-items: flex-start;
						gap: .25rem * 1.22;
						flex: 1 0 0;
						.option {
							color: $color-dark-gray-2;
							font-size: 1rem * 1.22;
							font-style: normal;
							font-weight: 500;
						}
						.option-tag {
							color: $color-light-gray-2;
							font-size: .75rem * 1.22;
							font-style: normal;
							font-weight: 400;
						}
					}
				}
				.option-icon {
					display: flex;
					width: 4rem * 1.22;
					height: 4rem * 1.22;
					// padding: .6875rem * 1.22;
					justify-content: center;
					align-items: center;
					flex-shrink: 0;
				}
				.selected {
						display: none;
					}
					.not-selected {
						display: flex;
					}
				&:hover {
					.selected {
						display: flex;
					}
					.not-selected {
						display: none;
					}
				}
			}
		}
		.continue-button {
			display: flex;
			padding: .75rem * 1.22 1.25rem * 1.22;
			justify-content: center;
			align-items: center;
			gap: .625rem * 1.22;
			color: $color-dark-gray;
			text-align: center;
			font-size: .875rem * 1.22;
			font-style: normal;
			font-weight: 500;
			border: 1px solid $border-1;
			background: $background-10;
			cursor: pointer;
      text-transform: capitalize;
      position: relative;
      z-index: 1;
		}
	}
}
</style>
