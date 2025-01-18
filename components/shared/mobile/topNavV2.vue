<template>
	<div class="top-nav-v2-wrapper" :class="{ 'not-home-view': !showHomeView }">
		<div v-if="showHomeView" class="name">
			{{ $t("mobileSection.hi") }}, {{ user && user.firstName }} 👋
		</div>
		<template v-else>
			<nuxt-link
				class="back-link"
				:to="localePath('/dashboard_mobile/home')"
			>
				<svg
					class="back-svg"
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
				>
					<path
						d="M15 18L9 12L15 6"
						stroke="#232121"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</nuxt-link>
			<div class="route-name">{{ routeName }}</div>
		</template>
		<div class="top-nav-action-buttons-wrapper">
			<div
				v-if="$route.path.indexOf('/dashboard_mobile/plans') == -1"
				class="account-icon"
			>
				<nuxt-link :to="localePath('/dashboard_mobile/plans')">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 20 20"
						fill="none"
					>
						<path
							d="M13.0917 10.5917C13.9087 9.94891 14.505 9.06746 14.7977 8.06997C15.0904 7.07249 15.0649 6.00858 14.7248 5.02625C14.3847 4.04391 13.7469 3.19202 12.9001 2.58907C12.0532 1.98612 11.0395 1.66211 10 1.66211C8.96045 1.66211 7.94676 1.98612 7.09994 2.58907C6.25312 3.19202 5.61528 4.04391 5.27517 5.02625C4.93506 6.00858 4.90959 7.07249 5.2023 8.06997C5.49501 9.06746 6.09134 9.94891 6.90833 10.5917C5.5084 11.1526 4.2869 12.0828 3.37407 13.2833C2.46125 14.4838 1.8913 15.9094 1.725 17.4084C1.71296 17.5178 1.72259 17.6285 1.75335 17.7342C1.78411 17.8399 1.83539 17.9386 1.90426 18.0245C2.04335 18.1979 2.24565 18.309 2.46666 18.3334C2.68768 18.3577 2.9093 18.2932 3.08277 18.1541C3.25624 18.015 3.36735 17.8127 3.39166 17.5917C3.57465 15.9627 4.3514 14.4582 5.57351 13.3657C6.79562 12.2732 8.37741 11.6692 10.0167 11.6692C11.6559 11.6692 13.2377 12.2732 14.4598 13.3657C15.6819 14.4582 16.4587 15.9627 16.6417 17.5917C16.6643 17.7965 16.762 17.9856 16.9159 18.1225C17.0698 18.2595 17.269 18.3346 17.475 18.3334H17.5667C17.7851 18.3082 17.9848 18.1978 18.1221 18.0261C18.2595 17.8544 18.3234 17.6353 18.3 17.4167C18.1329 15.9135 17.5599 14.4842 16.6424 13.2819C15.7249 12.0795 14.4974 11.1496 13.0917 10.5917ZM10 10C9.34073 10 8.69626 9.80453 8.1481 9.43825C7.59993 9.07198 7.17269 8.55139 6.9204 7.9423C6.66811 7.33321 6.6021 6.66299 6.73071 6.01639C6.85933 5.36979 7.1768 4.77584 7.64297 4.30967C8.10915 3.84349 8.70309 3.52602 9.3497 3.39741C9.9963 3.26879 10.6665 3.3348 11.2756 3.58709C11.8847 3.83938 12.4053 4.26662 12.7716 4.81479C13.1378 5.36295 13.3333 6.00742 13.3333 6.66669C13.3333 7.55074 12.9821 8.39859 12.357 9.02371C11.7319 9.64883 10.8841 10 10 10Z"
							fill="#3A393A"
						/>
					</svg>
				</nuxt-link>
			</div>
			<div class="top-nav-logout-button" @click.stop="signOut()">
				<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M18.666 19.8334L24.4993 14L18.666 8.16669" stroke="#0E0E0E" stroke-linecap="round" stroke-linejoin="round"/>
					<path d="M24.5 14H10.5" stroke="#0E0E0E" stroke-linecap="round" stroke-linejoin="round"/>
					<path d="M10.5 24.5H5.83333C5.21449 24.5 4.621 24.2542 4.18342 23.8166C3.74583 23.379 3.5 22.7855 3.5 22.1667V5.83333C3.5 5.21449 3.74583 4.621 4.18342 4.18342C4.621 3.74583 5.21449 3.5 5.83333 3.5H10.5" stroke="#0E0E0E" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
	
				<!-- <p @click.stop="signOut()" class="logout-text">{{ $t("buttonText.logOut") }}</p> -->
			</div>
		</div>
	</div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
	name: "TopNavV2",
	components: {},
	computed: {
		...mapState({
			user: (state) => state.User.user,
		}),
		showHomeView() {
			if (this.$route.name.indexOf("mobile-home") > -1) {
				return true;
			}

			return false;
		},
		routeName() {
			let splittedRouteName = this.$route.fullPath.split("/");
			switch (splittedRouteName[splittedRouteName.length - 1]) {
				case "home": {
					return this.$t("mobileSection.routeNames[0]");
				}
				case "gallery": {
					return this.$t("mobileSection.routeNames[2]");
				}
				case "projects": {
					return this.$t("mobileSection.routeNames[1]");
				}
				default: {
					return "";
				}
			}
		},
	},
	methods: {
		...mapActions({
      logout: "Auth/logout",
    }),

		signOut() {
			this.logout().then(res => {
				window.location.href = res.url;
				this.$root.$emit("send-mobile-event",{name : 'mb_user_logout_clicked'});
			});
		},
	},
	
};
</script>
<style lang="scss" scoped>
.top-nav-v2-wrapper {
	height: 5rem;
	width: 100%;
	background: linear-gradient(244deg, $background-10 -9.34%, $background-29 115.48%);

	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 1.25rem;

	&.not-home-view {
		background: $background-white;
		height: 3.5rem;
		box-shadow: 0px 12px 20px 0px rgba(0, 0, 0, 0.04);
		padding: 0.5rem 1.25rem;
	}

	.back-link {
		display: flex;
		align-items: center;

		.back-svg {
			width: 1.5rem;
			height: 1.5rem;
			margin-right: 0.25rem;
		}
	}

	.route-name {
		flex-grow: 1;
		color: $color-light-gray-2;
		font-size: 1rem;
		font-style: normal;
		font-weight: 600;
		line-height: 138%;
	}

	.name {
		color: $color-light-gray-2;
		font-size: 1.25rem;
		font-style: normal;
		font-weight: 600;
		line-height: 138%;
	}
	.top-nav-action-buttons-wrapper{
		display: flex;
		align-items: center;
		gap: 1.25rem;
		.account-icon {
			a {
				display: flex;
				align-items: center;
				display: flex;
				width: 2.5rem;
				height: 2.5rem;
				padding: 10px;
				justify-content: center;
				align-items: center;
				flex-shrink: 0;
				border-radius: 100px;
				border: 1px solid $border-20;
				box-shadow: 0px 12px 20px 0px rgba(0, 0, 0, 0.04);
	
				svg {
					display: block;
					width: 100%;
					height: 100%;
				}
			}
		}
	
		.top-nav-logout-button {
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
}
</style>
