<template>
  <div class="default-mobile-view-popup-styles-v2"  @click.stop="closePopup">
    <div class="popup-body">
      <div class="close-button icon-wrapper" @click="closePopup">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 6L6 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M6 6L18 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

      </div>
      <div class="image-wrapper iwfp">
        <img v-if="basicMobilePopupConfig.image" :src="basicMobilePopupConfig.image" alt="Popup Image"  />
				<img v-else-if="basicMobilePopupConfig.loginViaDesktopPopup" src="~assets/images/mobile/mobileBasicUpgradePopupImage.png" />
      </div>
      <div class="text-content">
        <div class="heading">{{ getI18nString(basicMobilePopupConfig.title) }}</div>
        <div class="sub-heading">{{ getI18nString(basicMobilePopupConfig.message) }}</div>
      </div>
      <div v-if="basicMobilePopupConfig.subMessages && basicMobilePopupConfig.subMessages.length" class="popup-sub-messages-container">
        <div v-for="(message, index) in basicMobilePopupConfig.subMessages" :key="index" class="popup-sub-message-wrapper">
          <div v-if="message.icon" v-html="message.icon" class="icon-wrapper"></div>
          <div v-if="message.heading" class="message-heading">{{ getI18nString(message.heading) }}</div>
          <div v-if="message.description" class="message-description">{{ getI18nString(message.description) }}</div>
        </div>
      </div>
      <div class="popup-action" v-if="basicMobilePopupConfig.buttonConfig.length">
        <div 
					v-for="(button, index) in basicMobilePopupConfig.buttonConfig" 
					:key="index"
					class="action-button"
					:class="{'primary-button': (index == 0), 'secondary-button': (index > 0)}" 
					@click.stop="index == 0 ? onClickPrimaryButton(button) : button.buttonAction()"
				>
					{{ getI18nString(button.buttonText) }}
				</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  props: {},
  computed: {
    ...mapGetters("MobileBasicPopOver",['basicMobilePopupConfig']),
  },
  methods: {
    ...mapActions("MobileBasicPopOver",['resetBasicMobileConfig']),
		...mapActions({
      sendOffer: "Dash/sendOffer"
    }),
		...mapActions("MobileSystemNotifications", [
			"addNotification",
		]),
    closePopup() {
      this.resetBasicMobileConfig();
    },
		getI18nString(string) {
      if(this.basicMobilePopupConfig.isI18String) {
        return string
      } 
      return this.$t(string)
    },
    offerCode() {
			const projectId = this.basicMobilePopupConfig.projectId
			// console.log("my project id", projectId, this.basicMobilePopupConfig)
      this.sendOffer({projectId})
        .then(res => {
          const notification = {
            iconRef: "i",
            primaryMessage: this.$t("messages.emailSentCheckInboxMessage"),
						showCloseButton: true,
						timeout: 5000,
						isPersistent: false,
          }
          this.addNotification(notification);
        })
        .catch(err => {
          console.log(err);
        });
    },
		onClickPrimaryButton(button) {
			if(this.basicMobilePopupConfig.loginViaDesktopPopup) {
				this.offerCode()
			}
			if(button && button.buttonAction) {
				button.buttonAction()
			}
			this.closePopup()
		}
  }
}
</script>

<style lang="scss">
.default-mobile-view-popup-styles-v2 {
	pointer-events: all;
	box-sizing: border-box;
	position: fixed;
	top: 0;
	left: 0;
	background: rgba(11, 10, 10, 0.75);
	height: 100%;
	width: 100%;
	padding: 1rem;

	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 2147483601;

	.popup-body {
		width: 100%;

		display: flex;
		flex-direction: column;
		position: relative;

		padding: 1rem;
		align-items: flex-start;
		gap: 1rem;
		border-radius: 20px;
    background: $background-white;
		
		.image-wrapper {
			img {
				border-radius: .75rem;
			}
		}

		.icon-wrapper {
			height: 1.5rem !important;
			width: 1.5rem !important;
			display: flex;
			justify-content: center;
			align-items: center;

			svg {
				height: 1.5rem !important;
				width: 1.5rem !important;
			}

		}
		.close-button {
			position: absolute;
			right: 0;
			top: -1.25rem;
			transform: translateY(-100%);
		}

		

		.text-content {
			display: flex;
			flex-direction: column;
			justify-content: center;
			gap: 0.5rem;
			width: 100%;
		}
		.heading {
			color: $color-light-gray-11;
			text-align: center;
			font-size: 1rem;
			font-weight: 600;
		}

		.sub-heading {

			color: $color-light-gray-11;
			text-align: center;
			font-size: .875rem;
		}

		.tour-highlight-sub-heading {
			text-align: start;
		}

		.popup-sub-messages-container {
			display: grid;
			grid-template-columns: 1fr 1fr;
			align-items: start;
			gap: 1rem;
			.popup-sub-message-wrapper {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				gap: .25rem;
				flex: 1 0 0;
				.message-heading {
					color: $color-second;
					font-size: 1.25rem;
					font-weight: 600;
				}
				.message-description {
					color: $color-light-gray-11;
					font-size: .75rem;
					text-align: center;
				}
				.message-icon {
					height: 1.25rem !important;
					width: 1.25rem !important;
					display: flex;
					justify-content: center;
					align-items: center;

					svg {
						height: 1.25rem !important;
						width: 1.25rem !important;
					}
				}
			}
		}


		.popup-action {
			width: 100%;
			box-sizing: border-box;
      display: flex;
      flex-direction: row-reverse;
      gap: 16px;
      
      .action-button {
        text-align: center;
        display: flex;
        padding: 1rem 1.25rem;
        justify-content: center;
        align-items: center;
        align-self: stretch;
        border-radius: 12px;
        color: $color-dark-gray-2;
        font-size: 1rem;
        width: 100%
      }
			.primary-button {
				background: $background-10;
			}
      .secondary-button {
        border-radius: .75rem;
        border: 1px solid $border-24;
      }
		}
	}
}

</style>
