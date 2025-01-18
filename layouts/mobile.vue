<template>
	<div class="mobile-lay">
		<DiscountBanner v-if="isTrial && showDiscountBanner && routeName !== 'link-desktop' "/>
		<div class="" v-else></div>
		<navbar id="mobile-nav" />
		<nuxt id="mobile-main" />
		<bottomBar id="mobile-bottomBar" />
		<div
			class="free-demo-popup-container"
			v-if="getFreeDemoShow_Desk && false"
			@click="outsideClick()"
		>
			<div class="free-demo-popup" @click.stop>
				<svg
					class="free-demo-popup-close"
					@click="setGetFreeDemoShow_Desk(false)"
					width="27"
					height="27"
					viewBox="0 0 27 27"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M25.7845 1.20001L1 25.769"
						stroke="#D1D1D1"
						stroke-miterlimit="10"
						stroke-linecap="round"
					/>
					<path
						d="M26 26.2L1.43109 1.41553"
						stroke="#D1D1D1"
						stroke-miterlimit="10"
						stroke-linecap="round"
					/>
				</svg>
				<!-- Modal content ================> -->
				<iframe
					class="free-demo-iframe"
					width="560"
					height="315"
					:src="calendlyUrl"
					frameborder="0"
					allowfullscreen
				></iframe>
			</div>
		</div>
		<MobileSystemNotification />
		<MobileBasicPopup v-if="basicMobilePopupConfig.isVisible" />
		<MobileBottomSystemNotification />
		<!-- <SelectCategoryPopup v-if="false && user && user.onboardingGoalFilled === false" :isMobile="true" /> -->
	</div>
</template>

<script>
import navbar from "@/components/shared/mobile/topNavV3";
import bottomBar from "@/components/shared/mobile/bottomNavV3";
import aSide from "@/components/shared/mobile/sideNav";
import CalendlyMixin from "@/mixins/calendlyMixin";
import MobileSystemNotification from "../components/shared/mobile/mobileSystemNotification.vue";
import MobileBasicPopup from "../components/shared/mobile/mobileBasicPopup.vue";
import MobileBottomSystemNotification from '../components/shared/mobile/mobileBottomSystemNotification.vue';
import SelectCategoryPopup from "../components/selectCategoryPopup.vue";
import DiscountBanner from "../components/shared/mobile/discountBanner.vue";
import { mapState, mapActions, mapGetters } from "vuex";

export default {
	mixins: [CalendlyMixin],
	components: {
		navbar,
		aSide,
		bottomBar,
		MobileSystemNotification,
		MobileBasicPopup,
		MobileBottomSystemNotification,
		SelectCategoryPopup,
		DiscountBanner
	},
	data: () => {
		return {
			showDiscountBanner: false
		}
	},
	mounted() {
		this.$root.$on("send-mobile-event", (_eventDetails) => {
			if (_eventDetails && _eventDetails.name) {
				if (window.analytics) {
					window.analytics.track(
						_eventDetails.name,
						{
							title: _eventDetails.name,
							projectName: _eventDetails.projectName
								? _eventDetails.projectName
								: "",
							subtitle: "mobile",
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
		});
		this.addOrRemoveClassToBody({status: true, className: "hide-fresh-chat-widget"})
		setTimeout(() => {
			this.showDiscountBanner = true;
		}, 10000)
	},
	watch: {},
	computed: {
		...mapGetters("MobileBasicPopOver",['basicMobilePopupConfig']),
		...mapState({
			onBoardingData: (state) => state.User.onBoarding,
			user: (state) => state.User.user,
			isTrial: state => state.Billing.isTrial,
		}),
		routeName() {
			let splittedRouteName = this.$route.fullPath.split("/");
			return splittedRouteName[splittedRouteName.length - 1]
		},
	},
	methods: {
		...mapActions("Projects", [
			"addOrRemoveClassToBody"
		]),
	},
};
</script>

<style lang="scss" scoped>
.mobile-lay {
	height: 100%;
	display: grid;
	grid-template-rows: max-content max-content 1fr 4.0625rem;

	#mobile-main {
		width: 100%;
		max-width: 100%;
		padding: 0rem;
		position: relative;
		overflow: auto;
		background: white;
	}

	.get-free-demo-desk-btn span {
		color: black;
		font-size: 0.8rem;
		font-weight: 600;
		text-transform: uppercase;
	}
	.freeDemoImg {
		border-radius: 100%;
		justify-self: center;
		margin-bottom: 1rem;
	}
	.free-demo-popup-container {
		position: fixed;
		top: 0px;
		bottom: 0px;
		right: 0px;
		left: 0px;
		background: rgba(86, 86, 86, 0.65);
		z-index: 1000;
	}
	.free-demo-popup {
		background: $background-52;
		position: absolute;
		top: 50%;
		left: 50%;
		/* height: 97%; */
		-webkit-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
		width: 70vw;
		display: grid;
		grid-template-columns: 1fr;
		place-content: center;
		justify-items: center;
		text-align: center;

		@media only screen and (max-width: 1024px) {
			width: 90vw;
			padding: 32px 10px 32px 10px;
		}
	}

	.free-demo-popup-close {
		position: absolute;
		right: 0.5rem;
		width: 15px;
		path {
			stroke: black;
		}
	}
	.free-demo-iframe {
		height: 75vh;
		width: 70vw;
	}
}
</style>
<style lang="scss">
.hide-fresh-chat-widget {
	#fc_frame {
		display: none !important;
	}
}
</style>