<template>
	<PayAsYouGoPageContent :no-auth-mode="true"></PayAsYouGoPageContent>
</template>

<script>
import { mapGetters, mapMutations, mapState, mapActions } from "vuex";
import PayAsYouGoPageContent from "@/components/shared/payAsYouGo/PayAsYouGoPageContent.vue";

export default {
	components: {
		PayAsYouGoPageContent,
	},
	layout: "pay-as-you-go",
	head() {
		return {
			title: "Neo - Pay as you go",
		};
	},
	watch: {},
	data: () => ({}),
	computed: {},
	mounted() {},
	methods: {},
};
</script>

<style lang="scss" scoped>
.neo-pay-as-you-go-home-page {
	height: 100%;
	width: 100%;
}
</style>
