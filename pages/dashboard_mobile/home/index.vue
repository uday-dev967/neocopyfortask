<template>
	<div>
		<HomeComponent />
	</div>
</template>
<script>
import HomeComponent from "./homeV2";

export default {
	layout: "mobile",
	middleware: ["initAuth", "authReq"],
	components: {
		HomeComponent,
	},
};
</script>
<style lang="scss" scoped></style>
