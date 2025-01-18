<template>
	<div>
		<mobileProjectsV3></mobileProjectsV3>
	</div>
</template>
<script>
import mobileProjectsV3 from "./mobileProjectsV3.vue";
import { mapState, mapActions } from "vuex";
export default {
	layout: "mobile",
	middleware: ["initAuth", "authReq"],
	components: {
		mobileProjectsV3,
	},
	mounted() {},
	watch: {},
	computed: {},
	methods: {},
};
</script>
<style lang="scss"></style>
