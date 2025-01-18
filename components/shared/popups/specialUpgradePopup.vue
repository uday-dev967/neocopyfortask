<template>
	<div class="popup-div special-upgrade-popup" :class=" showSpecialUpgradePopup ? 'showPopUp' : ''" @click="closePopup">
    <div class="popup-container" @click.stop>
      <div class="close-popup" @click="closePopup">
        <svg
          width="24"
          height="24"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.427338 0.00488616C0.337296 0.0136492 0.251663 0.0480814 0.180617 0.10409C0.109572 0.160099 0.0561011 0.235329 0.0265615 0.320838C-0.0029781 0.406347 -0.00734486 0.49854 0.0139804 0.586459C0.0353056 0.674378 0.081426 0.754325 0.14686 0.816798L6.19191 6.86185L0.14686 12.8995C0.10134 12.9428 0.0649102 12.9947 0.0397031 13.0523C0.0144959 13.1098 0.00101707 13.1718 5.53686e-05 13.2346C-0.000906338 13.2974 0.0106687 13.3598 0.0341024 13.4181C0.0575362 13.4764 0.0923581 13.5294 0.136532 13.5741C0.180705 13.6187 0.233343 13.6541 0.291364 13.6782C0.349386 13.7023 0.411627 13.7145 0.474445 13.7143C0.537263 13.714 0.599397 13.7012 0.657211 13.6767C0.715026 13.6521 0.767359 13.6162 0.811151 13.5712L6.8562 7.52614L12.9012 13.5712C12.945 13.6162 12.9974 13.6521 13.0552 13.6767C13.113 13.7012 13.1751 13.714 13.238 13.7143C13.3008 13.7145 13.363 13.7023 13.421 13.6782C13.4791 13.6541 13.5317 13.6187 13.5759 13.5741C13.62 13.5294 13.6549 13.4764 13.6783 13.4181C13.7017 13.3598 13.7133 13.2974 13.7123 13.2346C13.7114 13.1718 13.6979 13.1098 13.6727 13.0523C13.6475 12.9947 13.6111 12.9428 13.5655 12.8995L7.52049 6.86185L13.5655 0.816798C13.6388 0.747994 13.6882 0.65762 13.7066 0.558811C13.725 0.460003 13.7113 0.357909 13.6677 0.267368C13.6241 0.176827 13.5527 0.102557 13.464 0.0553527C13.3753 0.00814841 13.2738 -0.00953024 13.1743 0.00488616C13.0702 0.0199265 12.9741 0.0692799 12.9012 0.145125L6.8562 6.19018L0.811151 0.145125C0.761752 0.0945115 0.70162 0.0556343 0.635191 0.0313621C0.568762 0.00708992 0.497731 -0.00195794 0.427338 0.00488616Z"
            fill="white"
          />
        </svg>
      </div>
      <div class="special-upgrade-popup-image-wrapper iwfp">
        <div class="top-left-svg-wrapper arrow-svg-wrapper">
          <svg width="71" height="66" viewBox="0 0 71 66" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.8511 1.06907C19.9328 1.52523 20.4849 1.66614 21.0127 1.77862" stroke="#C86854" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/>
          <path d="M23.4923 2.8354C25.5379 3.87614 27.4721 4.9897 29.2921 6.57126C38.3588 14.45 43.8403 26.725 46.9241 40.437" stroke="#C86854" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-dasharray="5.79 5.79"/>
          <path d="M47.2706 42.0305C47.3866 42.5837 47.499 43.1388 47.6075 43.6958" stroke="#C86854" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/>
          <path d="M56.0513 27.6766C55.874 28.299 55.7978 28.9877 55.7828 29.7037" stroke="#C86854" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/>
          <path d="M55.6934 34.3371C55.6128 34.8511 55.5313 35.3402 55.4371 35.7857C54.6514 39.4975 54.0348 43.1781 53.8267 46.8214C53.7073 48.9062 53.8907 50.9044 53.8309 52.9762C53.8083 53.7604 53.6745 54.6766 53.6161 55.5211" stroke="#C86854" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-dasharray="6 6"/>
          <path d="M53.2027 56.7113C53.499 57.6427 53.9403 58.5343 53.7918 59.5195C53.0684 59.138 52.5111 58.182 52.0558 57.2225" stroke="#C86854" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/>
          <path d="M35.0673 35.4986C35.2168 36.1282 35.4869 36.7664 35.8237 37.3983" stroke="#C86854" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/>
          <path d="M38.0122 40.7211C38.3134 41.1452 38.5967 41.5522 38.8405 41.9368C40.8708 45.1418 43.0004 48.2065 45.3963 50.9591C46.767 52.5344 48.2939 53.8362 49.6983 55.3607C50.2299 55.9376 50.7741 56.6867 51.3222 57.3319" stroke="#C86854" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-dasharray="6 6"/>
          </svg>

        </div>
        <div class="svg-tag top-left">
          <div>{{ $t("specialUpgradePopup.imageSearch[0]") }}</div>
          <div>{{ $t("specialUpgradePopup.imageSearch[1]") }}</div>
        </div>
        <div class="top-right-svg-wrapper arrow-svg-wrapper">
          <svg width="47" height="51" viewBox="0 0 47 51" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M26.3482 1.56798C26.2292 1.85699 26.492 2.13734 26.7513 2.39278" stroke="#C86854" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/>
          <path d="M27.7781 3.89312C28.5637 5.22685 29.2596 6.5616 29.7208 8.12103C32.0186 15.8896 30.6831 24.8575 27.4631 33.7729" stroke="#C86854" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-dasharray="5.79 5.79"/>
          <path d="M27.0821 34.8045C26.9473 35.1611 26.8099 35.5175 26.6696 35.8736" stroke="#C86854" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/>
          <path d="M37.1853 30.5933C36.8588 30.8829 36.5656 31.2469 36.2974 31.6486" stroke="#C86854" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/>
          <path d="M34.5659 34.251C34.3336 34.514 34.1098 34.7625 33.8947 34.9817C32.1016 36.8073 30.416 38.6765 28.9762 40.6726C28.1521 41.8147 27.5316 43.0174 26.7461 44.1738C26.4489 44.6116 26.0405 45.084 25.7009 45.543" stroke="#C86854" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-dasharray="6 6"/>
          <path d="M25.0343 46.07C24.8649 46.707 24.7924 47.3741 24.3507 47.8804C24.0777 47.4011 24.1076 46.6554 24.1967 45.9446" stroke="#C86854" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/>
          <path d="M22.4162 27.4298C22.2729 27.842 22.195 28.3028 22.1573 28.7844" stroke="#C86854" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/>
          <path d="M22.1963 31.4677C22.2138 31.8181 22.2273 32.1522 22.2264 32.4594C22.2184 35.0182 22.3177 37.5332 22.6816 39.9674C22.8896 41.3603 23.2857 42.6544 23.5313 44.0306C23.6243 44.5515 23.662 45.1748 23.7396 45.7405" stroke="#C86854" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-dasharray="6 6"/>
          </svg>
        </div>
        <div class="svg-tag top-right">
          <div>{{ $t("specialUpgradePopup.unlimitedRendering[0]") }}</div>
          <div>{{ $t("specialUpgradePopup.unlimitedRendering[1]") }}</div>
        </div>
        <div class="bottom-left-svg-wrapper arrow-svg-wrapper">
          <svg width="53" height="62" viewBox="0 0 53 62" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.0738 60.0187C16.3168 59.6828 16.0647 59.2398 15.8092 58.83" stroke="#C86854" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/>
          <path d="M14.9496 56.5762C14.3493 54.6125 13.8651 52.6753 13.7532 50.521C13.1957 39.7889 17.696 28.635 24.6109 18.1328" stroke="#C86854" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-dasharray="5.79 5.79"/>
          <path d="M25.4219 16.9206C25.7062 16.5024 25.9938 16.0852 26.2851 15.6694" stroke="#C86854" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/>
          <path d="M9.91308 21.3268C10.4239 21.0544 10.9148 20.6757 11.3852 20.2407" stroke="#C86854" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/>
          <path d="M14.4246 17.4205C14.8056 17.1532 15.1712 16.9019 15.5166 16.6858C18.3949 14.8865 21.1481 12.9976 23.6236 10.8688C25.0403 9.65088 26.2131 8.29172 27.5845 7.04343C28.1035 6.57088 28.7766 6.088 29.3568 5.6011" stroke="#C86854" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-dasharray="6 6"/>
          <path d="M30.3803 5.12786C30.7961 4.35858 31.0963 3.52061 31.8228 3.00434C32.0265 3.70716 31.757 4.65978 31.4219 5.54896" stroke="#C86854" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/>
          <path d="M27.9821 29.9824C28.2947 29.4951 28.5379 28.9248 28.7356 28.3154" stroke="#C86854" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/>
          <path d="M29.5173 24.8418C29.6034 24.3844 29.6894 23.9492 29.7857 23.5533C30.5887 20.2552 31.2396 16.9804 31.5241 13.7279C31.6872 11.8668 31.5772 10.0749 31.6867 8.22372C31.7281 7.52301 31.8725 6.70733 31.9476 5.95365" stroke="#C86854" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-dasharray="6 6"/>
          </svg>
        </div>
        <div class="svg-tag bottom-left">
          <div>{{ $t("specialUpgradePopup.customModelText[0]") }}</div>
          <div>{{ $t("specialUpgradePopup.customModelText[1]") }}</div>
        </div>
        <div class="bottom-right-svg-wrapper arrow-svg-wrapper">
          <svg width="90" height="103" viewBox="0 0 90 103" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M62.6575 101.168C62.2437 100.596 62.673 99.8414 63.1078 99.1437" stroke="#C86854" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/>
          <path d="M64.5712 95.3063C65.5931 91.9632 66.4175 88.6652 66.6079 84.9975C67.5571 66.7264 59.8955 47.7374 48.1232 29.8578" stroke="#C86854" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-dasharray="5.79 5.79"/>
          <path d="M46.7423 27.7936C46.2584 27.0816 45.7687 26.3713 45.2728 25.6635" stroke="#C86854" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/>
          <path d="M73.1458 35.2962C72.276 34.8324 71.4403 34.1878 70.6395 33.4472" stroke="#C86854" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/>
          <path d="M65.4649 28.6456C64.8161 28.1906 64.1937 27.7628 63.6057 27.3949C58.7055 24.3316 54.0183 21.1158 49.8039 17.4916C47.3921 15.4181 45.3953 13.1042 43.0606 10.979C42.177 10.1745 41.0311 9.35245 40.0434 8.52351" stroke="#C86854" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-dasharray="6 6"/>
          <path d="M38.3011 7.7176C37.5932 6.40793 37.0822 4.98131 35.8452 4.10239C35.4985 5.29892 35.9574 6.92072 36.5278 8.43452" stroke="#C86854" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/>
          <path d="M42.3831 50.033C41.851 49.2033 41.437 48.2324 41.1003 47.1949" stroke="#C86854" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/>
          <path d="M39.77 41.281C39.6235 40.5023 39.4769 39.7614 39.3131 39.0874C37.946 33.4725 36.8379 27.8973 36.3534 22.36C36.0757 19.1915 36.263 16.1409 36.0766 12.9894C36.0062 11.7964 35.7604 10.4078 35.6326 9.12465" stroke="#C86854" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-dasharray="6 6"/>
          </svg>
        </div>
        <div class="svg-tag bottom-right">
          <div>{{ $t("specialUpgradePopup.renderResolutionText[0]") }}</div>
          <div>{{ $t("specialUpgradePopup.renderResolutionText[1]") }}</div>
        </div>
        <img src="~assets/images/specialUpgradePopupLaptopImage.png" alt="" />
      </div>
      <div class="special-upgrade-popup-text-content-wrapper">
        <div class="background-svg-wrapper">
          <svg width="189" height="187" viewBox="0 0 189 187" fill="none" xmlns="http://www.w3.org/2000/svg">
          <mask id="mask0_1_618" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="189" height="187">
          <rect x="0.601257" y="0.493652" width="188.399" height="185.692" fill="#C4C4C4"/>
          </mask>
          <g mask="url(#mask0_1_618)">
          <g opacity="0.1">
          <path opacity="0.3" d="M149.62 78.5775L0.60141 132.382L149.62 186.186L298.639 132.382L149.62 78.5775Z" stroke="black" stroke-width="2" stroke-miterlimit="10"/>
          <path opacity="0.3" d="M149.62 52.7515L0.60141 106.556L149.62 160.36L298.639 106.556L149.62 52.7515Z" stroke="black" stroke-width="2" stroke-miterlimit="10"/>
          <path opacity="0.3" d="M149.62 26.9255L0.60141 80.7296L149.62 134.534L298.639 80.7296L149.62 26.9255Z" stroke="black" stroke-width="2" stroke-miterlimit="10"/>
          <path opacity="0.3" d="M149.62 1.09953L0.601593 54.9036L149.62 108.708L298.639 54.9036L149.62 1.09953Z" stroke="black" stroke-width="2" stroke-miterlimit="10"/>
          </g>
          </g>
          </svg>
        </div>

        <div class="special-upgrade-popup-heading">
          {{ $t("specialUpgradePopup.title[0]") }}
          <span>
            {{ $t("specialUpgradePopup.title[1]") }}
          </span>
        </div>
        <div class="sub-text-wrapper">
          <div class="sub-text">
            {{ $t("specialUpgradePopup.subText") }}
          </div>
          <div class="popup-tag">
            {{ $t("specialUpgradePopup.popupTag[0]") }} $709 {{ $t("specialUpgradePopup.popupTag[1]") }} $59*12
          </div>
        </div>
        <div class="special-upgrade-popup-buttons-wrapper">
          <div 
            class="special-upgrade-popup-button first-button"
            @click="onGoPremiumClick"
          >
            {{ $t("specialUpgradePopup.goPremium") }}
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
        this.$emit('go-premium')
        this.closePopup()
      },
    },
	};
	
</script>

<style lang="scss" scoped>
  .popup-div .close-popup {
    right: 1.5rem;
    top: 1.5rem;
    z-index: 1;
    svg {
      background-color: $background-white-6;
      path {
        fill: $background-19;
      }
    }
  }
	.special-upgrade-popup {
		.popup-container {
      display: grid;
      grid-template-columns: 56% 44%;
			padding: 0;
			width: 47.213rem * 1.22;
      background: none;
      border-top: 0.1845rem * 1.22 solid $border-13;
      .special-upgrade-popup-image-wrapper {
        position: relative;
        padding: 7.56rem * 1.22 1.1rem * 1.22 7.1465rem * 1.22 1.1rem * 1.22;
        background: $background-white-6;
        .svg-tag {
          position: absolute;
          display: flex;
          flex-direction: column;
          color: $color-dark-rose-gold-1;
          text-align: center;
          font-size: 0.922rem * 1.22;
          font-weight: 600;
        }
        .top-left {
          top: 3.043rem * 1.22;
          left: 4.841rem * 1.22;
        }        
        .top-right {
          top: 2.766rem * 1.22;
          right: 3.0625rem * 1.22;
        }        
        .bottom-left {
          left: 3.504rem * 1.22;
          bottom: 4.241rem * 1.22;
        }        
        .bottom-right {
          right: 2.812rem * 1.22;
          bottom: 4.1495rem * 1.22;
        }        

        .arrow-svg-wrapper {
          position: absolute;
        }
        .top-left-svg-wrapper {
          top: 5.625rem * 1.22;
          left: 5.671rem * 1.22;
          width: 3.2735rem * 1.22;
          height: 3.043rem * 1.22;
        }
        .top-right-svg-wrapper {
          top: 5.21rem * 1.22;
          right: 4.1957rem * 1.22;
          width: 2.167rem * 1.22;
          height: 2.3514rem * 1.22;
        }
        .bottom-left-svg-wrapper {
          bottom: 7.1465rem * 1.22;
          left: 6.547rem * 1.22;
          width: 2.443rem * 1.22;
          height: 2.858rem * 1.22;
        }
        .bottom-right-svg-wrapper {
          bottom: 7rem * 1.22;
          right: 4.3801rem * 1.22;
          width: 4.1495rem * 1.22;
          height: 4.749rem * 1.22;
        }
      }
      .special-upgrade-popup-text-content-wrapper{
        background: $background-white;
        padding: 5.4866rem * 1.22 1.752rem * 1.22 2.766rem * 1.22 1.752rem * 1.22;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: 100%;
        position: relative;
        .background-svg-wrapper {
          position: absolute;
          bottom: 4.1495rem * 1.22;
          right: 0rem;
          svg {
            width: 8.714rem * 1.22 !important;
            height: 8.622rem * 1.22 !important;
          }
        }
        .special-upgrade-popup-heading {
          color: $color-dark-rose-gold-2;
          text-align: center;
          font-size: 1.5215rem * 1.22;
          span {
            font-size: 1.5215rem * 1.22;
            font-weight: 700;
          }
        }
        .sub-text-wrapper {
          margin-top: 2.305rem * 1.22;
          display: flex;
          flex-direction: column;
          gap: 1.06rem * 1.22;
          width: 15.768rem * 1.22;
          .sub-text {
            color: $color-black;
            text-align: center;
            font-size: 1.014rem * 1.22;
            font-weight: 300;
          }
          .popup-tag {
            color: $color-dark-gray-4;
            font-size: 0.97rem * 1.22;
            font-weight: 700;
            line-height: 19px;
            text-align: center;
          }
        }
        .special-upgrade-popup-buttons-wrapper {
          display: flex;
          flex-direction: column;
          gap: 0.461rem * 1.22;
          width: 100%;
          margin-top: 4.795rem * 1.22;
          position: relative;
          z-index: 1;
          .special-upgrade-popup-button {                        
            flex-shrink: 0;
            text-align: center;
            font-size: 0.7838rem * 1.22;
            font-weight: 600;
            padding: 0.461rem * 1.22;
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
