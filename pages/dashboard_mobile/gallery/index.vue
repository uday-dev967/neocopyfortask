<template>
	<div>
		<galleryHomeV3></galleryHomeV3>
	</div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import galleryHomeV3 from "./galleryHomeV3.vue";
export default {
	layout: "mobile",
	middleware: ["initAuth", "authReq"],
	components: {
		galleryHomeV3,
	},
	mounted() {},
	watch: {},
	computed: {},
	methods: {},
};
</script>
<style lang="scss"></style>
