<template>
	<div 
		v-if="!isMobile"
    class="select-category-popup-wrapper-v2"
  >
		<div class="popup-content-wrapper" v-if="onBoardingData && category">
			<div class="header">
				<div class="logo-wrapper iwfp">
					<img src="../assets/images/onboard/foyr-logo-dark.png" alt="" />
				</div>
				<div class="text-content-wrapper">
					<div class="title">{{ $t("onboardingFlow.whatYouDoText") }}</div>
					<!-- <div class="sub-title">{{ $t("onboardingFlow.whatYoDoTextTag") }}</div> -->
				</div>
			</div>
			
			<div class="select-category-popup-content">
				<div class="options-list-wrapper">
					<div
						v-for="(item, index) in onBoardingData.categories"
						:key="index"
						class="option-wrapper"
						:class="{ 'active-option': item == selectedCategory }"
						@click="onSelectCategoryItem(item)"
					>
						<!-- <div class="icon-wrapper radio-icon-wrapper">
							<svg class="selected-radio-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
								<circle cx="11" cy="11" r="7" fill="white" stroke="#000000"/>
								<g filter="url(#filter0_dddddd_997_13554)">
									<circle cx="11" cy="11" r="3.25" fill="#000000"/>
								</g>
							</svg>
							<svg class="unselect-radio-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
								<circle cx="11" cy="11" r="7" fill="white" stroke="#bebebe"/>
							</svg>
							
						</div> -->
						<div class="option-name">
							{{ item.displayName }}
						</div>
					</div>
				</div>
				<div class="continue-button" @click="onSelectCatAndContinue">{{ $t("buttonText.next") }}</div>
			</div>

			<div class="sign-up-flow-page-footer">
				<div class="progress-block active"></div>
				<div class="progress-block active"></div>
				<div class="progress-block active"></div>
			</div>
		</div>

	</div>
	<div v-else class="mobile-select-category-popup-wrapper">
		<div class="logo-wrapper iwfp">
			<img src="~/assets/images/onboard/logo_p2.png" alt="" />
		</div>
    <div class="popup-content-wrapper" v-if="onBoardingData && category">
			<div class="header">
				<div class="title">
					{{ $t("onboardingFlow.whatYouDoText") }}
				</div>
				<!-- <div class="sub-title">
					{{ $t("onboardingFlow.whatYoDoTextTag") }}
				</div> -->

			</div>
			<div class="select-category-popup-content">
				<div class="reasons-wrapper">
					<div
						v-for="(item, index) in onBoardingData.categories"
						:key="index"
						class="reason"
						:class="{ selected: item == selectedCategory }"
						@click="onSelectCategoryItem(item)"
					>
						{{ item.displayName }}
					</div>
				</div>
			</div>
			<div class="continue-button" @click="onSelectCatAndContinue">{{ $t("buttonText.next") }}</div>
		</div>
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
import CommonUtilities from "../mixins/commonUtilitiesMixin";
import { setClassToHtml } from "../helpers/utilFunctions";
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
			category: true,
			selectedCategory: undefined,
			userData: {},
			message: {
				value: "",
				error: false,
				global: false,
			},
			isAllowToCall: false,
			userCategoryToIconMapping: {
				"Interior Designer": {
					icon: require("~/assets/images/userCategories/interiorDesigner.svg"),
					reasons: [
						"An easy-to-use tool to offer 3D designs to my customers",
						"A tool to scale up my existing 3D design capacity ",
						"Evaluate Neo as an alternative to my existing tool(s)",
						"Evaluate Neo for its render speed and quality",
					],
				},
				"Kitchen & Bath Designer": {
					icon: require("~/assets/images/userCategories/kitchenAndBathDesigner.svg"),
					reasons: [
						"An easy-to-use modular design tool",
						"Evaluate Neo as an alternative to my existing software",
						"Evaluate Neo’s ability to handle customizations",
						"Evaluate Neo for its extensive product catalog",
						"Evaluate Neo for its render speed and quality",
					],
				},
				"Home Stager": {
					icon: require("~/assets/images/userCategories/homeStager.svg"),
					reasons: [
						"An easy-to-use tool to offer 3D designs to my customers",
						"A tool to scale up my existing staging business",
						"Evaluate Neo to create floor plans quickly",
						"Evaluate Neo for its extensive product catalog",
						"Evaluate Neo for its render speed and quality",
					],
				},
				Architect: {
					icon: require("~/assets/images/userCategories/architect.svg"),
					reasons: [
						"An easy-to-use tool to offer 3D designs to my customers",
						"Evaluate Neo’s capability in creating production drawings ",
						"Looking to scale up my business by offering 3D designs to clients",
						"Evaluate Neo for its speed & quality of rendering",
						"Looking for premade designs to add to my architectural drawing",
					],
				},
				Contractor: {
					icon: require("~/assets/images/userCategories/contractor.svg"),
					reasons: [
						"An easy-to-use tool to offer 3D designs to my customers",
						"Evaluate Neo’s capability in creating production drawings ",
						"Looking to scale up my business by offering 3D designs to clients",
						"Evaluate Neo for its speed & quality of rendering",
						"Looking for premade designs to add to my architectural drawing",
					],
				},
				Student: {
					icon: require("~/assets/images/userCategories/student.svg"),
				},
				"Home Owner": {
					icon: require("~/assets/images/userCategories/homeOwner.svg"),
					lookingForDesigner: [
						"New Home Interiors",
						"Renovation of existing house",
						"Currently not searching",
					],
					needHelp: [
						"Need help with design",
						"End to end execution",
						"Connect with contractors",
						"Currently not in the need",
					],
				},
				Other: {
					icon: require("~/assets/images/userCategories/others.svg"),
				},
			},
			isOtherAnswerSelected: false,
			enteredOTP: "",
			forceShowContactScreen: false,
			isResentOTPEnabled: false,
			selectedCountryDetails: {},
			userPhoneNumber: "",
			isCategorySelectionStepCompleted: true,
		};
	},
	mounted() {
		console.log("ismobile", this.isMobile)
		setTimeout(() => {
			let chat = document.getElementById("fc_frame");
			if (chat) {
				chat.style.display = "none";
			}
			setClassToHtml(false, "temporary-fix-for-mobile-response")
		}, 2000);
		this.fetchOnboarding()
      .then((res) => {
        this.fetchUserDetails().then( data => {
          if ( data ) {

						if (data.accountExtraInfo) {
							const oldData = JSON.parse(JSON.stringify(this.userData))
							this.userData = {...oldData, ...data.accountExtraInfo}
							if ( data.accountExtraInfo.userCategory && this.onBoardingData && this.onBoardingData.categories ) {
								const category = this.onBoardingData.categories.find( e => e.displayName == data.accountExtraInfo.userCategory );
								if ( category ) {
									this.selectedCategory = category
									this.isCategorySelectionStepCompleted = true
								} else {
									this.isCategorySelectionStepCompleted = false
								}
							} 
							else {
								this.isCategorySelectionStepCompleted = false
							}
						}
            if ( data.contactNumber ) {
              this.userData["contactNumber"] = data.contactNumber
            }
						
						
          }
        });
      })
      .catch((err) => {console.log(err)});

		
	},
	watch: {},
	computed: {
		...mapGetters("User", ["isUserSpanish", "isUserJapanese", "isUserCategoryHomeOwner", "isUserCategoryPicked"]),
		// a computed getter
		...mapState({
			onBoardingData: (state) => state.User.onBoarding,
			user: (state) => state.User.user,
		}),
	},
	methods: {
		...mapMutations({
			setGetFreeDemoShow_Desk: "Dash/setGetFreeDemoShow_Desk",
		}),
		...mapMutations('Projects',["setShowMainLoader"]),
		...mapActions({
			fetchOnboarding: "User/fetchOnboarding",
			fetchUserDetails: "User/fetchUserDetails",
			saveOnboarding: "User/saveOnboarding",
			fetchUser: "User/fetch",
			getCountryCode: "User/getCountryCode",
			creatNewV2Project: "Projects/creatNewV2Project",
			updateGoalStatus: "User/updateGoalForm",
			sendOTP: "User/sendOTP",
			resendOTP: "User/resendOTP",
			verifyOTP: "User/verifyOTP",
		}),
		selectedCat(cat) {
			
			// if (this.isUserCategoryPicked) {
			// 	this.updateGoalStatus({ onboardingGoalFilled: "true" }).then((res) => { })
			// 	return
			// }
			this.category = false;
			this.selectedCategory = cat
			this.sendEventToTrack("Signup 2.0 - User category")
			if (window.analytics) {
				window.analytics.track(
					"signupstep4_clicked",
					{
						title: "user selects the persona",
						subtitle: "select persona screen",
					},
					{
						integrations: {
							Amplitude: { session_id: new Date().getTime() },
						},
					},
					{ timestamp: new Date().getTime() }
				);
			}

			this.submit({
				onboardingFormFilled: "true",
				cb: this.onboardingComplete,
			});
			if (window.analytics) {
				window.analytics.track(
					"started_ft_dashboard",
					{},
					{
						integrations: {
							Amplitude: { session_id: new Date().getTime() },
						},
					},
					{ timestamp: new Date().getTime() }
				);
			}
			
		},
		
		
		submit({
			onboardingFormFilled = false,
			cb = null,
			openDemoBookingModal = false,
		} = {}) {
			
			this.setShowMainLoader(true)
			if (onboardingFormFilled) {
				this.userData.onboardingFormFilled = onboardingFormFilled;
			}
			if (this.selectedCategory && this.selectedCategory.displayName) {
				this.userData.userCategory = this.selectedCategory.displayName;
			}

			const updatedUserData = {...this.userData}
			if ('contactNumber' in updatedUserData) {
				delete updatedUserData.contactNumber;
				console.log("'b' property deleted");
			} 
			
			return this.saveOnboarding({ extraInfo: updatedUserData })
				.then((res) => {
					this.fetchUser({ skipOnboardingCheck: true }).then(
						(res) => {
							this.isCategorySelectionStepCompleted = true;
							if (cb) {
								cb(openDemoBookingModal);
							}
						}
					);
				})
				.catch((err) => {
					throw err.response;
				})
				.finally(() => {
					this.setShowMainLoader(false)
				})
		},
		onboardingComplete(openDemoBookingModal) {
			if (window.analytics) {
				window.analytics.group(this.user.accountId, this.userData);
				//this.userData['UK_consent_checkbox'] = (this.userData && this.userData['location'] === 'UK') ? true : false;
				// this.userData['rep_name'] = (this.user && this.user.name) ? this.user.name : 'N/A'
				// this.userData['rep_email'] = (this.user && this.user.email) ? this.user.email : 'N/A'
				window.analytics.identify(
					this.$store.state.User.user._id,
					this.userData
				);
			}
			setTimeout(() => {
				let chat = document.getElementById("fc_frame");
				chat.style.display = "block";
			}, 2000);
			window.parent.postMessage("login-success", "*");
			if (window.$nuxt.$store.$ua.deviceType() == "pc") {
				this.$router.push(this.localePath("/dashboard"));
				this.setGetFreeDemoShow_Desk(openDemoBookingModal);
			} else {
				this.$router.push(this.localePath("/dashboard_mobile/home"));
				this.setGetFreeDemoShow_Desk(openDemoBookingModal);
			}
		},
		
		onSelectCategoryItem(item) {
      this.selectedCategory = item
    },
    onSelectCatAndContinue() {
      if(this.selectedCategory) {
        this.selectedCat(this.selectedCategory)
      }
    }
		
	},
};
</script>

<style lang="scss" scoped>
* {
	box-sizing: border-box !important;
}
.select-category-popup-wrapper-v2 {
	height: 100%;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	background: url('../assets/images/newsignup/sign-up-flow-main-bg.png');
	background-size: cover;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 10;
	.popup-content-wrapper {
		// width: 47.3125rem * 1.22;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 2rem * 1.22;
		gap: 2rem * 1.22;
		border-radius: 8px;
		background: $background-white;
		position: relative;
		box-shadow: 0px 0px 48px 0px rgba(0, 0, 0, 0.08);
		.close-popup {
			cursor: pointer;
			position: absolute;
			right: 1rem * 1.22;
			top: 1rem * 1.22;
		}
		.header {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 1.5rem * 1.22;
			.logo-wrapper {
				width: 7.5625rem * 1.22;
				height: 2.5rem * 1.22;
			}
			.text-content-wrapper {
				display: flex;
				width: 24.125rem * 1.22;
				flex-direction: column;
				align-items: center;
				// gap: .75rem * 1.22;
			}
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
			.sub-title {
				color: rgba(19, 19, 19, 0.75);
				text-align: center;
				font-family: $secondary-font;
				font-size: .875rem * 1.22;
				font-style: normal;
				font-weight: 400;
				line-height: 1rem * 1.22; /* 114.286% */
			}
		}
		.select-category-popup-content {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 1rem * 1.22;
			.options-list-wrapper {
				display: grid;
				width: 100%;
				grid-template-columns: 1fr 1fr;
				align-items: center;
				gap: 1rem * 1.22;
				.option-wrapper {
					display: flex;
					width: 100%;
					// height: 48px;
					gap: .625rem * 1.22;
					padding: .625rem * 1.22 1rem * 1.22;
					align-items: center;
					border-radius: 6px;
					border: 1px solid $border-5;
					cursor: pointer;
					.option-name {
						width: 100%;
						text-align: center;
						color: $color-dark-gray-8;
						font-family: $secondary-font;
						font-size: 1rem * 1.22;
						font-style: normal;
						font-weight: 500;
						line-height: 1.25rem * 1.22; /* 125% */
					}
					.radio-icon-wrapper {
							
						.unselect-radio-icon {
							display: flex;
						}
						.selected-radio-icon {
							display: none;
						}
					}
					&:hover {
						border-radius: 6px;
						border: 1px solid $border-27;
						.radio-icon-wrapper {
							
							.unselect-radio-icon {
								circle {
									stroke: $border-14;
								}
							}
						}
						.option-name {
							color: $color-dark-gray-7;
						}
						
						
					}
					&.active-option {
						border: 1px solid $border-27;
						.option-name {
							color: $color-dark-gray-7;
						}
						.radio-icon-wrapper {
							
							.unselect-radio-icon {
								display: none;
							}
							.selected-radio-icon {
								display: flex;
							}
						}
					}
				}
			}
			.continue-button {
				display: flex;
				width: 23.75rem * 1.22;
				height: 3rem * 1.22;
				padding: .625rem * 1.22;
				justify-content: center;
				align-items: center;
				gap: .625rem * 1.22;

				color: $background-white;
				font-family: $secondary-font;
				font-size: 1rem * 1.22;
				font-style: normal;
				font-weight: 500;
				line-height: 1.25rem * 1.22; /* 125% */
				border-radius: 6px;
				background: $background-42;
				cursor: pointer;
			}
		}
	}
	
}

.mobile-select-category-popup-wrapper {
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	align-items: center;
	background: url('../assets/images/newsignup/sign-up-flow-main-bg.png');
	position: fixed;
	top: 0;
	left: 0;
	z-index: 10;
	padding: 1.5rem 1.5625rem;
	.logo-wrapper {
		width: 6.4375rem;
		height: 2.5rem;
		flex-shrink: 0;
	}
	.popup-content-wrapper {
		
		box-sizing: border-box;
		display: flex;
		width: 100%;
		padding: 2.5rem 1.5rem;
		flex-direction: column;
		align-items: center;
		gap: 32px;
		flex-shrink: 0;
		background: $background-white;
		box-sizing: border-box !important;
		border-radius: 12px;
		box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.16);
		.header {
			color: $color-dark-gray-9;
			text-align: center;
			.title {
				font-size: 1.5rem;
				font-weight: 700;
			}
			.sub-title {

				color: $color-light-gray-13;
				text-align: center;
				font-family: $secondary-font;
				font-size: .875rem;
				font-style: normal;
				font-weight: 500;
				line-height: normal;
			}
		}
		.select-category-popup-content {
			display: flex;
			width: 100%;
			flex-direction: column;
			justify-content: center;
			align-items: flex-start;
			align-content: flex-start;
			gap: 1.5rem;
			align-self: stretch;
			flex-wrap: wrap;
			

			.reasons-wrapper {
				display: grid;
				grid-template-columns: 1fr 1fr;
				width: 100%;
				gap: .625rem;
				.reason {
					display: flex;
					width: 100%;
					height: 3rem;
					justify-content: center;
					align-items: center;
					text-align: center;
					color: $color-light-gray-12;
					font-family: $secondary-font;
					font-size: .875rem;
					font-style: normal;
					font-weight: 500;
					line-height: normal;
					border-radius: 4px;
					border: 1px solid $border-7;
					background: $background-white-12;
					cursor: pointer;
					padding: 0px 0.5rem;
				}
				.selected {
					border-radius: 4px;
					border: 2px solid $border-31;
					background: $background-56;
					color: $color-light-gray-2;
					text-align: center;
					font-family: $secondary-font;
					font-size: .875rem;
					font-weight: 700;
				}
			}
		}
		.continue-button {
			width: 10rem;
			height: 3rem;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-shrink: 0;
			color: $color-white;
			text-align: center;
			font-size: .9375rem;
			font-style: normal;
			font-weight: 700;
			line-height: normal;
			border-radius: 4px;
			background: $background-9;

		}
	}
}


</style>
