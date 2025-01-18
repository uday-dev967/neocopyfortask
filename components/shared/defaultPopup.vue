<template>
	<section class="pop-over-container" @click.stop @mouseup.stop>
		<div
			class="main-container"
			:style="{
				width: width,
				minHeight: height,
			}"
		>
			<div
				v-if="!hideCloseButton"
				class="close-popup"
				@click.stop="closePopup()"
			>
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M17.8964 6L6 17.792"
						stroke="#E8E8E8"
						stroke-miterlimit="10"
						stroke-linecap="round"
					/>
					<path
						d="M18 18L6.20703 6.10449"
						stroke="#E8E8E8"
						stroke-miterlimit="10"
						stroke-linecap="round"
					/>
				</svg>
			</div>
        <slot></slot>
		</div>
	</section>
</template>
<script>
export default {
	props: {
		width: { required: false, type: String, default: "49.75rem" },
		height: { required: false, type: String, default: "21.5rem" },
		background: { required: false, type: String, default: "" },
		hideCloseButton: { required: false, type: Boolean, default: false },
	},
	mounted() {},
	methods: {
		closePopup() {
			this.$emit("closePopup");
		},
	},
};
</script>
<style lang="scss" scoped>
.pop-over-container {
	position: fixed;
	top: 0px;
	right: 0px;
	bottom: 0px;
	left: 0px;
	background-color: #3a393abf;
	display: grid;
	place-content: center;
	z-index: 1;

	.main-container {
		z-index: 100000000;
		background-color: #232121;
		position: relative;
		box-sizing: border-box;
		// padding: 3rem 4.5rem;

		.close-popup {
			position: absolute;
			top: 0px;
			left: 102%;
			display: grid;
			width: 2rem;
			height: 2rem;
			background-color: #232121;
			place-content: center;
			border-radius: 50%;
			cursor: pointer;

			&:hover {
				background-color: #3a393a;
			}
		}
	}
}
</style>
