<template>
	<div class="welcome-popup-wrapper">
    <div class="main">
      <div class="close-icon" @click="onGetStarted">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.3007 5.7107C17.9107 5.3207 17.2807 5.3207 16.8907 5.7107L12.0007 10.5907L7.1107 5.7007C6.7207 5.3107 6.0907 5.3107 5.7007 5.7007C5.3107 6.0907 5.3107 6.7207 5.7007 7.1107L10.5907 12.0007L5.7007 16.8907C5.3107 17.2807 5.3107 17.9107 5.7007 18.3007C6.0907 18.6907 6.7207 18.6907 7.1107 18.3007L12.0007 13.4107L16.8907 18.3007C17.2807 18.6907 17.9107 18.6907 18.3007 18.3007C18.6907 17.9107 18.6907 17.2807 18.3007 16.8907L13.4107 12.0007L18.3007 7.1107C18.6807 6.7307 18.6807 6.0907 18.3007 5.7107Z" fill="#282828"/>
        </svg>
      </div>
      <div class="header">{{ $t("onboardingFlow.welcomeToFoyrNeoText") }}</div>
      <div class="text-content-wrapper">
        <div class="title">{{ $t("onboardingFlow.welcomePopupTitle") }}</div>
        <div class="tag">{{ $t("onboardingFlow.welcomePopupTag") }}</div>
      </div>
      <div class="get-started-btn" @click="onGetStarted">
        Get Started →
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
import CommonUtilities from "../mixins/commonUtilitiesMixin";
export default {
	middleware: ["initAuth", "authReq"],
	mixins: [
    CommonUtilities
  ],
	components: {
	},
	head() {
		return {
			title: "Neo - User",
		};
	},
	props: {
    isMobile: {
			type: Boolean,
			required: false,
			default: false
		}
  },
	data() {
		return {
			// userData: {},
			// message: {
			// 	value: "",
			// 	error: false,
			// 	global: false,
			// },
		};
	},
	mounted() {
		// setTimeout(() => {
		// 	let chat = document.getElementById("fc_frame");
		// 	if (chat) {
		// 		chat.style.display = "none";
		// 	}
		// }, 2000);
		// this.fetchOnboarding()
    //   .then((res) => {
    //     this.fetchUserDetails().then( data => {
    //       if ( data ) {

		// 				if (data.accountExtraInfo) {
		// 					const oldData = JSON.parse(JSON.stringify(this.userData))
		// 					this.userData = {...oldData, ...data.accountExtraInfo}
		// 					if ( data.accountExtraInfo.userCategory && this.onBoardingData && this.onBoardingData.categories ) {
		// 						const category = this.onBoardingData.categories.find( e => e.displayName == data.accountExtraInfo.userCategory );
		// 						if ( category ) {
		// 							this.selectedCategory = category
		// 							this.isCategorySelectionStepCompleted = true
		// 						} else {
		// 							this.isCategorySelectionStepCompleted = false
		// 						}
		// 					} 
		// 					else {
		// 						this.isCategorySelectionStepCompleted = false
		// 					}
		// 				}
    //         if ( data.contactNumber ) {
    //           this.userData["contactNumber"] = data.contactNumber
    //         }
						
						
    //       }
    //     });
    //   })
    //   .catch((err) => {console.log(err)});

		
	},
	watch: {},
	computed: {
		// ...mapGetters("User", ["isUserSpanish", "isUserJapanese", "isUserCategoryHomeOwner", "isUserCategoryPicked"]),
		// // a computed getter
		// ...mapState({
		// 	onBoardingData: (state) => state.User.onBoarding,
		// 	user: (state) => state.User.user,
		// }),
	},
	methods: {
		// ...mapMutations({
		// 	setGetFreeDemoShow_Desk: "Dash/setGetFreeDemoShow_Desk",
		// }),
		// ...mapMutations('Projects',["setShowMainLoader"]),
		// ...mapActions({
		// 	fetchOnboarding: "User/fetchOnboarding",
		// 	fetchUserDetails: "User/fetchUserDetails",
		// 	saveOnboarding: "User/saveOnboarding",
		// 	fetchUser: "User/fetch",
		// 	getCountryCode: "User/getCountryCode",
		// 	creatNewV2Project: "Projects/creatNewV2Project",
		// 	updateGoalStatus: "User/updateGoalForm",
		// 	sendOTP: "User/sendOTP",
		// 	resendOTP: "User/resendOTP",
		// 	verifyOTP: "User/verifyOTP",
		// }),
		
		
		
		// submit({
		// 	cb = null,
		// 	openDemoBookingModal = false,
		// } = {}) {
		// 	this.$emit("onSelectOption")
		// 	this.setShowMainLoader(true)
		// },
		
    onGetStarted() {
      this.$emit('onGetStarted')
    }
		
		
		
	},
};
</script>

<style lang="scss" scoped>

* {
	box-sizing: border-box !important;
}
.welcome-popup-wrapper {
  height: 100%;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	background: hsla(300, 1%, 23%, 0.707);
	position: fixed;
	top: 0;
	left: 0;
	z-index: 10;
  .main {
    display: flex;
    padding: 2rem * 1.22 1.5rem * 1.22;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem * 1.22;
    border-radius: 8px;
    background: $background-white;
    width: 36.375rem * 1.22;
    position: relative;
    .close-icon  {
      position: absolute;
      right: .75rem * 1.22;
      top: .875rem * 1.22;
      svg {
        width: 1.5rem * 1.22 !important;
        height: 1.5rem * 1.22 !important;
      }
    }
    .header {
      color: $color-black;
      text-align: center;
      font-family: $secondary-font;
      font-size: 2rem * 1.22;
      font-style: normal;
      font-weight: 700;
      line-height: 2.375rem * 1.22; /* 118.75% */
      width: 100%;
    }
    .text-content-wrapper {
      display: flex;
      width: 100%;
      flex-direction: column;
      align-items: center;
      gap: .75rem * 1.22;
      .title {
        color: $color-black;
        text-align: center;
        font-family: $secondary-font;
        font-size: 1.125rem * 1.22;
        font-style: normal;
        font-weight: 700;
        line-height: 1.625rem * 1.22; /* 144.444% */
        letter-spacing: -0.18px;
      }
      .tag {
        color: rgba(19, 19, 19, 0.75);
        text-align: center;
        font-family: $secondary-font;
        font-size: .875rem * 1.22;
        font-style: normal;
        font-weight: 400;
        line-height: 1rem * 1.22; /* 114.286% */
      }
    }
    .get-started-btn {
      display: flex;
      width: 23.75rem * 1.22;
      height: 3rem * 1.22;
      padding: .625rem * 1.22;
      justify-content: center;
      align-items: center;
      gap: .625rem * 1.22;
      border-radius: 6px;
      background: $background-42;
      color: $color-white;
      font-family: $secondary-font;
      font-size: 1rem * 1.22;
      font-style: normal;
      font-weight: 500;
      line-height: 1.25rem * 1.22; /* 125% */
    }
  }
}

</style>
