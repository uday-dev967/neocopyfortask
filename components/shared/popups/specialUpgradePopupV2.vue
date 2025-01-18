<template>
	<div class="popup-div special-upgrade-popup" :class=" showSpecialUpgradePopup ? 'showPopUp' : ''" @click="closePopup">
    <div class="popup-container" @click.stop>
      <div class="close-popup" @click="closePopup">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
          <circle opacity="0.4" cx="16" cy="16" r="16" fill="black"/>
          <path d="M21.7002 10.2002L10.2002 21.6002" stroke="white" stroke-miterlimit="10" stroke-linecap="round"/>
          <path d="M21.8004 21.8002L10.4004 10.3002" stroke="white" stroke-miterlimit="10" stroke-linecap="round"/>
        </svg>
      </div>
      <div class="special-upgrade-popup-image-wrapper">
        <div class="image-container iwfp">
          <img class="image" :src="upsellPopupConfig.imageSrc" alt="" />
        </div>
      </div>
      <div class="special-upgrade-popup-text-content-wrapper">
        <div class="background-svg-wrapper">
          <svg width="189" height="179" viewBox="0 0 189 179" fill="none" xmlns="http://www.w3.org/2000/svg">
          <mask id="mask0_77_12" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="190" height="179">
          <rect x="0.601562" y="0.426453" width="188.399" height="178.323" fill="#C4C4C4"/>
          </mask>
          <g mask="url(#mask0_77_12)">
          <g opacity="0.1">
          <path opacity="0.3" d="M149.174 58.8798L0.222656 108.511L149.174 158.143L298.125 108.511L149.174 58.8798Z" stroke="black" stroke-width="2" stroke-miterlimit="10"/>
          <path opacity="0.3" d="M149.174 35.0566L0.222656 84.6882L149.174 134.32L298.125 84.6882L149.174 35.0566Z" stroke="black" stroke-width="2" stroke-miterlimit="10"/>
          <path opacity="0.3" d="M149.174 11.2334L0.222656 60.865L149.174 110.497L298.125 60.865L149.174 11.2334Z" stroke="black" stroke-width="2" stroke-miterlimit="10"/>
          <path opacity="0.3" d="M149.174 -12.5897L0.2229 37.0419L149.174 86.6734L298.125 37.0419L149.174 -12.5897Z" stroke="black" stroke-width="2" stroke-miterlimit="10"/>
          </g>
          </g>
          </svg>


        </div>

        <div class="special-upgrade-popup-heading">
          {{ $t(upsellPopupConfig.headerText[0]) }}
          <span>
            {{ $t(upsellPopupConfig.headerText[1]) }}
          </span>
        </div>
        <div class="sub-text-wrapper">
          <div class="sub-text">
            {{ $t(upsellPopupConfig.subText[0]) }}<span>{{ upsellPopupConfig.subText[1] }}{{ $t(upsellPopupConfig.subText[2]) }}</span>{{ $t(upsellPopupConfig.subText[3]) }}<span>{{ $t(upsellPopupConfig.subText[4]) }}</span>
          </div>
          
        </div>
        <div class="special-upgrade-popup-buttons-wrapper">
          <div 
            class="special-upgrade-popup-button first-button"
            @click="onGoPremiumClick"
          >
            {{ $t(stringReference+".goButton") }}
          </div>
          <div 
            class="special-upgrade-popup-button second-button"
            @click="onContinueWithBasicPlanClick"
          >
            {{ $t("specialUpgradePopup.continueWithBasic") }}
          </div>
        </div>
      </div>
    </div>
	</div>
</template>

<script>
	import { mapActions, mapState, mapGetters } from "vuex";
  export default {
		name: "SpecialUpgradePopup",
		props: {
			showSpecialUpgradePopup: {
        type: Boolean,
				required: true,
				default: false,
			},
			planDetails: {
				required: true,
				default: null,
			},
			duration: {
				required: true,
				default: null,
			},
      stringReference: {
				required: true,
				default: "",
			},
      upsellPopupConfig: {
        type:Object,
        required: true,
        default: () => {}
      }
		},
    watch: {},
		computed: {},
		data() {
      return {}
    },
		mounted() {},
		methods: {
      closePopup() {
        this.$emit('close-popup');
      },
      onContinueWithBasicPlanClick() {
        this.$emit('continue-with-basic')
        this.closePopup()
      },
      onGoPremiumClick() {
        this.$emit('go-button-click')
        this.closePopup()
      },
    },
	};
	
</script>

<style lang="scss" scoped>
  .popup-div .close-popup {
    right: 0rem;
    top: 0rem;
    z-index: 1;
    transform: translate(150%, -50%);
    svg {
      padding: 0px;
      background: none;
      width: 2rem !important;
      height: 2rem !important;
    }
  }
	.special-upgrade-popup {
		.popup-container {
      display: grid;
      grid-template-columns: 54% 46%;
			padding: 0;
			width: 55.5rem;
      background: none;
      .special-upgrade-popup-image-wrapper {
        position: relative;
        padding: 6.4375rem 1.25rem 7.3125rem .625rem;
        background: $background-white-6;
        .image-container {
          width: 100%;
        }
      }
      .special-upgrade-popup-text-content-wrapper{
        background: $background-white;
        padding: 3.5rem .5625rem 3.8125rem .625rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: 100%;
        position: relative;
        .background-svg-wrapper {
          position: absolute;
          bottom: 5.375rem;
          right: 0rem;
          svg {
            width: 11.75rem !important;
            height: 11.125rem !important;
          }
        }
        .special-upgrade-popup-heading {
          display: flex;
          flex-direction: column;
          color: $color-dark-rose-gold-2;
          text-align: center;
          text-transform: uppercase;
          font-size: 2.0625rem * 1.22;
          font-weight: 500;
          line-height: 2.5rem;
          font-variant: all-small-caps;
          span {
            font-size: 2.5rem * 1.22;
            font-weight: 800;
          }
        }
        .sub-text-wrapper {
          margin-top: 5.0625rem;
          display: flex;
          width: 21.1875rem;
          .sub-text {
            color: $color-black;
            text-align: center;
            font-size: 1.5625rem;
            font-weight: 300;
            span {
              font-size: 1.5625rem;
              font-weight: 600;
            }
          }
        }
        .special-upgrade-popup-buttons-wrapper {
          display: flex;
          flex-direction: column;
          gap: 0.625rem;
          width: 100%;
          margin-top: 7.25rem;
          position: relative;
          z-index: 1;
          padding: 0rem 1.625rem 0rem 1.5625rem;
          .special-upgrade-popup-button {                        
            flex-shrink: 0;
            text-align: center;
            font-size: 1.0625rem;
            font-weight: 600;
            padding: .5625rem;
            cursor: pointer;
            text-transform: uppercase;
          }
          .first-button {
            background: $background-9;
            color: $color-white;

            
          }
          .second-button {
            border: 1px solid $border-14;
            background: $background-white;
            color: $color-light-gray-2;
          }
        }
      }
    }
  }
</style>
