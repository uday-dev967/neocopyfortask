<template>
	<div class="">
		<div>
			<div class="cancel-subscription-title">Manage Subscription</div>
			<div class="body">
				Take control of your subscription—adjust, pause, or cancel
				anytime.
			</div>
		</div>

		<div class="plan-cards">
			<PlanCard
				v-for="(plan, index) in plans"
				:key="index"
				:text="plan.text"
				:description="plan.description"
				:icon="plan.icon"
			/>
		</div>
	</div>
</template>
<script setup>
import PlanCard from "../../planCard.vue";
import changeplanimg from "../../../../assets/images/manage-subscriptions/changePlan.svg";
import cancelimg from "../../../../assets/images/manage-subscriptions/cancel.svg";
import pauseimg from "../../../../assets/images/manage-subscriptions/pause.svg";

const plans = [
	{
		text: "Change Plan",
		description: "Explore other plans to better suit your needs.",
		icon: changeplanimg,
	},
	{
		text: "Pause Plan",
		description: "Taking a break? Pause your subscription temporarily.",
		icon: pauseimg,
	},
	{
		text: "Cancel Plan",
		description: "End your subscription.",
		icon: cancelimg,
	},
];
</script>
<style scoped>
.plan-cards {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 12px;
}

.popup-container {
	position: absolute;
	gap: 32px;
}

.close-icon {
	position: absolute;
	top: 0%;
	right: 0%;
	width: 24px;
	height: 24px;
	cursor: pointer;
}
.cancel-subscription-title {
	color: var(--Dark-Dark-1, #232121);
	text-align: center;
	font-feature-settings: "liga" off, "clig" off;
	font-family: Montserrat;
	font-size: 22px;
	font-style: normal;
	font-weight: 600;
	line-height: 32px;
}
.body {
	color: var(--Dark-Dark-2, #3a393a);
	text-align: center;
	font-feature-settings: "liga" off, "clig" off;
	font-family: Montserrat;
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	line-height: 165%; /* 23.1px */
}
</style>
