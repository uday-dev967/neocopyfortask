<template>
  <div
    v-if="showAIIdeateRedirectPopup"
    class="ai-ideate-redirect-popup-wrapper"
  >
    <div class="popup-content-wrapper">
      <svg
				@click="handleCloseAIIdeateRedirectPopup"
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
      <div class="header">
        <div class="ai-ideate-logo-wrapper iwfp">
            <img src="~assets/images/ideatelogo.png" alt="ideate" />
        </div>
      </div>
      <div class="ai-ideate-redirect-confirmation-popup-content">
        <div class="text-content">
          <div class="">
            {{ $t("aiIdeateRedirectPopup.ideatePopupTitle") }}
          </div>
            <div class="tag">
              {{ $t("aiIdeateRedirectPopup.ideatePopupTag") }}
            </div>
        </div>
        <div class="video-container">
            <video src="https://d1b2b4oevn2eyz.cloudfront.net/ideatevideo/IdeateTrailerVideo.mp4" autoplay loop playsinline></video>
        </div>
  
        <div 
          v-if="false"
          class="checkbox-wrapper" 
          :class="{'checkbox-selected': dontShowAgain}"
          @click="onClickDontShowThisAgain"
        >
          <div class="unchecked-checkbox checkbox-icon">
            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4.65918" y="5.32642" width="15" height="15" fill="#232121" stroke="white"/>
            </svg>
          </div>
          <div class="checked-checkbox checkbox-icon">
            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="5.23828" y="5.78906" width="13.952" height="13.8176" fill="#E9BEB3"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M20.0796 4.93408H4.07959V20.9341H20.0796V4.93408ZM18.7463 6.26742H5.41292V19.6007H18.7463V6.26742Z" fill="#E9BEB3"/>
            <path d="M10.1946 16.9341C10.1118 16.9346 10.0296 16.9187 9.95296 16.8874C9.87627 16.856 9.80652 16.8099 9.74771 16.7515L6.60059 13.6044L7.48807 12.7169L10.1946 15.4172L16.6714 8.93408L17.5589 9.82157L10.6352 16.7452C10.519 16.8638 10.3606 16.9317 10.1946 16.9341Z" fill="#232121"/>
            </svg>
          </div>
          <div class="dont-show-again">
            {{ $t("aiIdeateRedirectPopup.dontShowThisAgain") }}
          </div>
        </div>
      </div>
      <div class="ai-ideate-redirect-confirmation-popup-actions-wrapper">
        <div class="continue-button" @click="onContinueButtonClick">{{ $t("aiIdeateRedirectPopup.takeMeThere") }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapMutations, mapState, mapGetters } from "vuex";
import CommonUtilities from '../mixins/commonUtilitiesMixin';

export default {
  mixins: [
    CommonUtilities
  ],
  data() {
    return {
      dontShowAgain: false,
    };
  },
  computed: {
    ...mapGetters("Projects", ["showAIIdeateRedirectPopup"]),
  },
  methods: {
    ...mapMutations("Projects", ["setShowAIIdeateRedirectPopup"]),
    ...mapActions("user",["updateProjectDetail"]),
    handleCloseAIIdeateRedirectPopup() {
      this.setShowAIIdeateRedirectPopup(false)
    },
    onClickDontShowThisAgain() {
      this.dontShowAgain = !this.dontShowAgain
    },
    onContinueButtonClick() {
       this.sendEventToTrack("Clicked Take me there on DB")
      window.open('https://pixiaccounts.foyr.com/oauth2/v1/auth?client_id=ideate&scope=openid%20profile&response_type=code&redirect_uri=https://ideate.foyr.com&state=eyJzdGF0ZSI6Imh0dHBzOi8vaWRlYXRlLmZveXIuY29tIn0=&utm_source=neodashboard&utm_campaign=organic&utm_medium=organic');
      this.setShowAIIdeateRedirectPopup(false)
    }
    
  },
};
</script>

<style lang="scss" scoped>
.ai-ideate-redirect-popup-wrapper {
  height: 100%;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
  background: hsla(300, 1%, 23%, 0.707);
	position: fixed;
	top: 0;
	left: 0;
  .popup-content-wrapper {
		// width: 30.5rem * 1.22;
		background-color: $background-white;
		padding:  1.5rem * 1.22 1.5rem * 1.22 1.25rem * 1.22 1.5rem * 1.22;
    border-radius: 20px ;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
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
      gap: 1rem * 1.22;
      .ai-ideate-logo-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 6.1875rem * 1.22;
        height: 2rem * 1.22;
        flex-shrink: 0;
        svg {
          width: 1rem * 1.22 !important;
          height: 1rem * 1.22 !important;
        }
      }
    }
    .ai-ideate-redirect-confirmation-popup-content {
      margin: 1.375rem * 1.22 0 1.5rem * 1.22 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem * 1.22;  
      .text-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        color: $color-black;
        text-align: center;
        font-weight: 600;
        font-size: 1.0625rem * 1.22;
        font-weight: 600;
        gap: .375rem * 1.22;
        line-height: 20px;
        .highlight {
          text-align: center;
          font-size: 1.125rem * 1.22;
          font-weight: 700;
          background: linear-gradient(89deg, $background-34 -23.05%, $background-35  4.01%, $background-36  45.65%, $background-37  78.85%, $background-38 112.96%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .tag {
          text-align: center;
          font-size: .75rem * 1.22;
          font-weight: 500;
          line-height: 16px;
        }
        
      }  
      .video-container {
        display: flex;
        justify-content: center;
        width: 27.5rem * 1.22;
        height: 16.25rem * 1.22;
        overflow: hidden;
        position: relative;
        border-radius: 16px;
        video {
          display: flex;
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 16px;
        }
      }
      .checkbox-wrapper {
        // position: absolute;
        // right: 0;
        display: flex;
        // gap: 0.125rem * 1.22;
        align-items: center;
        cursor: pointer;
        .checkbox-icon {
          width: 1.5rem * 1.22;
          height: 1.5rem * 1.22;
          display: flex;
          justify-content: center;
          align-items: center;
          svg {
            width: 1.5rem * 1.22 !important;
            height: 1.5rem * 1.22 !important;
          }
        }
        .unchecked-checkbox {
          display: block;
        }
        .checked-checkbox {
          display: none;
        }
        .dont-show-again {
          color: $color-white;
          font-weight: 500;
          font-size: .75rem * 1.22;
        }
      }
      .checkbox-selected {
        .unchecked-checkbox {
          display: none;
        }
        .checked-checkbox {
          display: block;
        }
      }
    }
    .ai-ideate-redirect-confirmation-popup-actions-wrapper {
      width: 100%;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      .continue-button {
        display: inline-flex;
        padding: .75rem * 1.22 1.5rem * 1.22;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
        border-radius: 40px;
        background: linear-gradient(69deg, $background-39 9.01%, $background-40 107.27%);
        color: $color-white;
        text-align: center;
        font-size: .875rem * 1.22;
        font-weight: 600;
        cursor: pointer;
        line-height: 12px; /* 85.714% */
        letter-spacing: -0.14px;
      }
      
    }
  }
}
</style>
<style lang="scss">

</style>