<template>
	<PayAsYouGoPageContent></PayAsYouGoPageContent>
</template>

<script>
import { mapGetters, mapMutations, mapState, mapActions } from "vuex";
import PayAsYouGoPageContent from "@/components/shared/payAsYouGo/PayAsYouGoPageContent.vue";

export default {
	components: {
		PayAsYouGoPageContent,
	},
	layout: "pay-as-you-go",
	middleware: ["initAuth", "authReq"],
	head() {
		return {
			title: "Neo - Pay as you go",
		};
	},
	watch: {
		user: function () {
			this.fetchSubscriptions({ accountId: this.user.accountId });
		},
		currentBilling(nv) {
			if (nv) {
				this.registerPayAsYouGoLandingEvent();
			}
		},
	},
	data: () => ({
		wasPageLoadEvent: false,
	}),
	computed: {
		...mapState({
			user: (state) => state.User.user,
			packages: (state) => state.Subscriptions.packages,
			currentBilling: (state) => state.Billing.currentSubscription,
		}),
	},
	mounted() {
		if (this.currentBilling) {
			this.registerPayAsYouGoLandingEvent();
		}
	},
	methods: {
		...mapActions({
			fetchSubscriptions: "Subscriptions/fetchAll",
			registerDashboardAnalyticsEvent:
				"Projects/registerDashboardAnalyticsEvent",
		}),
		registerPayAsYouGoLandingEvent() {
			if (!this.wasPageLoadEvent) {
				this.wasPageLoadEvent = true;
				this.registerDashboardAnalyticsEvent({
					event_id: "landed_on_pay_as_you_go_page",
					additional_data: {
						plan:
							this.currentBilling &&
							this.currentBilling.chargebeeSubscriptionData &&
							this.currentBilling.chargebeeSubscriptionData
								.plan_id
								? this.currentBilling.chargebeeSubscriptionData
										.plan_id
								: "",
					},
				});
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.neo-pay-as-you-go-home-page {
	height: 100%;
	width: 100%;
}
</style>
