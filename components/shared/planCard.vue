<template>
	<div class="container">
		<img :src="icon" class="image" />
		<div class="change-plan">
			<label class="heading">{{ text }}</label>
			<label class="paragraph">
				{{ description }}
			</label>
		</div>
	</div>
</template>

<script setup>
defineProps({
	text: String,
	description: String,
	icon: String,
});
</script>
<style scoped>
.container {
	display: flex;
	height: 98px;
	padding: 12px;
	align-items: center;
	gap: 12px;
	align-self: stretch;
	border-radius: 4px;
	border: 1px solid var(--Black-100, #e5e1e1);
	background: var(--White-100, #fff);
	box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.06);
}
.image {
	width: 44.318px;
	height: 36px;
}
.heading {
	color: var(--Black-900, #1c1b1c);
	font-feature-settings: "liga" off, "clig" off;
	font-family: Montserrat;
	font-size: 16px;
	font-style: normal;
	font-weight: 500;
	line-height: 24px; /* 150% */
}
.paragraph {
	color: #898989;
	font-feature-settings: "liga" off, "clig" off;
	font-family: Montserrat;
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	line-height: 20px; /* 142.857% */
}
.change-plan {
	display: flex;
	flex-direction: column;
	justify-content: start;
	align-items: start;
}

.container:hover {
	border-radius: 4px;
	border: 1px solid var(--Pink-80, #edcbc2);
	background: var(--Pink-20, #fbf2f0);
	box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.1);
}
</style>
