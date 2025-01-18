<template>
	<div class="bottom-nav-wrapper">
		<div class="bottom-nav-item">
			<nuxt-link :to="localePath('/dashboard_mobile/home')" class="">
				<svg
					:class="{
						'active-link': $route.name == 'dashboard_mobile-home',
					}"
					xmlns="http://www.w3.org/2000/svg"
					width="21"
					height="21"
					viewBox="0 0 21 21"
					fill="none"
				>
					<path
						d="M3 8.00001L10.5 2.16667L18 8.00001V17.1667C18 17.6087 17.8244 18.0326 17.5118 18.3452C17.1993 18.6577 16.7754 18.8333 16.3333 18.8333H4.66667C4.22464 18.8333 3.80072 18.6577 3.48816 18.3452C3.17559 18.0326 3 17.6087 3 17.1667V8.00001Z"
						stroke="#3A393A"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M7 15L14 15"
						stroke="#3A393A"
						stroke-linecap="round"
					/>
				</svg>
				<p>{{ $t("buttonText.home") }}</p>
			</nuxt-link>
		</div>
		<div class="bottom-nav-item">
			<nuxt-link :to="localePath('/dashboard_mobile/projects')" class="">
				<svg
					:class="{
						'active-link':
							$route.name == 'dashboard_mobile-projects',
					}"
					width="21"
					height="21"
					viewBox="0 0 21 21"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M18.8333 16.3333C18.8333 16.7754 18.6577 17.1993 18.3451 17.5118C18.0326 17.8244 17.6087 18 17.1666 18H3.83329C3.39127 18 2.96734 17.8244 2.65478 17.5118C2.34222 17.1993 2.16663 16.7754 2.16663 16.3333V4.66667C2.16663 4.22464 2.34222 3.80072 2.65478 3.48816C2.96734 3.17559 3.39127 3 3.83329 3H7.99996L9.66663 5.5H17.1666C17.6087 5.5 18.0326 5.67559 18.3451 5.98816C18.6577 6.30072 18.8333 6.72464 18.8333 7.16667V16.3333Z"
						stroke="#3A393A"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>

				<p>{{ $t("buttonText.projects") }}</p>
			</nuxt-link>
		</div>
		<div class="bottom-nav-item">
			<nuxt-link :to="localePath('/dashboard_mobile/gallery')" class="">
				<svg
					:class="{
						'active-link':
							$route.name == 'dashboard_mobile-gallery',
					}"
					xmlns="http://www.w3.org/2000/svg"
					width="21"
					height="21"
					viewBox="0 0 21 21"
					fill="none"
				>
					<path
						d="M18 6.6275V14.3725C18 14.4618 17.9762 14.5494 17.9309 14.6264C17.8856 14.7033 17.8206 14.7667 17.7425 14.81L10.7425 18.6983C10.6683 18.7395 10.5848 18.7611 10.5 18.7611C10.4152 18.7611 10.3317 18.7395 10.2575 18.6983L3.2575 14.81C3.17943 14.7667 3.11438 14.7033 3.0691 14.6264C3.02381 14.5494 2.99996 14.4618 3 14.3725V6.6275C3.00011 6.53837 3.02403 6.45089 3.06931 6.37411C3.11458 6.29734 3.17955 6.23406 3.2575 6.19083L10.2575 2.30166C10.3317 2.26051 10.4152 2.23892 10.5 2.23892C10.5848 2.23892 10.6683 2.26051 10.7425 2.30166L17.7425 6.19083C17.8204 6.23406 17.8854 6.29734 17.9307 6.37411C17.976 6.45089 17.9999 6.53837 18 6.6275Z"
						stroke="#3A393A"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M3.43994 6.57834L10.2566 10.365C10.3309 10.4063 10.4145 10.428 10.4995 10.428C10.5845 10.428 10.6681 10.4063 10.7424 10.365L17.5833 6.565M10.4999 18V10.5"
						stroke="#3A393A"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
				<p>{{ $t("buttonText.renders") }}</p>
			</nuxt-link>
		</div>
	</div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.bottom-nav-wrapper {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	align-items: center;

	.bottom-nav-item {
		a {
			text-decoration: none;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			&.active-link {
				path {
					fill: $background-9;
					
					&:last-child {
						stroke: $background-white;
					}
				}
			}

			svg {
				width: 1.25rem;
				height: 1.25rem;

				path {
					stroke: $background-9;
				}
			}

			p {
				margin-top: 0.25rem;
				color: $color-dark-gray;
				font-size: 0.75rem;
				font-style: normal;
				font-weight: 600;
				line-height: 138%;
				margin-bottom: 0px;
			}
		}
	}
}
</style>
