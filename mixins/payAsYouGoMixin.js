import { mapState, mapActions, mapGetters, mapMutations } from "vuex";

const PayAsYouGoMixin = {
	components: {},
	data: () => ({}),
	computed: {
		...mapState({}),
		...mapGetters("PayAsYouGo", [
			"creditsRequiredForService",
			"showCreditsConfirmationPopupForService",
		]),
		...mapGetters("Billing", [
			"isUserOnPayAsYouGoPlan",
			"totalCreditsAvailable",
			"totalPayAsYouGoCreditsUsed",
		]),
	},
	mounted() {},
	watch: {},
	methods: {
		...mapActions("PayAsYouGo", [
			"closeConfirmationPopupConfig",
			"openConfirmationPopupConfig",
			"refreshCreditsAndUseageLimitsData",
            "updateDoNotShowCreditsPopupForService"
		]),
	},
};

export default PayAsYouGoMixin;
