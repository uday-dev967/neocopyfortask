<template>
    <section class="rewards-section referral-section-wrapper">
        <div class="referral-container">
            <h1 class="rewards-header">Rewards </h1>
            <div class="rewards-wrapper">
                <div class="rewards-description">
                    <div class="rewards-description-text text-line-1">
                        {{ rewardsHeaderText.line1 }}
                    </div>
                    <div class="rewards-description-text text-line-2">
                        {{ rewardsHeaderText.line2 }}
                        <div v-if="referralsCount > 0" class="tooltip-wrapper rewards-description-tooltip-wrapper">
                            <svg class="tooltip-icon rewards-description-tooltip-icon" xmlns="http://www.w3.org/2000/svg" width="20"
                                height="20" viewBox="0 0 20 20" fill="none">
                                <path
                                    d="M10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20ZM10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18ZM9 5H11V7H9V5ZM9 9H11V15H9V9Z"
                                    fill="#C4C4C4" />
                            </svg>
                            <div class="tooltip-text-wrapper rewards-description-tooltip-text">
                                You can select one reward at a time. If you have multiple rewards, please proceed with
                                selecting one reward and come back onto this page to select the next reward.
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="availableRewardsList.length" class="rewards-container" :style="[
					availableRewardsList.length == 2 ? {'padding-left': '14%'} : '',
					availableRewardsList.length == 2 ? {'padding-right': '14%'} : ''
				]">
                    <div v-for="reward in availableRewardsList" class="rewards" :key="reward.value">
                        <div class="rewards-card" @click="triggerRadioBtnClick(reward.value)">
                            <input v-if="referralsCount" :id="reward.value" class="reward.input" type="radio" name="rewards"
                                :value="reward.value" v-model="selectedReward" :ref="`radioBtn${reward.value}`">
                            <label v-if="referralsCount" class="radio-label" :for="reward.value">
                                <svg v-if="selectedReward == reward.value" width="48" height="48" viewBox="0 0 48 48"
                                    fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="24" cy="24" r="14.5" stroke="url(#paint0_linear_6791_181)"
                                        stroke-width="3" />
                                    <circle cx="24" cy="24" r="10" fill="url(#paint1_linear_6791_181)" />
                                    <defs>
                                        <linearGradient id="paint0_linear_6791_181" x1="8" y1="6.30303" x2="41.1457"
                                            y2="18.0373" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="black" />
                                            <stop offset="1" stop-color="black" />
                                        </linearGradient>
                                        <linearGradient id="paint1_linear_6791_181" x1="14" y1="12.9394" x2="34.724"
                                            y2="20.2733" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="black" />
                                            <stop offset="1" stop-color="black" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                                <svg v-else width="48" height="48" viewBox="0 0 48 48" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="24" cy="24" r="14.5" stroke="url(#paint0_linear_6791_245)"
                                        stroke-width="3" />
                                    <defs>
                                        <linearGradient id="paint0_linear_6791_245" x1="-8.73821e-07" y1="-1.69697"
                                            x2="33.1457" y2="10.0373" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="black" />
                                            <stop offset="1" stop-color="black" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </label>
                            <img class="reward-img" :src="reward.image" :alt="reward.text">
                            <div class="reward-info">
                                <div class="reward-info-text">
                                    {{ reward.text }}
                                </div>
                                <div class="tooltip-wrapper reward-info-tooltip-wrapper" v-if="reward.rewardType == 'PROMO_CREDIT'">
                                    <div class="tooltip-icon reward-info-tooltip-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
                                            fill="none">
                                            <path
                                                d="M10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20ZM10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18ZM9 5H11V7H9V5ZM9 9H11V15H9V9Z"
                                                fill="#C4C4C4" />
                                        </svg>
                                    </div>
                                    <div class="tooltip-text-wrapper reward-info-tooltip-text">
                                       The promo credits can be used as a discount on your next purchase (i.e renewals, upgrades or buying add ons)
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="availableRewardsList.length" class="ref-btn-wrapper">
                    <button class="referral-btn" @click="handleRewardsReferralBtnCLick">{{ referralBtnText }}</button>
                </div>
            </div>
            <img src="~/assets/images/referral/wave-bg.png" class="wave-bg">
            <div class="rewards-popup-overlay" v-if="rewardsPopup">
                <div class="rewards-popup-wrapper">
                    <div class="rewards-collected">
                        <div class="rewards-collected-img">
                            <img src="~/assets/images/referral/rafiki.png" alt="rewards-collected">
                        </div>
                        <p class="rewards-collected-text">Congrats! Reward has been added to your account</p>
                    </div>
                    <div class="referral-popup-close-btn" @click="closeRewardsPopup">
                        <svg width="10" height="7" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.23572 1.5L1.30469 9.36207" stroke="#C4C4C4" stroke-width="1.2"
                                stroke-miterlimit="10" stroke-linecap="round" />
                            <path d="M9.30494 9.50037L1.44287 1.56934" stroke="#C4C4C4" stroke-width="1.2"
                                stroke-miterlimit="10" stroke-linecap="round" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import promoCredit from "../../../assets/images/referral/promo-coin.png";
import customModel from "../../../assets/images/referral/custom-model.png";
import keyFolder from "../../../assets/images/referral/keyfolder.png";
import renderCredit from "../../../assets/images/referral/render-credit.png";
// import img4 from "../../../assets/images/referral/Render-Credit.png"
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
export default {
	components: {},
	layout: "referral",
	middleware: ["initAuth", "authReq"],
	head() {
		return {
			title: "Neo - Referral",
		};
	},
	async created() {
		await this.getReferralsCount();
	},
	mounted() {
		if (this.currentSubscription && !this.availableRewardsList.length) {
			// console.log(
			// 	"-----------------------currentSubscription------------------------------",
			// 	this.currentSubscription.chargebeeSubscriptionData.plan_id
			// );
			this.planId = this.currentSubscription.chargebeeSubscriptionData.plan_id;
			this.availableRewardsList = this.getRewardsList(this.planId);
		}
		if (this.referralsCount) this.selectedReward = 1;
	},
	data() {
		return {
			availableRewardsList: [],
			selectedReward: 1,
			rewardsPopup: false,
			planID: "",
		};
	},
	watch: {
		currentSubscription(nv) {
			if (nv && !this.availableRewardsList.length) {
				// console.log(
				// 	"-----------------------currentSubscription------------------------------",
				// 	this.currentSubscription.chargebeeSubscriptionData.plan_id
				// );
				this.planId = this.currentSubscription.chargebeeSubscriptionData.plan_id;
				this.availableRewardsList = this.getRewardsList(this.planId);
			}
		},
	},
	computed: {
		...mapGetters("Billing", ["currentSubscription"]),
		...mapGetters("Referral", ["referralsCount", "refereeId"]),
		rewardsHeaderText() {
			if (this.referralsCount > 0) {
				return {
					line1: `You have ${
						this.referralsCount
					} rewards available, please`,
					line2: "claim any of the rewards below",
				};
			}
			return {
				line1: "These rewards will be available to you",
				line2: "once your friend subscribes to Foyr Neo",
			};
		},
		referralBtnText() {
			console.log("selected reward : ", this.selectedReward);
			if (this.referralsCount > 0) {
				return "Avail Now";
			}
			return "Refer Now to Earn Rewards";
		},
	},
	methods: {
		...mapMutations("Referral", [
			"referralPopupToggle",
			"setRefereeId",
			"showLoadingAnimation",
			"hideLoadingAnimation",
		]),
		...mapActions("Referral", ["getReferralsCount", "claimReward"]),
		getRewardsList(planId) {
			switch (planId) {
				case "neo-basic-monthly-inr":
					return [
						{
							image: promoCredit,
							text: "₹500 Promo Credits",
							creditAmount: "500",
							rewardType: "PROMO_CREDIT",
							value: "1",
						},
						{
							image: customModel,
							text: "1 Custom Model",
							rewardType: "CUSTOM_MODEL",
							rewards: [
								{
									planId: "1-custom-model",
								},
							],
							value: "2",
						},
						{
							image: keyFolder,
							text:
								"Access to Export Floorplan + Elevation for 1 month",
							rewardType: "EXPORT_ELEVATION_AND_FLOOR_PLAN",
							value: "3",
							rewards: [
								{
									planId: "referral-export-fp-and-elevation",
								},
							],
						},
					];
				case "neo-basic-monthly":
				case "neo-basic-monthly-cad":
				case "foyr-basic-monthly-stg":
				case "foyr-basic-monthly":
					return [
						{
							image: promoCredit,
							text: "$25 Promo Credits",
							creditAmount: "25",
							value: "1",
							rewardType: "PROMO_CREDIT",
						},
						{
							image: customModel,
							text: "1 Custom Model",
							value: "2",
							rewardType: "CUSTOM_MODEL",
							rewards: [
								{
									planId: "1-custom-model",
								},
							],
						},
						{
							image: keyFolder,
							text:
								"Access to Export Floorplan + Elevation for 1 month",
							value: "3",
							rewardType: "EXPORT_ELEVATION_AND_FLOOR_PLAN",
							rewards: [
								{
									planId: "referral-export-fp-and-elevation",
								},
							],
						},
					];
				case "neo-basic-quarterly-inr":
					return [
						{
							image: promoCredit,
							creditAmount: "1000",
							text: "₹1000 Promo Credits",
							rewardType: "PROMO_CREDIT",
							value: "1",
						},
						{
							image: customModel,
							text: "1 Custom Model",
							rewardType: "CUSTOM_MODEL",
							rewards: [
								{
									planId: "1-custom-model",
								},
							],
							value: "2",
						},
						{
							image: keyFolder,
							text:
								"Access to Export Floorplan + Elevation for 3 months",
							rewardType: "EXPORT_ELEVATION_AND_FLOOR_PLAN",
							value: "3",
							rewards: [
								{
									planId:
										"referral-export-fp-and-elevation-3",
								},
							],
						},
					];
				case "neo-basic-quarterly":
				case "neo-basic-quarterly-cad":
				case "foyr-basic-quarterly-stg":
				case "foyr-basic-quarterly-":
					return [
						{
							image: promoCredit,
							text: "$50 Promo Credits",
							creditAmount: "50",
							value: "1",
							rewardType: "PROMO_CREDIT",
						},
						{
							image: customModel,
							text: "1 Custom Model",
							value: "2",
							rewardType: "CUSTOM_MODEL",
							rewards: [
								{
									planId: "1-custom-model",
								},
							],
						},
						{
							image: keyFolder,
							text:
								"Access to Export Floorplan + Elevation for 3 months",
							value: "3",
							rewardType: "EXPORT_ELEVATION_AND_FLOOR_PLAN",
							rewards: [
								{
									planId:
										"referral-export-fp-and-elevation-3",
								},
							],
						},
					];
				case "neo-basic-yearly-inr":
					return [
						{
							image: promoCredit,
							text: "₹5000 Promo Credits",
							creditAmount: "5000",
							value: "1",
							rewardType: "PROMO_CREDIT",
						},
						{
							image: customModel,
							text: "4 Custom Model",
							value: "2",
							rewardType: "CUSTOM_MODEL",
							rewards: [
								{
									planId: "4-custom-model",
								},
							],
						},
						{
							image: keyFolder,
							text:
								"Access to Export Floorplan + Elevation for 1 year",
							value: "3",
							rewardType: "EXPORT_ELEVATION_AND_FLOOR_PLAN",
							rewards: [
								{
									planId:
										"referral-export-fp-and-elevation-12",
								},
							],
						},
					];
				case "neo-basic-yearly":
				case "neo-basic-yearly-cad":
				case "foyr-basic-yearly-stg":
				case "foyr-basic-yearly":
					return [
						{
							image: promoCredit,
							text: "$100 Promo Credits",
							creditAmount: "100",
							value: "1",
							rewardType: "PROMO_CREDIT",
						},
						{
							image: customModel,
							text: "4 Custom Model",
							value: "2",
							rewardType: "CUSTOM_MODEL",
							rewards: [
								{
									planId: "4-custom-model",
								},
							],
						},
						{
							image: keyFolder,
							text:
								"Access to Export Floorplan + Elevation for 1 year",
							value: "3",
							rewardType: "EXPORT_ELEVATION_AND_FLOOR_PLAN",
							rewards: [
								{
									planId:
										"referral-export-fp-and-elevation-12",
								},
							],
						},
					];
				case "neo-standard-monthly-inr":
					return [
						{
							image: promoCredit,
							text: "₹750 Promo Credits",
							rewardType: "PROMO_CREDIT",
							creditAmount: "750",
							value: "1",
						},
						{
							image: customModel,
							rewardType: "CUSTOM_MODEL",
							text: "1 Custom Model",
							value: "2",
							rewards: [
								{
									planId: "1-custom-model",
								},
							],
						},
						{
							image: keyFolder,
							rewardType: "EXPORT_ELEVATION_AND_MOODBOARD_ACCESS",
							text: "Access to Elevation + Moodboard for 1 month",
							value: "3",
							rewards: [
								{
									planId: "referral-export-elevation",
								},
								{
									planId: "foyr-moodboard-1-month-access",
								},
							],
						},
					];
				case "neo-standard-monthly":
				case "neo-standard-monthly-cad":
				case "foyr-standard-monthly":
					return [
						{
							image: promoCredit,
							text: "$30 Promo Credits",
							rewardType: "PROMO_CREDIT",
							creditAmount: "30",
							value: "1",
						},
						{
							image: customModel,
							rewardType: "CUSTOM_MODEL",
							text: "1 Custom Model",
							value: "2",
							rewards: [
								{
									planId: "1-custom-model",
								},
							],
						},
						{
							image: keyFolder,
							rewardType: "EXPORT_ELEVATION_AND_MOODBOARD_ACCESS",
							text: "Access to Elevation + Moodboard for 1 month",
							value: "3",
							rewards: [
								{
									planId: "referral-export-elevation",
								},
								{
									planId: "foyr-moodboard-1-month-access",
								},
							],
						},
					];
				case "neo-standard-quarterly-inr":
					return [
						{
							image: promoCredit,
							text: "₹1500 Promo Credits",
							rewardType: "PROMO_CREDIT",
							creditAmount: "1500",
							value: "1",
						},
						{
							image: customModel,
							rewardType: "CUSTOM_MODEL",
							text: "1 Custom Model",
							value: "2",
							rewards: [
								{
									planId: "1-custom-model",
								},
							],
						},
						{
							image: keyFolder,
							rewardType: "EXPORT_ELEVATION_AND_MOODBOARD_ACCESS",
							text: "Access to Elevation + Moodboard for 3 month",
							value: "3",
							rewards: [
								{
									planId: "referral-export-elevation-3",
								},
								{
									planId: "foyr-moodboard-3-month-access",
								},
							],
						},
					];
				case "neo-standard-quarterly":
				case "neo-standard-quarterly-cad":
				case "foyr-standard-quarterly-stg":
				case "foyr-standard-quarterly":
					return [
						{
							image: promoCredit,
							text: "$75 Promo Credits",
							rewardType: "PROMO_CREDIT",
							creditAmount: "75",
							value: "1",
						},
						{
							image: customModel,
							rewardType: "CUSTOM_MODEL",
							text: "1 Custom Model",
							value: "2",
							rewards: [
								{
									planId: "1-custom-model",
								},
							],
						},
						{
							image: keyFolder,
							rewardType: "EXPORT_ELEVATION_AND_MOODBOARD_ACCESS",
							text: "Access to Elevation + Moodboard for 3 month",
							value: "3",
							rewards: [
								{
									planId: "referral-export-elevation-3",
								},
								{
									planId: "foyr-moodboard-3-month-access",
								},
							],
						},
					];
				case "neo-standard-yearly-inr":
					return [
						{
							image: promoCredit,
							text: "₹5000 Promo Credits",
							rewardType: "PROMO_CREDIT",
							creditAmount: "5000",
							value: "1",
						},
						{
							image: customModel,
							rewardType: "CUSTOM_MODEL",
							text: "4 Custom Model",
							value: "2",
							rewards: [
								{
									planId: "4-custom-model",
								},
							],
						},
						{
							image: keyFolder,
							rewardType: "EXPORT_ELEVATION_AND_MOODBOARD_ACCESS",
							text: "Access to Elevation + Moodboard for 1 year",
							value: "3",
							rewards: [
								{
									planId: "referral-export-elevation-12",
								},
								{
									planId: "foyr-moodboard-1-year-access",
								},
							],
						},
					];
				case "neo-standard-yearly":
				case "neo-standard-yearly-cad":
				case "foyr-standard-yearly-stg":
				case "foyr-standard-yearly":
					return [
						{
							image: promoCredit,
							text: "$100 Promo Credits",
							rewardType: "PROMO_CREDIT",
							creditAmount: "100",
							value: "1",
						},
						{
							image: customModel,
							rewardType: "CUSTOM_MODEL",
							text: "4 Custom Model",
							value: "2",
							rewards: [
								{
									planId: "4-custom-model",
								},
							],
						},
						{
							image: keyFolder,
							rewardType: "EXPORT_ELEVATION_AND_MOODBOARD_ACCESS",
							text: "Access to Elevation + Moodboard for 1 year",
							value: "3",
							rewards: [
								{
									planId: "referral-export-elevation-12",
								},
								{
									planId: "foyr-moodboard-1-year-access",
								},
							],
						},
					];
				case "neo-premium-monthly-inr":
					return [
						{
							image: promoCredit,
							text: "₹1500 Promo Credits",
							rewardType: "PROMO_CREDIT",
							creditAmount: "1500",
							value: "1",
						},
						{
							image: customModel,
							rewardType: "CUSTOM_MODEL",
							text: "1 Custom Model",
							value: "2",
							rewards: [
								{
									planId: "1-custom-model",
								},
							],
						},
						{
							image: keyFolder,
							rewardType: "MOODBOARD_ACCESS",
							text: "Access to Moodboard for 3 month",
							value: "3",
							rewards: [
								{
									planId: "foyr-moodboard-3-month-access",
								},
							],
						},
					];
				case "neo-premium-monthly":
				case "neo-premium-monthly-cad":
				case "foyr-premium-monthly-stg":
				case "foyr-premium-monthly":
				case "neo-premium-quarterly":
				case "neo-premium-quarterly-cad":
				case "foyr-premium-quarterly-stg":
				case "foyr-premium-quarterly":
					return [
						{
							image: promoCredit,
							text: "$50 Promo Credits",
							rewardType: "PROMO_CREDIT",
							creditAmount: "50",
							value: "1",
						},
						{
							image: customModel,
							rewardType: "CUSTOM_MODEL",
							text: "1 Custom Model",
							value: "2",
							rewards: [
								{
									planId: "1-custom-model",
								},
							],
						},
						{
							image: keyFolder,
							rewardType: "MOODBOARD_ACCESS",
							text: "Access to Moodboard for 3 month",
							value: "3",
							rewards: [
								{
									planId: "foyr-moodboard-3-month-access",
								},
							],
						},
					];
				case "neo-premium-quarterly-inr":
					return [
						{
							image: promoCredit,
							text: "₹2000 Promo Credits",
							rewardType: "PROMO_CREDIT",
							creditAmount: "2000",
							value: "1",
						},
						{
							image: customModel,
							rewardType: "CUSTOM_MODEL",
							text: "1 Custom Model",
							value: "2",
							rewards: [
								{
									planId: "1-custom-model",
								},
							],
						},
						{
							image: keyFolder,
							rewardType: "MOODBOARD_ACCESS",
							text: "Access to Moodboard 3 month",
							value: "3",
							rewards: [
								{
									planId: "foyr-moodboard-3-month-access",
								},
							],
						},
					];
				case "neo-premium-yearly-inr":
					return [
						{
							image: promoCredit,
							text: "₹5000 Promo Credits",
							rewardType: "PROMO_CREDIT",
							creditAmount: "5000",
							value: "1",
						},
						{
							image: customModel,
							rewardType: "CUSTOM_MODEL",
							text: "4 Custom Model",
							value: "2",
							rewards: [
								{
									planId: "4-custom-model",
								},
							],
						},
						{
							image: keyFolder,
							rewardType: "MOODBOARD_ACCESS",
							text: "Access to Moodboard for 1 year",
							value: "3",
							rewards: [
								{
									planId: "foyr-moodboard-1-year-access",
								},
							],
						},
					];
				case "neo-premium-yearly":
				case "neo-premium-yearly-cad--1":
				case "foyr-premium-yearly-stg":
				case "neo-premium-yearly-cad":
				case "foyr-premium-yearly":
					return [
						{
							image: promoCredit,
							text: "$100 Promo Credits",
							rewardType: "PROMO_CREDIT",
							creditAmount: "100",
							value: "1",
						},
						{
							image: customModel,
							rewardType: "CUSTOM_MODEL",
							text: "4 Custom Model",
							value: "2",
							rewards: [
								{
									planId: "4-custom-model",
								},
							],
						},
						{
							image: keyFolder,
							rewardType: "MOODBOARD_ACCESS",
							text: "Access to Moodboard for 1 year",
							value: "3",
							rewards: [
								{
									planId: "foyr-moodboard-1-year-access",
								},
							],
						},
					];
				case "foyr-neo-lite-monthly-inr":
				case "foyr-neo-lite-monthly":
				case "foyr-neo-lite-monthly-cad":
				case "neo-light-monthly-inr":
				case "neo-light-monthly":
				case "neo-light-monthly-cad":
					return [
						{
							image: renderCredit,
							rewardType: "RENDER_CREDITS",
							text: "15 Render Credits",
							value: "1",
							rewards: [
								{
									planId: "referral-render-credits-15",
								},
							],
						},
						{
							image: keyFolder,
							rewardType: "MOODBOARD_ACCESS",
							text: "Access to Moodboard for 1 month",
							value: "2",
							rewards: [
								{
									planId: "foyr-moodboard-1-month-access",
								},
							],
						},
					];
				case "neo-light-yearly-inr":
				case "neo-light-yearly":
				case "neo-light-yearly-cad":
				case "neo-lite-yearly":
					return [
						{
							image: renderCredit,
							rewardType: "RENDER_CREDITS",
							text: "100 Render Credits",
							value: "1",
							rewards: [
								{
									planId: "referral-render-credits-100",
								},
							],
						},
						{
							image: keyFolder,
							rewardType: "MOODBOARD_ACCESS",
							text: "Access to Moodboard for 1 year",
							value: "2",
							rewards: [
								{
									planId: "foyr-moodboard-1-year-access",
								},
							],
						},
					];
				case "neo-standard-lite-monthly-inr":
					return [
						{
							image: promoCredit,
							text: "₹500 Promo Credits",
							rewardType: "PROMO_CREDIT",
							creditAmount: "500",
							value: "1",
						},
						{
							image: customModel,
							rewardType: "CUSTOM_MODEL",
							text: "1 Custom Model",
							value: "2",
							rewards: [
								{
									planId: "1-custom-model",
								},
							],
						},
						{
							image: keyFolder,
							rewardType: "EXPORT_ELEVATION_AND_MOODBOARD_ACCESS",
							text:
								"Access to Elevation + Moodboard access for 1 month",
							value: "3",
							rewards: [
								{
									planId: "referral-export-fp-and-elevation",
								},
								{
									planId: "foyr-moodboard-1-month-access",
								},
							],
						},
					];
				case "neo-premium-basic-plan-staging":
				case "neo-standard-lite-monthly-cad":
				case "neo-premium-basic-plan":
					return [
						{
							image: promoCredit,
							text: "$25 Promo Credits",
							rewardType: "PROMO_CREDIT",
							creditAmount: "25",
							value: "1",
						},
						{
							image: customModel,
							rewardType: "CUSTOM_MODEL",
							text: "1 Custom Model",
							value: "2",
							rewards: [
								{
									planId: "1-custom-model",
								},
							],
						},
						{
							image: keyFolder,
							rewardType: "EXPORT_ELEVATION_AND_MOODBOARD_ACCESS",
							text:
								"Access to Elevation + Moodboard access for 1 month",
							value: "3",
							rewards: [
								{
									planId: "referral-export-fp-and-elevation",
								},
								{
									planId: "foyr-moodboard-1-month-access",
								},
							],
						},
					];
				case "neo-standard-lite-yearly-inr":
					return [
						{
							image: promoCredit,
							text: "₹2500 Promo Credits",
							creditAmount: "2500",
							value: "1",
							rewardType: "PROMO_CREDIT",
						},
						{
							image: customModel,
							text: "2 Custom Model",
							value: "2",
							rewardType: "CUSTOM_MODEL",
							rewards: [
								{
									planId: "2-custom-model",
								},
							],
						},
						{
							image: keyFolder,
							text:
								"Access to Elevation + Moodboard access for 1 year",
							value: "3",
							rewardType: "EXPORT_ELEVATION_AND_MOODBOARD_ACCESS",
							rewards: [
								{
									planId:
										"referral-export-fp-and-elevation-12",
								},
								{
									planId: "foyr-moodboard-1-year-access",
								},
							],
						},
					];

				case "neo-standard-lite-yearly":
				case "neo-standard-lite-yearly-cad":
					return [
						{
							image: promoCredit,
							text: "$50 Promo Credits",
							rewardType: "PROMO_CREDIT",
							creditAmount: "50",
							value: "1",
						},
						{
							image: customModel,
							rewardType: "CUSTOM_MODEL",
							text: "2 Custom Model",
							value: "2",
							rewards: [
								{
									planId: "2-custom-model",
								},
							],
						},
						{
							image: keyFolder,
							rewardType: "EXPORT_ELEVATION_AND_MOODBOARD_ACCESS",
							text: "Access to Elevation + Moodboard for 3 month",
							value: "3",
							rewards: [
								{
									planId:
										"referral-export-fp-and-elevation-12",
								},
								{
									planId: "foyr-moodboard-1-year-access",
								},
							],
						},
					];
				case "neo-ultra-lite-monthly":
				case "neo-ultra-lite-monthly-inr":
					return [
						{
							image: renderCredit,
							rewardType: "RENDER_CREDITS",
							text: "15 Render Credits",
							value: "1",
							rewards: [
								{
									planId: "referral-render-credits-15",
								},
							],
						},
						{
							image: keyFolder,
							rewardType: "MOODBOARD_ACCESS",
							text: "Access to Moodboard for 1 month",
							value: "2",
							rewards: [
								{
									planId: "foyr-moodboard-1-month-access",
								},
							],
						},
					];
				default:
					break;
			}
		},
		handleRewardsReferralBtnCLick() {
			if (this.referralsCount) {
				this.showLoadingAnimation()
				let rewardInfo = this.availableRewardsList.find(
					e => e.value == this.selectedReward
				);
				this.claimReward({
					userPlanId: this.planId,
					rewardType: rewardInfo.rewardType,
					rewards: rewardInfo.rewards,
					...(rewardInfo.creditAmount && {
						creditAmount: rewardInfo.creditAmount,
					}),
					...(this.refereeId && { refereeId: this.refereeId }),
				})
					.then(data => {
						// console.log("data", data);
						this.hideLoadingAnimation()
						if (data) {
							this.setRefereeId("");
							this.openRewardsPopup();
							this.getReferralsCount();

							if (window.analytics) {
								window.analytics.track(
									"referral_reward_claimed",
									{
										name: "Referral reward claimed",
										event_category: "Refferal Strategy",
									},
									{
										integrations: {
											Amplitude: {
												session_id: new Date().getTime(),
											},
										},
									},
									{ timestamp: new Date().getTime() }
								);
							}
						}
					})
					.catch(() => {}); // this.openRewardsPopup();
			} else {
				this.referralPopupToggle();
				if (window.analytics) {
					window.analytics.track(
						"click_refer_now",
						{
							name: "Click Refer now",
							event_category: "Refferal Strategy",
						},
						{
							integrations: {
								Amplitude: { session_id: new Date().getTime() },
							},
						},
						{ timestamp: new Date().getTime() }
					);
				}
			}
		},
		closeRewardsPopup() {
			this.rewardsPopup = false;
		},
		openRewardsPopup() {
			this.rewardsPopup = true;
		},
		triggerRadioBtnClick(val) {
			this.$refs[`radioBtn${val}`][0].click();
		},
	},
};
</script>
<style lang="scss" scoped>
.referral-section-wrapper {
	gap: 1.5rem * 1.22;
	background-color: #fafafc;
	position: relative;
}

.rewards-section {
	.referral-btn {
		transform: scale(1.4);
	}
}

.wave-bg {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100vw;
}

.rewards-header {
	align-self: flex-start;
	font-weight: 700;
	font-size: 2.5rem * 1.22;
	line-height: 120%;
	margin-bottom: 1.5rem * 1.22;
}

.rewards-wrapper {
	display: grid;
	height: 100%;
	width: 100%;
	// gap: 2rem * 1.22;
	position: relative;
	z-index: 1;
}

.tooltip-wrapper {
	position: relative;
	&:hover {
		.tooltip-text-wrapper {
			display: block;
		}
	}
	.tooltip-icon {
		display: flex;
		height: 100%;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		margin-left: 0.375rem * 1.22;
	}

	.tooltip-text-wrapper {
		display: none;
		position: absolute;
		top: -10px;
		color: #3a393a;
		padding: 1rem;
		background-color: $color-white;
		left: 2.75rem * 1.22;
		box-shadow: 0px 2px 7px rgba(0, 0, 0, 0.12);
		border-radius: 0.25rem * 1.22;
		font-style: normal;
		font-weight: 400;
		font-size: 12px;
		line-height: 15px;
		z-index: 1;

		&:before {
			content: "";
			position: absolute;
			width: 20px;
			height: 18px;
			top: 10px;
			left: -10px;
			background: white;
			transform: rotate(-45deg);
		}
	}
}

.rewards-description {
	font-weight: 400;
	font-size: 1.5rem * 1.22;
	line-height: 2rem * 1.22;
	margin-bottom: 2rem * 1.22;

	.rewards-description-text {
		display: flex;
		align-items: center;
	}

	.rewards-description-tooltip-wrapper {
		.rewards-description-tooltip-text {
			width: 22.4375rem * 1.22;
		}
	}
}

.rewards-container {
	display: flex;
	// height: 100%;
	// width: 100%;
	// align-items: center;
	// gap: 8.3125rem * 1.22;
}

.rewards {
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 100%;
	align-items: center;
	justify-content: space-between;

	&-card {
		cursor: pointer;
		background: $color-white;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		padding: 1.25rem * 1.22;
		position: relative;
		width: 18.75rem * 1.22;
		height: 20rem * 1.22;
		border-radius: 1.25rem * 1.22;
		// margin-bottom: 1.25rem * 1.22;

		&:hover {
			box-shadow: 0px 4px 40px 0px #fff1ed;
		}

		.radio-label {
			position: absolute;
			top: 1rem * 1.22;
			left: 1rem * 1.22;
		}

		input[type="radio"] {
			height: 0;
			width: 0;
			visibility: hidden;
		}

		.reward-info {
			height: 100%;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;

			.reward-info-text {
				font-weight: 500;
				font-size: 1.35rem * 1.22;
				line-height: 2rem * 1.22;
				color: $color-black;
				text-align: center;
				margin-right: 0.375rem * 1.22;
				align-self: center;
			}

			.reward-info-tooltip-wrapper {
				.reward-info-tooltip-text {
					width: 10rem * 1.22;
				}
			}
		}
	}
}

.reward-img {
	height: 12.5rem * 1.22;
	width: 12.5rem * 1.22;
	object-fit: contain;
}

.ref-btn-wrapper {
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	bottom: 1.5rem * 1.22;
	left: 0;
	height: 3rem * 1.22;
}
</style>
